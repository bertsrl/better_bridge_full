import { FinalCrmEntry, Pipeline, ActionType } from "@/utils/types/entry.types";

export class CrmHandlerDto {
    id: string;
    pipeline: Pipeline;
    entry: FinalCrmEntry;
    actionType: ActionType;
}