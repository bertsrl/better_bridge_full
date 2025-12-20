import { PaymentProof } from "./payments.types";
import { DemoPipeline, SignupPipeline, BacklogPipeline } from "./pipelines.types";

export interface RawDemoEntry {
    datele_parintelui: {
        first: string;
        last: string;
    };
    emailul_parintelui: string;
    telefon_parinte: string;
    datele_cursantului: {
        first: string;
        last: string;
    };
    emailul_cursantului: string;
    telefon_cursantului: string;
    clasa_cursantului: string;
    zi_demo_debate: string;
    found_from: string[];
    politica_confidentialitate: string[];
    orice_doriti_sa_ne_spuneti: string;
    campaign_week: string;
    ad_code: string;
    sunt_de_acord_cu_alte_oportunitati: string;
    type: string;
    build_date: string;
}

export interface RawSignUpEntry {
    datele_parintelui: {
        first: string;
        last: string;
    };
    emailul_parintelui: string;
    telefon_parinte: string;
    locul_de_munca_parinte: string;
    datele_cursantului: {
        first: string;
        last: string;
    };
    emailul_cursantului: string;
    telefon_cursantului: string;
    scoala_cursantului: string;
    clasa_cursantului: string;
    modul_ms: string;
    modul_hs: string;
    interesat_de_turnee: string;
    zi_ms_m2: string[] | string;
    zi_ms_m3: string[] | string;
    zi_ms_m4: string[] | string;
    zi_hs_m2: string[] | string;
    zi_hs_m3: string[] | string;
    zi_hs_m4: string[] | string;
    zi_hs_m6: string[] | string;
    zi_hs_m8: string[] | string;
    date_de_facturare: {
        addr_line1: string;
        addr_line2: string;
        city: string;
        state: string;
        postal: string;
    };
    date_firma: string;
    metoda_de_plata: string;
    triaj_plata: string;
    accept_termeni_si_conditii: string[];
    politica_confidentialitate: string[];
    build_date: string;
    type: string;
}

export interface FinalCrmEntry {
    parentName: string;
    parentEmail: string; 
    parentPhone: string; 
    parentJob: string; 
    parentBusiness: string;
    studentName: string;
    studentEmail: string;
    studentPhone: string;
    studentSchool: string;
    studentClass: string;
    BESP_demoDay?: string;
    BESP_studentLevel?: string;
    BESP_campaignWeek?: string;
    BESP_adCode?: string;
    BESP_studentGroup?: string[];
    BESP_paymentProof?: PaymentProof;
    BESP_status?: string;
    BESP_segment?: string;
    STATS_campaignWeek?: string;
    STATS_adCode?: string;
    FORMULAR_DEMO?: string;
    FORMULAR_INSCRIERE?: string;
}

export type Pipeline = DemoPipeline | SignupPipeline | BacklogPipeline;

export type ActionType = "INSERT" | "UPDATE" | "DELETE";
