import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ApiInfo } from "PARENT_DIR/_shared/dto";
import { useEffect, useState, useRef } from "react";
import LeadCustomFieldsMappingRows from "./kommoCards/leadCustomFieldsMappingRows";
import getCustomFields from "@/phone/kommo/get-custom-fields";
import { Label } from "../ui/label";

type LeadCardMappingsCardProps = {
  newApiInfo: Partial<ApiInfo>;
  updateNewApiInfo: (newApiInfo: Partial<ApiInfo>) => void;
};

const factorizeCustomFieldsMappingForApiInfo = (
  customFieldsMapping: {
    id: number;
    data: { jsonKey: string; kommoFieldValue: string };
  }[]
) => {
  return customFieldsMapping.reduce((acc: Record<string, string>, item) => {
    acc[item.data.jsonKey] = item.data.kommoFieldValue;
    return acc;
  }, {});
};

export default function LeadCardMappingsCard({
  newApiInfo,
  updateNewApiInfo,
}: LeadCardMappingsCardProps) {
  // this is reffering to the final kommo_map object that will be sent to the parent component
  const localKommoMapRef = useRef(newApiInfo["kommo_map"]).current;
  const [localCardsMappingEnabled, setLocalCardsMappingEnabled] = useState(
    localKommoMapRef?.leadCardMappingEnabled ?? false
  );
  const [localCardsMappingKeys, setLocalCardsMappingKeys] = useState(
    localKommoMapRef?.leadCardMappingKeys ?? {}
  );

  // local states for custom fields mapping
  const [customFieldsMapping, setCustomFieldsMapping] = useState<
    {
      id: number;
      data: { jsonKey: string; kommoFieldValue: string };
    }[]
  >([]);
  const nextIdRef = useRef(1);

  useEffect(() => {
    console.log("🔍 localCardsMappingKeys: ", localCardsMappingKeys);
    console.log("🔍 localCardsMappingEnabled: ", localCardsMappingEnabled);
  }, [localCardsMappingKeys, localCardsMappingEnabled]);

  // Initialize nextIdRef based on existing items
  useEffect(() => {
    if (customFieldsMapping.length > 0) {
      const maxId = Math.max(...customFieldsMapping.map((item) => item.id));
      nextIdRef.current = maxId + 1;
    }
  }, []);

  const [kommoCustomFields, setKommoCustomFields] = useState<
    Record<string, string>
  >({});
  // fetch custom fields from kommo
  useEffect(() => {
    getCustomFields().then((customFields) => {
      setKommoCustomFields(customFields);
    });
  }, []);

  useEffect(() => {
    console.log("🔍 customFieldsMapping: ", customFieldsMapping);

    // update newApiInfo with the new custom fields mapping if the localCardsMappingEnabled is true
    if (localCardsMappingEnabled) {
      const newCustomFieldsMapping =
        factorizeCustomFieldsMappingForApiInfo(customFieldsMapping);

      updateNewApiInfo({
        ...newApiInfo,
        kommo_map: {
          ...newApiInfo.kommo_map,
          leadCardMappingKeys: newCustomFieldsMapping,
        } as ApiInfo["kommo_map"],
      });
    }
  }, [kommoCustomFields, customFieldsMapping]);

  return (
    <>
      <Card
        className="rounded-none border-border shadow-none bg-background"
        style={{
          opacity: localCardsMappingEnabled ? 1 : 0.5,
          filter: localCardsMappingEnabled ? "none" : "grayscale(100%)",
        }}
      >
        <CardHeader className="bg-secondary/30 pb-3 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CardTitle className="text-sm font-bold uppercase tracking-wider">
                Lead Cards Mapping
              </CardTitle>
              <div
                className="flex gap-3 space-x-2 px-3 border border-border rounded-full p-1 hover:bg-secondary cursor-pointer"
                onClick={() => {
                  setLocalCardsMappingEnabled(!localCardsMappingEnabled);
                }}
              >
                <span className="text-xs font-bold uppercase tracking-wider">
                  Enable
                </span>
                <Checkbox
                  className="cursor-pointer"
                  checked={localCardsMappingEnabled}
                />
              </div>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                // Add a new empty key mapping
                setCustomFieldsMapping([
                  ...customFieldsMapping,
                  {
                    id: nextIdRef.current++,
                    data: { jsonKey: "", kommoFieldValue: "" },
                  },
                ]);
              }}
              className="h-6 w-6 p-0 rounded-none hover:bg-secondary"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border mx-3">
            <LeadCustomFieldsMappingRows
              kommoCustomFields={kommoCustomFields}
              customFieldsMapping={customFieldsMapping}
              updateCustomFieldsMapping={setCustomFieldsMapping}
            />
          </div>
        </CardContent>
      </Card>
    </>
  );
}
