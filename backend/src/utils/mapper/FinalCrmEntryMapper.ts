import { RawDemoEntry, FinalCrmEntry, RawSignUpEntry } from "../types/entry.types";
import { studentClassMapper, demoDayMapper, submissionTypeMapper, formularUrlMapper, groupDayChecker} from "./helpers";

export class FinalCrmEntryMapper {
    rawEntry: RawDemoEntry | RawSignUpEntry;
    finalCrmEntry: FinalCrmEntry;

    constructor(rawEntry: RawDemoEntry | RawSignUpEntry) {
        this.rawEntry = rawEntry;
    }

    /**
     * 
     * @param rawEntry - RawEntry
     * @returns FinalDemoCrmEntry
     * FinalCrmEntry.parentName: RawEntry.datele_parintelui.first + " " + RawEntry.datele_parintelui.last
     * FinalCrmEntry.parentEmail: RawEntry.emailul_parintelui
     * FinalCrmEntry.parentPhone: RawEntry.telefon_parinte
     * FinalCrmEntry.studentName: RawEntry.datele_cursantului.first + " " + RawEntry.datele_cursantului.last
     * FinalCrmEntry.studentEmail: RawEntry.emailul_cursantului
     * FinalCrmEntry.studentPhone: RawEntry.telefon_cursantului
     * FinalCrmEntry.studentClass: RawEntry.clasa_cursantului
     * FinalCrmEntry.BESP_demoDay: RawEntry.zi_demo_debate
     * FinalCrmEntry.BESP_studentGroup: RawEntry.clasa_cursantului
     * FinalCrmEntry.BESP_paymentProof: RawEntry.proof_de_plata
     * FinalCrmEntry.BESP_status: RawEntry.status
     * FinalCrmEntry.BESP_segment: RawEntry.segment
     */
    demoMapper(rawEntry: RawDemoEntry): FinalCrmEntry { 
        const finalDemoCrmEntry = {
            parentName: rawEntry.datele_parintelui.first + " " + rawEntry.datele_parintelui.last,
            parentEmail: rawEntry.emailul_parintelui,
            parentPhone: rawEntry.telefon_parinte,
            parentJob: "", // No job field in RawDemoEntry
            parentBusiness: "", // No business field in RawDemoEntry
            studentName: rawEntry.datele_cursantului.first + " " + rawEntry.datele_cursantului.last,
            studentEmail: rawEntry.emailul_cursantului,
            studentPhone: rawEntry.telefon_cursantului,
            studentSchool: "", // No school field in RawDemoEntry
            studentClass: studentClassMapper(rawEntry.clasa_cursantului).class,
            BESP_demoDay: demoDayMapper(rawEntry.zi_demo_debate),
            BESP_studentLevel: studentClassMapper(rawEntry.clasa_cursantului).level,
            BESP_campaignWeek: rawEntry.campaign_week,
            BESP_adCode: rawEntry.ad_code,
            BESP_paymentProof: null,
            BESP_status: "", // No status in RawDemoEntry
            BESP_segment: submissionTypeMapper(rawEntry.type), // No segment in RawDemoEntry
            STATS_campaignWeek: rawEntry.campaign_week,
            STATS_adCode: rawEntry.ad_code,
            FORMULAR_DEMO: formularUrlMapper(rawEntry.type, rawEntry.ad_code, rawEntry.campaign_week).FORMULAR_DEMO,  //FORMULAR DEMO URL
            FORMULAR_INSCRIERE: formularUrlMapper(rawEntry.type, rawEntry.ad_code, rawEntry.campaign_week).FORMULAR_INSCRIERE  //FORMULAR INSCRIERE URL
        };

        return finalDemoCrmEntry;
    }

    signUpMapper(rawEntry: RawSignUpEntry): FinalCrmEntry {
        const finalSignUpCrmEntry = {
            parentName: rawEntry.datele_parintelui.first + " " + rawEntry.datele_parintelui.last,
            parentEmail: rawEntry.emailul_parintelui,
            parentPhone: rawEntry.telefon_parinte,
            parentJob: rawEntry.locul_de_munca_parinte,
            parentBusiness: rawEntry.date_firma.replace(/[\r\n]+/g, " ").trim(), // CRM don't allow new lines in the business field
            studentName: rawEntry.datele_cursantului.first + " " + rawEntry.datele_cursantului.last,
            studentEmail: rawEntry.emailul_cursantului,
            studentPhone: rawEntry.telefon_cursantului,
            studentSchool: rawEntry.scoala_cursantului,
            studentClass: rawEntry.clasa_cursantului,
            BESP_studentGroup: groupDayChecker(rawEntry) as unknown as string[],
            BESP_segment: submissionTypeMapper(rawEntry.type),
        };

        return finalSignUpCrmEntry;
    }

    /**
     * Mapper for the FinalCrmEntry
     * The following mappings should happen:
     * FinalCrmEntry.parentName: RawEntry.datele_parintelui.first + " " + RawEntry.datele_parintelui.last
     * FinalCrmEntry.parentEmail: RawEntry.emailul_parintelui
     * FinalCrmEntry.parentPhone: RawEntry.telefon_parinte
     * FinalCrmEntry.parentJob: RawEntry.locul_de_munca_parinte
     * FinalCrmEntry.parentBusiness: RawEntry.parentBusiness
     * FinalCrmEntry.studentName: RawEntry.datele_cursantului.first + " " + RawEntry.datele_cursantului.last
     * FinalCrmEntry.studentEmail: RawEntry.emailul_cursantului
     * FinalCrmEntry.studentPhone: RawEntry.telefon_cursantului
     * FinalCrmEntry.studentSchool: RawEntry.scoala_cursantului
     * FinalCrmEntry.studentClass: RawEntry.clasa_cursantului
     * FinalCrmEntry.BESP_demoDay: RawEntry.zi_ms_m2[0]
     * FinalCrmEntry.BESP_studentGroup: RawEntry.modul_ms
     * FinalCrmEntry.BESP_paymentProof: RawEntry.proof_de_plata
     * FinalCrmEntry.BESP_status: RawEntry.status
     * FinalCrmEntry.BESP_segment: RawEntry.segment
    */
    // signUpMapper(entry: RawEntry): FinalCrmEntry { 
        
    // }
}
