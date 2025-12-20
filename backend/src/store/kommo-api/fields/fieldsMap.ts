import getCustomFields from '../get-custom-fields';

export async function getFieldsMap() { 
    const customFieldsResponse = await getCustomFields();

    const customFields = customFieldsResponse._embedded.custom_fields;
    return {
        'PARENT NAME': customFields.find(field => field.name === 'Parent Name')?.id,
        'PARENT EMAIL': customFields.find(field => field.name === 'Parent Email')?.id,
        'PARENT PHONE': customFields.find(field => field.name === 'Parent Phone')?.id,
        'PARENT JOB': customFields.find(field => field.name === 'Parent Job')?.id,
        'STUDENT NAME': customFields.find(field => field.name === 'Student Name')?.id,
        'STUDENT EMAIL': customFields.find(field => field.name === 'Student Email')?.id,
        'STUDENT PHONE': customFields.find(field => field.name === 'Student Phone')?.id,
        'STUDENT SCHOOL': customFields.find(field => field.name === 'Student School')?.id,
        'STUDENT CLASS': customFields.find(field => field.name === 'Student Class')?.id,
        'DEMO DAY': customFields.find(field => field.name === 'DEMO DAY')?.id,
        'STUDENT GROUP': customFields.find(field => field.name === 'STUDENT GROUP')?.id,
        'BUSINESS': customFields.find(field => field.name === 'Business')?.id,
        'campaign_week': customFields.find(field => field.name === 'campaign_week')?.id,
        'ad_code': customFields.find(field => field.name === 'ad_code')?.id,
        'DEMO FORM': customFields.find(field => field.name === 'DEMO FORM')?.id,
        'INSCRIERE FORM': customFields.find(field => field.name === 'INSCRIERE FORM')?.id,
        'COMMENTS': customFields.find(field => field.name === 'COMMENTS')?.id,
        'PAYMENT PROOF': customFields.find(field => field.name === 'PAYMENT PROOF')?.id,
    };
}