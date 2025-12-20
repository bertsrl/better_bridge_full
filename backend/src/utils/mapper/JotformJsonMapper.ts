// Define the field mapping interface
interface FieldMapping {
    [key: string]: string; // jotformFieldName -> cleanFieldName
}

// Base abstract class with common functionality
abstract class JotformJsonMapper {
    // Define the field mappings for each implementation
    protected static fieldMappings: FieldMapping = {};
    
    static async map(jsonPayload: object) {
        return this.transformFields(jsonPayload);
    }
    
    protected static transformFields(payload: any): any {
        const transformed: any = {};
        
        // Apply field mappings
        for (const [jotformField, cleanField] of Object.entries(this.fieldMappings)) {
            if (payload[jotformField] !== undefined) {
                transformed[cleanField] = payload[jotformField];
            }
        }
        
        return transformed;
    }
}

// Debate Demo form implementation
export class DemoJotformJsonMapper extends JotformJsonMapper {
    protected static fieldMappings: FieldMapping = {
        'q44_dateleParintelui': 'datele_parintelui',
        'q45_emailulParintelui': 'emailul_parintelui',
        'q46_numarulDe46': 'telefon_parinte',
        'q34_dateleCursantului': 'datele_cursantului',
        'q35_emailulCursantului': 'emailul_cursantului',
        'q43_numarulDe43': 'telefon_cursantului',
        'q49_clasaCurenta': 'clasa_cursantului',
        'q124_hsTe124': 'zi_demo_debate',
        'q91_name91': 'found_from',
        'q104_typeA': 'politica_confidentialitate',
        'q99_oriceDoresti': 'orice_doriti_sa_ne_spuneti',
        'q136_submission_type': 'type',
        'q140_submission_type': 'type',
        'q134_campaign_week': 'campaign_week',
        'q135_ad_code': 'ad_code',
        'q139_ad_code': 'ad_code',
        'q105_suntDe105': 'sunt_de_acord_cu_alte_oportunitati',
    };

     // add the transformed fields to the new jsonPayload
    static async map(jsonPayload: any) {
        const transformed = await super.map(jsonPayload);
        console.log('transformed', transformed);
        // Convert buildDate from string timestamp to ISO string, handling numeric string
        const buildDateNum = Number(jsonPayload.buildDate);
        transformed.build_date = !isNaN(buildDateNum) ? new Date(buildDateNum).toISOString() : null;
        console.log('transformed', transformed);
        return transformed;
    }
}

// Debate NewComers SignUp form implementation
export class DebateNewComersSignUpJotformJsonMapper extends JotformJsonMapper {
    protected static fieldMappings: FieldMapping = {
        /**
         * Retention mappings
         */
        'q34_dateleParintelui': 'datele_parintelui',
        'q35_emailulParintelui': 'emailul_parintelui',
        'q43_telefon': 'telefon_parinte',
        'q140_loculDe': 'locul_de_munca_parinte',
        'q44_dateleCursantului': 'datele_cursantului',
        'q45_emailulCursantului': 'emailul_cursantului',
        'q46_telefon46': 'telefon_cursantului',
        'q137_scoalanumele': 'scoala_cursantului',
        'q49_clasa': 'clasa_cursantului',
        'q110_alegeModulul': 'modul_ms',
        'q119_alegeModulul119': 'modul_hs',
        'q141_dincoloDe': 'interesat_de_turnee',
        // zile de participare
        'q129_middleSchool129': 'zi_ms_m2',
        'q65_name65': 'zi_ms_m3',
        'q130_middleSchool130': 'zi_ms_m4',
        'q136_highSchool': 'zi_hs_m2',
        'q135_highSchool135': 'zi_hs_m3',
        'q111_ziuaSi111': 'zi_hs_m4',
        'q112_ziuaSi112': 'zi_hs_m6',
        'q142_highSchool142': 'zi_hs_m8',
        // date de facturare
        'q78_dateDe': 'date_de_facturare',
        'q80_dacaDoresti': 'date_firma',
        'q121_cumDoresti': 'metoda_de_plata',
        'q123_dorestiSa': 'triaj_plata',
        'q99_name99': 'accept_termeni_si_conditii',
        'q117_input115': 'politica_confidentialitate',
        'buildDate': 'build_date',
        /**
         * Newcomers mappings
         */
        "q51_numeleScolii": "scoala_cursantului",
        "q52_orasul": "oras_scoala",
        "q108_aiUn108": "certificat_b2",
        "q125_typeA": "zile_participare_alese_ms",
        "q126_hsZiua": "zile_participare_alese_hs",
        "q84_cursantiiDin": "participare_partener",
        "q110_cumDoresti": "metoda_de_plata",
        "q112_completeazaCodul": "cod_voucher",
        "q86_name86": "discovery_sources",
        "q113_input113": "politica_confidentialitate",
        "q129_ad_code": "ad_code",
        "q130_campaign_week": "campaign_week",
        "q131_submission_type": "type",
    };

