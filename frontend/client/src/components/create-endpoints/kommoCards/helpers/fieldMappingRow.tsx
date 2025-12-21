import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowRight, Plus } from "lucide-react";
import { useState, useRef, useEffect } from "react";

type BlueprintRowProps = {
  kommoIds: Record<string, string>;
  blueprint: {
    id: number;
    data: { jsonKey: string; kommoId: number };
  }[];
  updateBlueprint: (
    newBlueprint: {
      id: number;
      data: { jsonKey: string; kommoId: number };
    }[]
  ) => void;
};

export default function BlueprintRow({
  kommoIds,
  blueprint,
  updateBlueprint,
}: BlueprintRowProps) {
  // Store search state per item ID
  const [searchByItemId, setSearchByItemId] = useState<Record<number, string>>(
    {}
  );

  // Track next ID for new entries
  const nextIdRef = useRef(1);

  // Initialize nextIdRef based on existing items
  useEffect(() => {
    if (blueprint.length > 0) {
      const maxId = Math.max(...blueprint.map((item) => item.id));
      if (maxId >= nextIdRef.current) {
        nextIdRef.current = maxId + 1;
      }
    }
  }, [blueprint]);

  const handleAddNewEntry = () => {
    updateBlueprint([
      ...blueprint,
      {
        id: nextIdRef.current++,
        data: { jsonKey: "", kommoId: 0 },
      },
    ]);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="divide-y divide-border border border-border rounded-md">
        {blueprint.length === 0 ? (
          <div className="p-4 text-center text-sm text-muted-foreground">
            No mappings yet. Click the + button to add one.
          </div>
        ) : (
          blueprint.map((item) => {
            const currentItemId = item.id; // Capture the current item's id
            const search = searchByItemId[currentItemId] || "";

            const filteredKommoIds = Object.entries(kommoIds).filter(
              ([key, value]) => key.toLowerCase().includes(search.toLowerCase())
            );

            // Find the key (tag name) that corresponds to the stored kommoId
            const selectedTagName = item.data.kommoId
              ? Object.entries(kommoIds).find(
                  ([_, value]) => Number(value) === item.data.kommoId
                )?.[0] || ""
              : "";

            return (
              <div
                key={item.id}
                className="flex flex-col gap-2 p-3 hover:bg-secondary/30 transition-colors"
              >
                <div className="grid grid-cols-7 gap-2 items-center">
                  <Input
                    placeholder="JSON Key"
                    value={item.data.jsonKey}
                    onChange={(e) => {
                      const newKey = e.target.value;
                      updateBlueprint(
                        blueprint.map((mappedItem) => {
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
                    value={item.data.kommoId ? String(item.data.kommoId) : ""}
                    onValueChange={(val) => {
                      // Convert string value to number
                      const kommoIdNumber = Number(val);
                      updateBlueprint(
                        blueprint.map((mappedItem) => {
                          if (mappedItem.id === currentItemId) {
                            return {
                              ...mappedItem,
                              data: {
                                ...mappedItem.data,
                                kommoId: kommoIdNumber,
                              },
                            };
                          }
                          return mappedItem;
                        })
                      );
                    }}
                  >
                    <SelectTrigger className="col-span-3 rounded-none h-8 text-xs">
                      <SelectValue placeholder="Select Kommo Tag">
                        {selectedTagName || "Select Kommo Tag"}
                      </SelectValue>
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
                      {filteredKommoIds.map(([key, value]) => (
                        <SelectItem key={key} value={value}>
                          {key}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {blueprint.length > 1 && (
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        updateBlueprint(
                          blueprint.filter(
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
                      className="text-[10px] text-destructive hover:underline uppercase font-bold tracking-wider"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
      <Button
        type="button"
        size="sm"
        variant="ghost"
        onClick={handleAddNewEntry}
        className="h-8 w-full rounded-none border border-dashed border-border hover:bg-secondary/50"
      >
        <Plus className="h-4 w-4 mr-2" />
        <span className="text-xs">Add Mapping</span>
      </Button>
    </div>
  );
}
