// import { fieldsMappingSchema } from "PARENT_DIR/_shared/schemas/custom-records/apiInfo/fields-mapping-records/fieldsMappingSchema";
// import { z } from "zod";
// import { mapBridge } from "./mapBridgeFn";
  
// async function composePayload(
//     formData: string,
//     formFieldsMap: z.infer<typeof fieldsMappingSchema>,
//     option: "kommo" | "hubspot")
// { 
//     // create the payload fields mapping
//     const outboundPayload = await mapBridge(formData, formFieldsMap);

//     // create valid payload for the request
//     return outboundPayload;
// }