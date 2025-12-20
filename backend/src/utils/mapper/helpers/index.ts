import { RawSignUpEntry } from "@/utils/types/entry.types";

import groupCodesMapper from "./groupCodesMapper";

export function submissionTypeMapper(submissionType: string) {
    if (submissionType === "debate_demo") {
        return "DEBATE";
    } else if (submissionType === "debate_signup") {
        return "DEBATE";
    } else if (submissionType === "ps_demo") {
        return "PS";
    } else if (submissionType === "ps_signup") {
        return "PS";
    }
}

export function studentClassMapper(clasa_cursantului: string) {
    if (clasa_cursantului === "Clasa a V-a") {
        return { "class": "5", "level": "MS" };
    } else if (clasa_cursantului === "Clasa a VI-a") {
        return { "class": "6", "level": "MS" };
    } else if (clasa_cursantului === "Clasa a VII-a") {
        return { "class": "7", "level": "MS" };
    } else if (clasa_cursantului === "Clasa a VIII-a") {
        return { "class": "8", "level": "MS" };
    } else if (clasa_cursantului === "Clasa a IX-a") {
        return { "class": "9", "level": "HS" };
    } else if (clasa_cursantului === "Clasa a X-a") {
        return { "class": "10", "level": "HS" };
    } else if (clasa_cursantului === "Clasa a XI-a") {
        return { "class": "11", "level": "HS" };
    } else if (clasa_cursantului === "Clasa a XII-a") {
        return { "class": "12", "level": "HS" };
    } else {
        return { "class": "EROARE ASOCIERE CLASA", "level": "EROARE ASOCIERE CLASA" };
    }
}

export function demoDayMapper(zi_demo: string) {
    if (zi_demo === "11 Septembrie, Joi, de la 19:00 (părinți RO, copii EN)") {
        return "DEMO: 11 Sep";
    } else if (zi_demo === "12 Septembrie, Vineri, de la 19:00 (părinți RO, copii EN)") {
        return "DEMO: 12 Sep";
    } else if (zi_demo === "18 Septembrie, Joi, de la 19:00 (părinți RO, copii EN)") {
        return "DEMO: 18 Sep";
    } else if (zi_demo === "19 Septembrie, Vineri, de la 19:00 (părinți RO, copii EN)") {
        return "DEMO: 19 Sep";
    } else if (zi_demo === "25 Septembrie, Joi, de la 19:00 (părinți RO, copii EN)") {
        return "DEMO: 25 Sep";
    } else if (zi_demo === "26 Septembrie, Vineri, de la 19:00 (părinți RO, copii EN)") {
        return "DEMO: 26 Sep";
    } else if (zi_demo === "2 Octombrie, Joi, de la 19:00 (părinți RO, copii EN)") {
        return "DEMO: 2 Oct";
    } else if (zi_demo === "3 Octombrie, Vineri, de la 19:00 (părinți RO, copii EN)") {
        return "DEMO: 3 Oct";
    } else if (zi_demo === "9 Octombrie, Joi, de la 19:00 (părinți RO, copii EN)") {
        return "DEMO: 9 Oct";
    } else if (zi_demo === "10 Octombrie, Vineri, de la 19:00 (părinți RO, copii EN)") {
        return "DEMO: 10 Oct";
    } else if (zi_demo === "16 Octombrie, Joi, de la 19:00 (părinți RO, copii EN)") {
        return "DEMO: 16 Oct";
    } else if (zi_demo === "24 Octombrie, Vineri, de la 19:00 (părinți RO, copii EN)") {
        return "DEMO: 24 Oct";
    }
    else {
        return "EROARE ASOCIERE ZI DE DEMO";
    }
}

export function formularUrlMapper(submissionType, ad_code: string, campaign_week: string) {
    //Get DEBATE/PS value from submissionTypeMapper
    const conversionPipeline = submissionTypeMapper(submissionType);
    
    if(conversionPipeline === "DEBATE") {
        return {
            FORMULAR_DEMO: "https://www.betterspeakers.eu/inscriere-demo-copii?ad_code=" + ad_code + "&campaign_week=" + campaign_week,
            FORMULAR_INSCRIERE: "https://www.betterspeakers.eu/formular-inscriere-cursuri-copii?ad_code=" + ad_code + "&campaign_week=" + campaign_week
        }
    } else if(conversionPipeline === "PS") {
        return {
            FORMULAR_DEMO: "https://www.betterspeakers.eu/inscriere-demo-public-speaking?ad_code=" + ad_code + "&campaign_week=" + campaign_week,
            FORMULAR_INSCRIERE: "https://www.betterspeakers.eu/inscriere-curs-public-speaking?ad_code=" + ad_code + "&campaign_week=" + campaign_week
        }
    }
}

export function groupDayChecker(rawEntry: RawSignUpEntry) {
    //iterate over rawEntry keys
    for (const [key, value] of Object.entries(rawEntry)) {
        // RETENTION FLOW
        if ((key.startsWith("zi_ms_m") || key.startsWith("zi_hs_m")) && value.length > 0) {
            return groupCodesMapper(key.startsWith("zi_ms_m") ? "MS" : "HS", "M" + key.trim().split("_")[2], value);
        }

        // NEWCOMERS FLOW
        if ((key.startsWith("zile_participare_alese_ms") || key.startsWith("zile_participare_alese_hs")) && value.length > 0) {
            return groupCodesMapper(key.startsWith("zile_participare_alese_ms") ? "MS" : "HS", "M1", value);
        }
    }
    return "EROARE ASOCIERE ZI DE GRUPA";
}