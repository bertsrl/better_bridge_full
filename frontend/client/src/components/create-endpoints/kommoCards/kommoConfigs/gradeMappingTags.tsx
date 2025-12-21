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
  gradeTagsMap: Record<string, number> | undefined
): { id: number; data: { jsonKey: string; kommoId: number } }[] => {
  if (!gradeTagsMap || Object.keys(gradeTagsMap).length === 0) {
    return [];
  }
  return Object.entries(gradeTagsMap).map(([jsonKey, kommoId], index) => ({
    id: index + 1,
    data: { jsonKey, kommoId },
  }));
};

export default function GradeMappingTags({
  gradeTagConfig,
  updateConfig,
  kommoTags,
}: {
  gradeTagConfig: TagConfig["grade"] | null;
  updateConfig: (
    key: keyof NonNullable<TagConfig["grade"]>,
    value: any
  ) => void;
  kommoTags: Record<string, string>;
}) {
  const [localGradeTagsMap, setLocalGradeTagsMap] = useState<
    { id: number; data: { jsonKey: string; kommoId: number } }[]
  >([]);

  const [localFormGradeFieldId, setLocalFormGradeFieldId] = useState<string>(
    gradeTagConfig?.formGradeFieldId ?? ""
  );
  const [localAddGradeTags, setLocalAddGradeTags] = useState<boolean>(
    gradeTagConfig?.addGradeTags ?? false
  );

  // Track if we're initializing to prevent update loops
  const isInitializingRef = useRef(true);

  // Initialize grade tags map from config
  useEffect(() => {
    isInitializingRef.current = true;
    setLocalGradeTagsMap(factorizeRecordToArray(gradeTagConfig?.gradeTagsMap));
    // Reset flag after a short delay to allow state to settle
    setTimeout(() => {
      isInitializingRef.current = false;
    }, 0);
  }, [gradeTagConfig?.gradeTagsMap]);

  // Sync form grade field id from config
  useEffect(() => {
    setLocalFormGradeFieldId(gradeTagConfig?.formGradeFieldId ?? "");
  }, [gradeTagConfig?.formGradeFieldId]);

  // Sync checkbox boolean from config
  useEffect(() => {
    setLocalAddGradeTags(gradeTagConfig?.addGradeTags ?? false);
  }, [gradeTagConfig?.addGradeTags]);

  // Update parent when grade tags map changes (but not during initialization)
  useEffect(() => {
    // Skip update during initialization
    if (isInitializingRef.current) {
      return;
    }

    // Only update if the factorized map is different from the current config
    const factorizedMap = factorizeArrayToRecord(localGradeTagsMap);
    const currentMap = gradeTagConfig?.gradeTagsMap || {};

    // Compare maps to avoid unnecessary updates
    const mapsAreEqual =
      Object.keys(factorizedMap).length === Object.keys(currentMap).length &&
      Object.keys(factorizedMap).every(
        (key) => factorizedMap[key] === currentMap[key]
      );

    if (!mapsAreEqual) {
      updateConfig("gradeTagsMap", factorizedMap);
    }
  }, [localGradeTagsMap]);

  // Update parent when checkbox changes
  const handleCheckboxChange = (checked: boolean) => {
    setLocalAddGradeTags(checked);
    updateConfig("addGradeTags", checked);
  };

  // Update parent when form grade field id changes
  const handleFormGradeFieldIdChange = (value: string) => {
    setLocalFormGradeFieldId(value);
    updateConfig("formGradeFieldId", value || null);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Checkbox
          checked={localAddGradeTags}
          onCheckedChange={handleCheckboxChange}
          className="cursor-pointer"
        />
        <span className="text-sm font-medium">Map Grade Tags</span>
        <Input
          type="text"
          placeholder="Form Grade Field ID"
          value={localFormGradeFieldId}
          onChange={(e) => handleFormGradeFieldIdChange(e.target.value)}
        />
      </div>
      <BlueprintRow
        kommoIds={kommoTags}
        blueprint={localGradeTagsMap}
        updateBlueprint={setLocalGradeTagsMap}
      />
    </div>
  );
}