    // add the transformed fields to the new jsonPayload
    static async map(jsonPayload: any) {
        const transformed = await super.map(jsonPayload);
        console.log('transformed', transformed);
        // Convert buildDate from string timestamp to ISO string, handling numeric string
        const buildDateNum = Number(jsonPayload.buildDate);
        transformed.build_date = !isNaN(buildDateNum) ? new Date(buildDateNum).toISOString() : null;
        console.log('transformed', transformed);
        return transformed;
    }
}

// Debate Retention SignUp form implementation
export class DebateRetentionSignUpJotformJsonMapper extends JotformJsonMapper {
    protected static fieldMappings: FieldMapping = {
        'q34_dateleParintelui': 'datele_parintelui',
        'q35_emailulParintelui': 'emailul_parintelui',
        'q43_telefon': 'telefon_parinte',
        'q140_loculDe': 'locul_de_munca_parinte',
        'q44_dateleCursantului': 'datele_cursantului',
        'q45_emailulCursantului': 'emailul_cursantului',
        'q46_telefon46': 'telefon_cursantului',
        'q137_scoalanumele': 'scoala_cursantului',
        'q49_clasa': 'clasa_cursantului',
        'q110_alegeModulul': 'modul_ms',
        'q119_alegeModulul119': 'modul_hs',
        'q141_dincoloDe': 'interesat_de_turnee',
        // zile de participare
        'q129_middleSchool129': 'zi_ms_m2',
        'q65_name65': 'zi_ms_m3',
        'q130_middleSchool130': 'zi_ms_m4',
        'q136_highSchool': 'zi_hs_m2',
        'q135_highSchool135': 'zi_hs_m3',
        'q111_ziuaSi111': 'zi_hs_m4',
        'q112_ziuaSi112': 'zi_hs_m6',
        'q142_highSchool142': 'zi_hs_m8',
        // date de facturare
        'q78_dateDe': 'date_de_facturare',
        'q80_dacaDoresti': 'date_firma',
        'q121_cumDoresti': 'metoda_de_plata',
        'q123_dorestiSa': 'triaj_plata',
        'q99_name99': 'accept_termeni_si_conditii',
        'q117_input115': 'politica_confidentialitate',
        'buildDate': 'build_date'
    };

    // add the transformed fields to the new jsonPayload
    static async map(jsonPayload: any) {
        const transformed = await super.map(jsonPayload);
        console.log('transformed', transformed);
        // Convert buildDate from string timestamp to ISO string, handling numeric string
        const buildDateNum = Number(jsonPayload.buildDate);
        transformed.build_date = !isNaN(buildDateNum) ? new Date(buildDateNum).toISOString() : null;
        console.log('transformed', transformed);
        return transformed;
    }
}

// Example of another form implementation
export class PSSignUpJotformJsonMapper extends JotformJsonMapper {
    protected static fieldMappings: FieldMapping = {
        // Different field mappings for PS form
        'q1_name': 'name',
        'q2_email': 'email',
        // ... add more mappings as needed
    };
}