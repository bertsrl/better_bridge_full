import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

type LeadCustomFieldsMappingRowsProps = {
  kommoCustomFields: Record<string, string>;
  customFieldsMapping: {
    id: number;
    data: { jsonKey: string; kommoFieldValue: string };
  }[];
  updateCustomFieldsMapping: (
    newCustomFieldsMapping: {
      id: number;
      data: { jsonKey: string; kommoFieldValue: string };
    }[]
  ) => void;
};

export default function LeadCustomFieldsMappingRows({
  kommoCustomFields,
  customFieldsMapping,
  updateCustomFieldsMapping,
}: LeadCustomFieldsMappingRowsProps) {
  // Store search state per item ID
  const [searchByItemId, setSearchByItemId] = useState<Record<number, string>>(
    {}
  );

  return (
    <div>
      {customFieldsMapping.map((item) => {
        const currentItemId = item.id; // Capture the current item's id
        const search = searchByItemId[currentItemId] || "";

        const filteredKommoCustomFields = Object.entries(
          kommoCustomFields
        ).filter(([key, value]) =>
          key.toLowerCase().includes(search.toLowerCase())
        );

        return (
          <div key={item.id} className="flex flex-col gap-1 py-2">
            <div className="grid grid-cols-7 gap-2 items-center">
              <Input
                placeholder="JSON Key"
                value={item.data.jsonKey}
                onChange={(e) => {
                  const newKey = e.target.value;
                  updateCustomFieldsMapping(
                    customFieldsMapping.map((mappedItem) => {
                      if (mappedItem.id === currentItemId) {
                        return {
                          ...mappedItem,
                          data: { ...mappedItem.data, jsonKey: newKey },
                        };
                      }
                      return mappedItem;
                    })
                  );
                }}
                className="col-span-3 rounded-none h-8 text-xs font-mono"
              />
              <div className="col-span-1 flex justify-center text-muted-foreground">
                <ArrowRight className="h-3 w-3" />
              </div>
              <Select
                value={item.data.kommoFieldValue || ""}
                onValueChange={(val) => {
                  updateCustomFieldsMapping(
                    customFieldsMapping.map((mappedItem) => {
                      if (mappedItem.id === currentItemId) {
                        return {
                          ...mappedItem,
                          data: { ...mappedItem.data, kommoFieldValue: val },
                        };
                      }
                      return mappedItem;
                    })
                  );
                }}
              >
                <SelectTrigger className="col-span-3 rounded-none h-8 text-xs">
                  <SelectValue placeholder="Select Field" />
                </SelectTrigger>
                <SelectContent className="rounded-none max-h-[200px] overflow-y-auto [&>button]:hidden">
                  <Input
                    placeholder="Search"
                    value={search}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      setSearchByItemId((prev) => ({
                        ...prev,
                        [currentItemId]: newValue,
                      }));
                    }}
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={(e) => e.stopPropagation()}
                    onKeyDown={(e) => e.stopPropagation()}
                    className="rounded-none h-8 text-xs font-mono sticky top-0 bg-background z-10"
                  />
                  {filteredKommoCustomFields.map(([key, value]) => (
                    <SelectItem key={key} value={value}>
                      {key}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <button
              type="button"
              onClick={() => {
                updateCustomFieldsMapping(
                  customFieldsMapping.filter(
                    (mappedItem) => mappedItem.id !== currentItemId
                  )
                );
                // Clean up search state when item is removed
                setSearchByItemId((prev) => {
                  const updated = { ...prev };
                  delete updated[currentItemId];
                  return updated;
                });
              }}
              className="text-[10px] text-destructive hover:underline 
              uppercase font-bold tracking-wider self-end"
            >
              Remove
            </button>
          </div>
        );
      })}
    </div>
  );
}
