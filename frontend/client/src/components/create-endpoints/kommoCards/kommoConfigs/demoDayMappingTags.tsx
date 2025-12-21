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

export default function DemoDayMappingTags({
  demoDayTagConfig,
  updateConfig,
  kommoTags,
}: {
  demoDayTagConfig: TagConfig["demoDay"] | null;
  updateConfig: (
    key: keyof NonNullable<TagConfig["demoDay"]>,
    value: any
  ) => void;
  kommoTags: Record<string, string>;
}) {
  const [localDemoDayTagsMap, setLocalDemoDayTagsMap] = useState<
    { id: number; data: { jsonKey: string; kommoId: number } }[]
  >([]);

  const [localFormDemoDayFieldId, setLocalFormDemoDayFieldId] =
    useState<string>(demoDayTagConfig?.formDemoDayFieldId ?? "");
  const [localAddDemoDayTags, setLocalAddDemoDayTags] = useState<boolean>(
    demoDayTagConfig?.addDemoDayTags ?? false
  );

  // Track if we're initializing to prevent update loops
  const isInitializingRef = useRef(true);

  // Initialize demo day tags map from config
  useEffect(() => {
    isInitializingRef.current = true;
    setLocalDemoDayTagsMap(
      factorizeRecordToArray(demoDayTagConfig?.demoDayTagsMap)
    );
    setTimeout(() => {
      isInitializingRef.current = false;
    }, 0);
  }, [demoDayTagConfig?.demoDayTagsMap]);

  // Sync form demo day field id from config
  useEffect(() => {
    setLocalFormDemoDayFieldId(demoDayTagConfig?.formDemoDayFieldId ?? "");
  }, [demoDayTagConfig?.formDemoDayFieldId]);

  // Sync checkbox boolean from config
  useEffect(() => {
    setLocalAddDemoDayTags(demoDayTagConfig?.addDemoDayTags ?? false);
  }, [demoDayTagConfig?.addDemoDayTags]);

  // Update parent when demo day tags map changes (but not during initialization)
  useEffect(() => {
    if (isInitializingRef.current) {
      return;
    }

    const factorizedMap = factorizeArrayToRecord(localDemoDayTagsMap);
    const currentMap = demoDayTagConfig?.demoDayTagsMap || {};

    const mapsAreEqual =
      Object.keys(factorizedMap).length === Object.keys(currentMap).length &&
      Object.keys(factorizedMap).every(
        (key) => factorizedMap[key] === currentMap[key]
      );

    if (!mapsAreEqual) {
      updateConfig("demoDayTagsMap", factorizedMap);
    }
  }, [localDemoDayTagsMap]);

  // Update parent when checkbox changes
  const handleCheckboxChange = (checked: boolean) => {
    setLocalAddDemoDayTags(checked);
    updateConfig("addDemoDayTags", checked);
  };

  // Update parent when form demo day field id changes
  const handleFormDemoDayFieldIdChange = (value: string) => {
    setLocalFormDemoDayFieldId(value);
    updateConfig("formDemoDayFieldId", value || null);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Checkbox
          checked={localAddDemoDayTags}
          onCheckedChange={handleCheckboxChange}
          className="cursor-pointer"
        />
        <span className="text-sm font-medium">Map Demo Day Tags</span>
        <Input
          type="text"
          placeholder="Form Demo Day Field ID"
          value={localFormDemoDayFieldId}
          onChange={(e) => handleFormDemoDayFieldIdChange(e.target.value)}
        />
      </div>
      <BlueprintRow
        kommoIds={kommoTags}
        blueprint={localDemoDayTagsMap}
        updateBlueprint={setLocalDemoDayTagsMap}
      />
    </div>
  );
}

