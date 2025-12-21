import { TagConfig, ApiInfo } from "PARENT_DIR/_shared/dto";
import { useEffect, useState, useRef } from "react";
import GradeMappingTags from "./kommoCards/kommoConfigs/gradeMappingTags";
import ModuleMappingTags from "./kommoCards/kommoConfigs/moduleMappingTags";
import StudentLevelMappingTags from "./kommoCards/kommoConfigs/studentLevelMappingTags";
import GroupMappingTags from "./kommoCards/kommoConfigs/groupMappingTags";
import SegmentMappingTags from "./kommoCards/kommoConfigs/segmentMappingTags";
import DemoDayMappingTags from "./kommoCards/kommoConfigs/demoDayMappingTags";
import getKommoTags from "@/phone/kommo/get-tags";

type TagsMappingsCardProps = {
  newApiInfo: Partial<ApiInfo>;
  updateNewApiInfo: (newApiInfo: Partial<ApiInfo>) => void;
};

const tagMappingOptions: TagConfig = {
  grade: {
    addGradeTags: false,
    formGradeFieldId: null,
    gradeTagsMap: {},
  },
  module: {
    addModuleIDTags: false,
    moduleTagId: null,
  },
  studentLevel: {
    addStudentLevelTags: false,
    formGradeFieldId: null,
    studentLevelTagsMap: {},
  },
  group: {
    addGroupTags: false,
    formGroupFieldId: null,
    groupTagsMap: {},
  },
  segment: {
    addSegmentTags: false,
    segmentID: null,
    segmentTagId: null,
  },
  demoDay: {
    addDemoDayTags: false,
    formDemoDayFieldId: null,
    demoDayTagsMap: {},
  },
};

export default function TagMappingRows({
  newApiInfo,
  updateNewApiInfo,
}: TagsMappingsCardProps) {
  // Initialize from parent or use defaults
  const initialTagConfig = newApiInfo.kommo_map?.tagConfig ?? tagMappingOptions;

  const [localTagConfig, setLocalTagConfig] =
    useState<TagConfig>(initialTagConfig);

  // Track if we're initializing to prevent update loops
  const isInitializingRef = useRef(true);

  // Sync from parent when kommo_map.tagConfig changes
  useEffect(() => {
    isInitializingRef.current = true;
    const parentTagConfig = newApiInfo.kommo_map?.tagConfig;
    if (parentTagConfig) {
      setLocalTagConfig(parentTagConfig);
    }
    setTimeout(() => {
      isInitializingRef.current = false;
    }, 0);
  }, [newApiInfo.kommo_map?.tagConfig]);

  // Update parent when localTagConfig changes (but not during initialization)
  useEffect(() => {
    if (isInitializingRef.current) {
      return;
    }

    const currentKommoMap = newApiInfo.kommo_map || {
      contactMappingEnabled: false,
      contactMappingKeys: {},
      leadCardMappingEnabled: false,
      leadCardMappingKeys: {},
      tagConfig: null,
    };

    updateNewApiInfo({
      ...newApiInfo,
      kommo_map: {
        ...currentKommoMap,
        tagConfig: localTagConfig,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localTagConfig]);

  // setters to update partial objects of the tag config
  const updateTagConfig = (key: keyof TagConfig, value: any) => {
    setLocalTagConfig((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        ...value,
      },
    }));
  };

  const [kommoTags, setKommoTags] = useState<Record<string, string>>({});
  useEffect(() => {
    getKommoTags().then((tags) => {
      setKommoTags(tags);
    });
  }, []);

  return (
    <div className="flex flex-col gap-2 space-y-2 my-4">
      <GradeMappingTags
        gradeTagConfig={localTagConfig.grade ?? null}
        updateConfig={(
          key: keyof NonNullable<TagConfig["grade"]>,
          value: any
        ) => updateTagConfig("grade" as keyof TagConfig, { [key]: value })}
        kommoTags={kommoTags}
      />
      <ModuleMappingTags
        moduleTagConfig={localTagConfig.module ?? null}
        updateConfig={(
          key: keyof NonNullable<TagConfig["module"]>,
          value: any
        ) => updateTagConfig("module" as keyof TagConfig, { [key]: value })}
        kommoTags={kommoTags}
      />
      <StudentLevelMappingTags
        studentLevelTagConfig={localTagConfig.studentLevel ?? null}
        updateConfig={(
          key: keyof NonNullable<TagConfig["studentLevel"]>,
          value: any
        ) =>
          updateTagConfig("studentLevel" as keyof TagConfig, {
            [key]: value,
          })
        }
        kommoTags={kommoTags}
      />
      <GroupMappingTags
        groupTagConfig={localTagConfig.group ?? null}
        updateConfig={(
          key: keyof NonNullable<TagConfig["group"]>,
          value: any
        ) => updateTagConfig("group" as keyof TagConfig, { [key]: value })}
        kommoTags={kommoTags}
      />
      <SegmentMappingTags
        segmentTagConfig={localTagConfig.segment ?? null}
        updateConfig={(
          key: keyof NonNullable<TagConfig["segment"]>,
          value: any
        ) => updateTagConfig("segment" as keyof TagConfig, { [key]: value })}
        kommoTags={kommoTags}
      />
      <DemoDayMappingTags
        demoDayTagConfig={localTagConfig.demoDay ?? null}
        updateConfig={(
          key: keyof NonNullable<TagConfig["demoDay"]>,
          value: any
        ) => updateTagConfig("demoDay" as keyof TagConfig, { [key]: value })}
        kommoTags={kommoTags}
      />
    </div>
  );
}
