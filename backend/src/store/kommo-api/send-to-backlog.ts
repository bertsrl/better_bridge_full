import axios from 'axios';
import { getFieldsMap } from './fields/fieldsMap';
import { getTagsMap } from './tags/tagsMap';
import dotenv from 'dotenv';
import { getPipelinesMap } from './pipelines/pipelinesMap';
import { type AdditionalData } from '@/utils/types/miscellaneous.types';
import { getUsersMap } from './users/usersMap';

dotenv.config();

const insertLeadRoute = `https://betterspeakers.kommo.com/api/v4/leads`;
const insertTaskRoute = `https://betterspeakers.kommo.com/api/v4/tasks`;
  
async function createCRMItem(item: {
  title: string;
  subtitle: string;
  tags: string[];
  additionalData: AdditionalData;
}) {
  const fieldsMap = await getFieldsMap();
  const tagsMap = await getTagsMap();
  const pipelinesMap = await getPipelinesMap();

  const payload = [{
    name: item.title,
    pipeline_id: pipelinesMap["BACKLOG"],
    custom_fields_values: [
      {
        field_id: fieldsMap['COMMENTS'],
        values: [
          {
            value: `
                NU AM PUTUT ASOCIA PLATA
              `,
          },
        ],
      },
      {
        field_id: fieldsMap['PARENT EMAIL'],
        values: [
          {
            value: item.additionalData.email,
          },
        ],
      },
    ],
    tags_to_add: [
      {
        id: tagsMap['STRIPE'],
        name: 'STRIPE',
      },
    ],
  }];

  const response = await axios.post(insertLeadRoute, payload, {
    headers: {
      Authorization: `Bearer ${process.env.KOMMO_API_KEY}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  if (response.status !== 201 && response.status !== 200) {
    console.error('Error inserting lead:', response.data);
    return null;
  }

  return response.data;
}

async function createTask(item: {
  taskText: string;
  entityId: number;
  completeTill: number;
}) {
  const usersMap = await getUsersMap();

  const payload = [
    {
      "entity_type": "leads", 
      "is_completed": false,
      "text": item.taskText,
      "entity_id": item.entityId, // lead card id
      "responsible_user_id": usersMap['Better Speakers'], // user id coming from usersMap
      "complete_till": item.completeTill // 24hrs in epoch time
    }
  ];

  const response = await axios.post(insertTaskRoute, payload, {
    headers: {
      Authorization: `Bearer ${process.env.KOMMO_API_KEY}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  if (response.status !== 201 && response.status !== 200) {
    console.error('Error inserting task:', response.data);
    return null;
  }

  return response.data;
}

export async function sendToBacklog(item: {
  title: string;
  subtitle: string;
  tags: string[];
  additionalData: AdditionalData;
}) {
  const crmItem = await createCRMItem(item);

  if (!crmItem) {
    console.error('Error creating CRM item:', crmItem);
    return null;
  }

  const taskItem = await createTask({
    taskText: `
      CONTEXT: ${item.subtitle} \n
      ACTION: Verifica si asociaza plata sau ia masurile necesare \n
      URL: ${item.additionalData.url}
    `,
    entityId: crmItem._embedded.leads[0].id,
    completeTill: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
  });

  if (!taskItem) {
    console.error('Error creating task item:', taskItem);
    return null;
  }

  return {
    crmItem,
    taskItem,
  };
}