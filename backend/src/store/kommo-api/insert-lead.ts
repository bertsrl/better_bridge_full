import { FinalCrmEntry } from '@/utils/types/entry.types';
import axios from 'axios';
import { getFieldsMap } from './fields/fieldsMap';
import { getTagsMap } from './tags/tagsMap';
import dotenv from 'dotenv';

dotenv.config();

const insertLeadRoute = `https://betterspeakers.kommo.com/api/v4/leads`;

export async function insertLead(lead: FinalCrmEntry) {
  const fieldsMap = await getFieldsMap();
  const tagsMap = await getTagsMap();

  const payload = [{
    name: lead.parentName,
    pipeline_id: 11919019,
    custom_fields_values: [
      {
        field_id: fieldsMap['PARENT NAME'],
        values: [
          {
            value: lead.parentName,
          },
        ],
      },
      {
        field_id: fieldsMap['PARENT EMAIL'],
        values: [
          {
            value: lead.parentEmail,
          },
        ],
      },
      {
        field_id: fieldsMap['PARENT PHONE'],
        values: [
          {
            value: lead.parentPhone,
          },
        ],
      },
      {
        field_id: fieldsMap['PARENT JOB'],
        values: [
          {
            value: lead.parentJob ?? "",
          },
        ],
      },
      {
        field_id: fieldsMap['STUDENT NAME'],
        values: [
          {
            value: lead.studentName,
          },
        ],
      },
      {
        field_id: fieldsMap['STUDENT EMAIL'],
        values: [
          {
            value: lead.studentEmail,
          },
        ],
      },
      {
        field_id: fieldsMap['STUDENT PHONE'],
        values: [
          {
            value: lead.studentPhone,
          },
        ],
      },
      {
        field_id: fieldsMap['STUDENT SCHOOL'],
        values: [
          {
            value: lead.studentSchool,
          },
        ],
      },
      {
        field_id: fieldsMap['STUDENT CLASS'],
        values: [
          {
            value: lead.studentClass,
          },
        ],
      },
      {
        field_id: fieldsMap['DEMO DAY'],
        values: [
          {
            value: lead.BESP_demoDay ?? '',
          },
        ],
      },
      {
        field_id: fieldsMap['STUDENT GROUP'],
        values: [
          {
            value: lead.BESP_studentGroup ?? '',
          },
        ],
      },
      {
        field_id: fieldsMap['BUSINESS'],
        values: [
          {
            value: lead.parentBusiness ?? '',
          },
        ],
      },
      {
        field_id: fieldsMap['campaign_week'],
        values: [
          {
            value: lead.STATS_campaignWeek ?? '',
          },
        ],
      },
      {
        field_id: fieldsMap['ad_code'],
        values: [
          {
            value: lead.STATS_adCode ?? '',
          },
        ],
      },
      {
        field_id: fieldsMap['DEMO FORM'],
        values: [
          {
            value: lead.FORMULAR_DEMO ?? '',
          },
        ],
      },
      {
        field_id: fieldsMap['INSCRIERE FORM'],
        values: [
          {
            value: lead.FORMULAR_INSCRIERE ?? '',
          },
        ],
      },
    ],
    tags_to_add: [
      //demo day tag
      {
        id: tagsMap[`${lead.BESP_demoDay}`],
        name: lead.BESP_demoDay,
      },
      //student level tag
      {
        id: tagsMap[`${lead.BESP_studentLevel}`],
        name: lead.BESP_studentLevel,
      },
      //segment tag
      {
        id: tagsMap[`${lead.BESP_segment}`],
        name: lead.BESP_segment,
      },
    ],
  }];
  
  console.log("🔍 Payload:", JSON.stringify(payload, null, 2));

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
