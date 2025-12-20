import getLeads from './get-leads';
import { getPipelinesMap } from './pipelines/pipelinesMap';

export default async function searchLead(customerData: {
  email: string;
  pipeline: string;
}) {
  const pipelinesMap = await getPipelinesMap();
  const pipelineId = pipelinesMap[customerData.pipeline];
  const leads = (await getLeads())._embedded.leads; 
    
  return leads.find(
    (lead: any) =>
      lead.pipeline_id === pipelineId &&
      lead.custom_fields_values.find(
        (field: any) =>
          field.field_name === 'Parent Email' &&
          field.values.find((value: any) => value.value === customerData.email),
      ),
  );
}
