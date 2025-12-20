/**
 * @description Schema for custom tags adding to leads created in Kommo
 * If the endpoint is designed to create leads then the config
 * should be used to mark what kind of tags should be added to the lead
 * We care about getting current tags ids and associating through
 * the UI the form_ids values to the chosen tag ids
 * @example
 * @if addTags option is true @then follow on the tag creation process
 * @else skip the tag creation process
 * @optionType1 - grade 
 * @optionType2 - module
 * @optionType3 - studentLevel
 * @optionType4 - group
 * @optionType5 - segment
 * @optionType6 - demoDay
 */

import { z } from "zod";

export const tagConfigSchema = z.object({
    grade: z.object({
        addGradeTags: z.boolean(),
        formGradeFieldId: z.string(),
        gradeTagsMap: z.record(z.string(), z.number()),
    }).nullable(),
    module: z.object({
        addModuleIDTags: z.boolean(),
        moduleTagId: z.number(),
    }).nullable(),
    studentLevel: z.object({
        addStudentLevelTags: z.boolean(),
        formGradeFieldId: z.string(), // !Important: this is the same as the grade field id because the code adds the school level based on the grade
        studentLevelTagsMap: z.record(z.string(), z.number()),
    }).nullable(),
    group: z.object({
        addGroupTags: z.boolean(),
        formGroupFieldId: z.string(),
        groupTagsMap: z.record(z.string(), z.number()),
    }).nullable(),
    segment: z.object({
        addSegmentTags: z.boolean(),
        segmentID: z.enum(["Public Speaking", "Debate"]),
        segmentTagId: z.number(),
    }).nullable(),
    demoDay: z.object({
        addDemoDayTags: z.boolean(),
        formDemoDayFieldId: z.string(),
        demoDayTagsMap: z.record(z.string(), z.number()),
    }).nullable(),
}).strict();