import { TagConfig } from "PARENT_DIR/_shared/dto";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import BlueprintRow from "../helpers/fieldMappingRow";

// Convert array format to Record format for API
const factorizeArrayToRecord = (
  array: { id: number; data: { jsonKey: string; kommoId: number } }[]
): Record<string, number> => {
  const result: Record<string, number> = {};
  array.forEach((item) => {
    result[item.data.jsonKey] = item.data.kommoId;
  });
  return result;
};

// Convert Record format to array format for UI
const factorizeRecordToArray = (
  tagsMap: Record<string, number> | undefined
): { id: number; data: { jsonKey: string; kommoId: number } }[] => {
  if (!tagsMap || Object.keys(tagsMap).length === 0) {
    return [];
  }
  return Object.entries(tagsMap).map(([jsonKey, kommoId], index) => ({
    id: index + 1,
    data: { jsonKey, kommoId },
  }));
};

export default function GroupMappingTags({
  groupTagConfig,
  updateConfig,
  kommoTags,
}: {
  groupTagConfig: TagConfig["group"] | null;
  updateConfig: (
    key: keyof NonNullable<TagConfig["group"]>,
    value: any
  ) => void;
  kommoTags: Record<string, string>;
}) {
  const [localGroupTagsMap, setLocalGroupTagsMap] = useState<
    { id: number; data: { jsonKey: string; kommoId: number } }[]
  >([]);

  const [localFormGroupFieldId, setLocalFormGroupFieldId] = useState<string>(
    groupTagConfig?.formGroupFieldId ?? ""
  );
  const [localAddGroupTags, setLocalAddGroupTags] = useState<boolean>(
    groupTagConfig?.addGroupTags ?? false
  );

  // Track if we're initializing to prevent update loops
  const isInitializingRef = useRef(true);

  // Initialize group tags map from config
  useEffect(() => {
    isInitializingRef.current = true;
    setLocalGroupTagsMap(factorizeRecordToArray(groupTagConfig?.groupTagsMap));
    setTimeout(() => {
      isInitializingRef.current = false;
    }, 0);
  }, [groupTagConfig?.groupTagsMap]);

  // Sync form group field id from config
  useEffect(() => {
    setLocalFormGroupFieldId(groupTagConfig?.formGroupFieldId ?? "");
  }, [groupTagConfig?.formGroupFieldId]);

  // Sync checkbox boolean from config
  useEffect(() => {
    setLocalAddGroupTags(groupTagConfig?.addGroupTags ?? false);
  }, [groupTagConfig?.addGroupTags]);

  // Update parent when group tags map changes (but not during initialization)
  useEffect(() => {
    if (isInitializingRef.current) {
      return;
    }

    const factorizedMap = factorizeArrayToRecord(localGroupTagsMap);
    const currentMap = groupTagConfig?.groupTagsMap || {};

    const mapsAreEqual =
      Object.keys(factorizedMap).length === Object.keys(currentMap).length &&
      Object.keys(factorizedMap).every(
        (key) => factorizedMap[key] === currentMap[key]
      );

    if (!mapsAreEqual) {
      updateConfig("groupTagsMap", factorizedMap);
    }
  }, [localGroupTagsMap]);

  // Update parent when checkbox changes
  const handleCheckboxChange = (checked: boolean) => {
    setLocalAddGroupTags(checked);
    updateConfig("addGroupTags", checked);
  };

  // Update parent when form group field id changes
  const handleFormGroupFieldIdChange = (value: string) => {
    setLocalFormGroupFieldId(value);
    updateConfig("formGroupFieldId", value || null);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Checkbox
          checked={localAddGroupTags}
          onCheckedChange={handleCheckboxChange}
          className="cursor-pointer"
        />
        <span className="text-sm font-medium">Map Group Tags</span>
        <Input
          type="text"
          placeholder="Form Group Field ID"
          value={localFormGroupFieldId}
          onChange={(e) => handleFormGroupFieldIdChange(e.target.value)}
        />
      </div>
      <BlueprintRow
        kommoIds={kommoTags}
        blueprint={localGroupTagsMap}
        updateBlueprint={setLocalGroupTagsMap}
      />
    </div>
  );
}

