import { TagConfig } from "PARENT_DIR/_shared/dto";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export default function ModuleMappingTags({
  moduleTagConfig,
  updateConfig,
  kommoTags,
}: {
  moduleTagConfig: TagConfig["module"] | null;
  updateConfig: (
    key: keyof NonNullable<TagConfig["module"]>,
    value: any
  ) => void;
  kommoTags: Record<string, string>;
}) {
  const [localAddModuleIDTags, setLocalAddModuleIDTags] = useState<boolean>(
    moduleTagConfig?.addModuleIDTags ?? false
  );
  const [localModuleTagId, setLocalModuleTagId] = useState<number | null>(
    moduleTagConfig?.moduleTagId ?? null
  );
  const [search, setSearch] = useState<string>("");

  const filteredKommoTags = Object.entries(kommoTags).filter(([key]) =>
    key.toLowerCase().includes(search.toLowerCase())
  );

  // Find the tag name that corresponds to the stored moduleTagId
  const selectedTagName = localModuleTagId
    ? Object.entries(kommoTags).find(
        ([_, value]) => Number(value) === localModuleTagId
      )?.[0] || ""
    : "";

  // Sync checkbox boolean from config
  useEffect(() => {
    setLocalAddModuleIDTags(moduleTagConfig?.addModuleIDTags ?? false);
  }, [moduleTagConfig?.addModuleIDTags]);

  // Sync module tag id from config
  useEffect(() => {
    setLocalModuleTagId(moduleTagConfig?.moduleTagId ?? null);
  }, [moduleTagConfig?.moduleTagId]);

  // Update parent when checkbox changes
  const handleCheckboxChange = (checked: boolean) => {
    setLocalAddModuleIDTags(checked);
    updateConfig("addModuleIDTags", checked);
  };

  // Update parent when module tag id changes
  const handleModuleTagIdChange = (val: string) => {
    const tagIdNumber = Number(val);
    setLocalModuleTagId(tagIdNumber);
    updateConfig("moduleTagId", tagIdNumber || null);
  };

  return (
    <div className="flex items-center gap-2">
      <Checkbox
        checked={localAddModuleIDTags}
        onCheckedChange={handleCheckboxChange}
        className="cursor-pointer"
      />
      <span className="text-sm font-medium">Map Module ID Tags</span>
      <Select
        value={localModuleTagId ? String(localModuleTagId) : ""}
        onValueChange={handleModuleTagIdChange}
      >
        <SelectTrigger className="w-[200px] rounded-none h-8 text-xs">
          <SelectValue placeholder="Select Module Tag">
            {selectedTagName || "Select Module Tag"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="rounded-none max-h-[200px] overflow-y-auto [&>button]:hidden">
          <Input
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
            className="rounded-none h-8 text-xs font-mono sticky top-0 bg-background z-10"
          />
          {filteredKommoTags.map(([key, value]) => (
            <SelectItem key={key} value={value}>
              {key}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

