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

export default function StudentLevelMappingTags({
  studentLevelTagConfig,
  updateConfig,
  kommoTags,
}: {
  studentLevelTagConfig: TagConfig["studentLevel"] | null;
  updateConfig: (
    key: keyof NonNullable<TagConfig["studentLevel"]>,
    value: any
  ) => void;
  kommoTags: Record<string, string>;
}) {
  const [localStudentLevelTagsMap, setLocalStudentLevelTagsMap] = useState<
    { id: number; data: { jsonKey: string; kommoId: number } }[]
  >([]);

  const [localFormGradeFieldId, setLocalFormGradeFieldId] = useState<string>(
    studentLevelTagConfig?.formGradeFieldId ?? ""
  );
  const [localAddStudentLevelTags, setLocalAddStudentLevelTags] =
    useState<boolean>(studentLevelTagConfig?.addStudentLevelTags ?? false);

  // Track if we're initializing to prevent update loops
  const isInitializingRef = useRef(true);

  // Initialize student level tags map from config
  useEffect(() => {
    isInitializingRef.current = true;
    setLocalStudentLevelTagsMap(
      factorizeRecordToArray(studentLevelTagConfig?.studentLevelTagsMap)
    );
    setTimeout(() => {
      isInitializingRef.current = false;
    }, 0);
  }, [studentLevelTagConfig?.studentLevelTagsMap]);

  // Sync form grade field id from config
  useEffect(() => {
    setLocalFormGradeFieldId(
      studentLevelTagConfig?.formGradeFieldId ?? ""
    );
  }, [studentLevelTagConfig?.formGradeFieldId]);

  // Sync checkbox boolean from config
  useEffect(() => {
    setLocalAddStudentLevelTags(
      studentLevelTagConfig?.addStudentLevelTags ?? false
    );
  }, [studentLevelTagConfig?.addStudentLevelTags]);

  // Update parent when student level tags map changes (but not during initialization)
  useEffect(() => {
    if (isInitializingRef.current) {
      return;
    }

    const factorizedMap = factorizeArrayToRecord(localStudentLevelTagsMap);
    const currentMap = studentLevelTagConfig?.studentLevelTagsMap || {};

    const mapsAreEqual =
      Object.keys(factorizedMap).length === Object.keys(currentMap).length &&
      Object.keys(factorizedMap).every(
        (key) => factorizedMap[key] === currentMap[key]
      );

    if (!mapsAreEqual) {
      updateConfig("studentLevelTagsMap", factorizedMap);
    }
  }, [localStudentLevelTagsMap]);

  // Update parent when checkbox changes
  const handleCheckboxChange = (checked: boolean) => {
    setLocalAddStudentLevelTags(checked);
    updateConfig("addStudentLevelTags", checked);
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
          checked={localAddStudentLevelTags}
          onCheckedChange={handleCheckboxChange}
          className="cursor-pointer"
        />
        <span className="text-sm font-medium">Map Student Level Tags</span>
        <Input
          type="text"
          placeholder="Form Grade Field ID"
          value={localFormGradeFieldId}
          onChange={(e) => handleFormGradeFieldIdChange(e.target.value)}
        />
      </div>
      <BlueprintRow
        kommoIds={kommoTags}
        blueprint={localStudentLevelTagsMap}
        updateBlueprint={setLocalStudentLevelTagsMap}
      />
    </div>
  );
}

