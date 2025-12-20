import { z } from "zod";
// import * as CallKommo from "../Discoverer/callKommo/_index";
// import { fieldsMappingSchema } from "PARENT_DIR/_shared/schemas/custom-records/apiInfo/fields-mapping-records/fieldsMappingSchema";
import { kommoMapSchema } from "PARENT_DIR/_shared/schemas/custom-records/apiInfo/kommoMapSchema";
import { tagConfigSchema } from "PARENT_DIR/_shared/schemas/request-records/kommoRequests/tagConfigSchema";

// async function transformContact(
//   contactName: string
// ): Promise<any> {
//   if (contactName === "") {
//     return null;
//   }
//   const contacts = await CallKommo.getContacts();
//   const contactId = contacts[`${contactName}`];
//   return contactId;
// }

// async function transformLeadCard(
//   leadCardName: string,
//   // leadCardEmail: string
// ): Promise<any> {
//   if (leadCardName === "") {
//     return null;
//   }
//   // TODO: transformLeadCard fn should check for wether a lead card
//   // exists based on the lead card / customer email and the name
//   // you want the card to be formatted as:
//   const leads = await CallKommo.getLeads();
//   const leadCardId = leads[`${leadCardName}`];
//   return leadCardId;
// }

async function transformTags(
  tagConfig: z.infer<typeof tagConfigSchema>,
  formDataJSON: any,
): Promise<any> {
  if (!tagConfig) {
    return [];
  }
  console.log('🔍 tagConfig: ', tagConfig);
  const tagIds = [];
  // map grades
  if (tagConfig.grade.addGradeTags) {
    const inputGrade = formDataJSON[tagConfig.grade.formGradeFieldId];
    console.log('🔍 inputGrade: ', inputGrade);

    const gradeTagId = tagConfig.grade.gradeTagsMap[inputGrade];
    tagIds.push(gradeTagId);
  }
  // map modules
  if (tagConfig.module.addModuleIDTags) {
    const moduleTagId = tagConfig.module.moduleTagId;
    tagIds.push(moduleTagId);
  }
  // map student levels
  if (tagConfig.studentLevel.addStudentLevelTags) {
    const studentLevelTagId = tagConfig.studentLevel.studentLevelTagsMap[formDataJSON[tagConfig.studentLevel.formGradeFieldId]];
    tagIds.push(studentLevelTagId);
  }
  // map groups
  if (tagConfig.group.addGroupTags) {
    const groupTagId = tagConfig.group.groupTagsMap[formDataJSON[tagConfig.group.formGroupFieldId]];
    tagIds.push(groupTagId);
  }
  // map segments
  if (tagConfig.segment.addSegmentTags) {
    const segmentTagId = tagConfig.segment.segmentTagId;
    tagIds.push(segmentTagId);
  }
  // map demo days
  if (tagConfig.demoDay.addDemoDayTags) {
    const demoDayTagId = tagConfig.demoDay.demoDayTagsMap[formDataJSON[tagConfig.demoDay.formDemoDayFieldId]];
    tagIds.push(demoDayTagId);
  }

  console.log('🔍 tagIds: ', tagIds);
  return tagIds;
}

async function transformCustomFields(
  kommoMap: z.infer<typeof kommoMapSchema>,
  formDataJSON: any,
): Promise<any> {
  if (Object.keys(kommoMap.leadCardMappingKeys).length === 0
  && Object.keys(kommoMap.contactMappingKeys).length === 0) {
    return [];
  }
  const leadCardCustomFieldsValues = [];
  const contactCustomFieldsValues = [];
  let leadCardName = "";

  // iterate through LEAD CARD form data kommo fields ralated mappings
  for (const [formField, outboundField] of Object.entries(kommoMap.leadCardMappingKeys)) {
    if (formDataJSON[formField] !== undefined) {
      if(outboundField === "lead_card_name") {
        leadCardName = formDataJSON[formField];
      }
      else leadCardCustomFieldsValues.push({
        field_id: parseInt(kommoMap.leadCardMappingKeys[`${formField}`]),
        values: [{ value: formDataJSON[formField] }],
      });
    }
  }
  
  // iterate through CONTACT form data kommo fields ralated mappings
  for (const [formField, outboundField] of Object.entries(kommoMap.contactMappingKeys)) {
    if (formDataJSON[formField] !== undefined) {
      contactCustomFieldsValues.push({
        field_id: parseInt(kommoMap.contactMappingKeys[`${formField}`]),
        values: [{ value: formDataJSON[formField] }],
      });
    }
  }

  return {
    leadCardCustomFieldsValues: leadCardCustomFieldsValues,
    contactCustomFieldsValues: contactCustomFieldsValues,
    leadCardName: leadCardName,
  };
}

async function mapBridgeKommo(
  formData: string,
  kommoMap: z.infer<typeof kommoMapSchema>,
  tagConfig: z.infer<typeof tagConfigSchema>
): Promise<z.infer<{
  leadName: string;
  pipelineId: number;
  tagIds: number[];
}>> {
  // 1. Parse the form data into a JSON object
  const formDataJSON = JSON.parse(formData);
  console.log('🔍 formDataJSON: ', formDataJSON);
  
  // FIXME: Frontend-ul trebuie sa fie capabil sa scrie el insusi pipelineId-ul in apiInfo-ul lui
  // // 2. Transform the pipeline name into a pipeline id
  // const pipelineId = await transformPipeline(formDataJSON.pipelineName);

  // FIXME: Keep these out of the here because they are already part customFieldsValues
  // // 3 Transform the contactName into a contact id
  // const contactId = await transformContact(formDataJSON.contactName);

  // FIXME: Sunt niste cazuri specifice acolo unde tre sa facem update la lead card deci ramane de vazut
  // // 4 Transform the leadCardName into a lead card id
  // const leadCardId = await transformLeadCard(formDataJSON.leadCardName, formDataJSON.customerEmail_field_id);

  // 5 Transform the tagNames into a tag ids
  const tagIds = await transformTags(tagConfig, formDataJSON);

  // 6 Transform the custom fields values into a custom fields values array
  const { leadCardCustomFieldsValues, contactCustomFieldsValues, leadCardName } = await transformCustomFields(
    kommoMap,
    formDataJSON
  );

  return {
    tagIds: tagIds,
    leadCardName: leadCardName,
    leadCardCustomFieldsValues: leadCardCustomFieldsValues,
    contactCustomFieldsValues: contactCustomFieldsValues,
  }
}

export { mapBridgeKommo };
