import { Injectable } from '@nestjs/common';
import { JotformJsonParser } from "@/utils/parsers/jotformJsonParser";
import { DemoJotformJsonMapper } from "@/utils/mapper/JotformJsonMapper";
import { FinalCrmEntryMapper } from "@/utils/mapper/FinalCrmEntryMapper";
import KommoApi from '@/store/kommo-api';

@Injectable()
export class DemoService {
    constructor() { }
    
    async createDemo(rawPayload: string) {
        const jsonPayload = await JotformJsonParser.parse(rawPayload);
        const transformedPayload = await DemoJotformJsonMapper.map(jsonPayload);
        
        // create the FinalCrmEntry
        const finalCrmEntry = new FinalCrmEntryMapper(transformedPayload).demoMapper(transformedPayload);
        console.log("🔍 FinalCrmEntry:", finalCrmEntry);
        
        // insert the lead in kommo
        const kommoResponse = await KommoApi.insertLead(finalCrmEntry);
        console.log("🔍 KommoResponse:", kommoResponse);
        return kommoResponse;
    }
}