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

export default function SegmentMappingTags({
  segmentTagConfig,
  updateConfig,
  kommoTags,
}: {
  segmentTagConfig: TagConfig["segment"] | null;
  updateConfig: (
    key: keyof NonNullable<TagConfig["segment"]>,
    value: any
  ) => void;
  kommoTags: Record<string, string>;
}) {
  const [localAddSegmentTags, setLocalAddSegmentTags] = useState<boolean>(
    segmentTagConfig?.addSegmentTags ?? false
  );
  const [localSegmentID, setLocalSegmentID] = useState<
    "Public Speaking" | "Debate" | null
  >(segmentTagConfig?.segmentID ?? null);
  const [localSegmentTagId, setLocalSegmentTagId] = useState<number | null>(
    segmentTagConfig?.segmentTagId ?? null
  );
  const [search, setSearch] = useState<string>("");

  const filteredKommoTags = Object.entries(kommoTags).filter(([key]) =>
    key.toLowerCase().includes(search.toLowerCase())
  );

  // Find the tag name that corresponds to the stored segmentTagId
  const selectedTagName = localSegmentTagId
    ? Object.entries(kommoTags).find(
        ([_, value]) => Number(value) === localSegmentTagId
      )?.[0] || ""
    : "";

  // Sync checkbox boolean from config
  useEffect(() => {
    setLocalAddSegmentTags(segmentTagConfig?.addSegmentTags ?? false);
  }, [segmentTagConfig?.addSegmentTags]);

  // Sync segment ID from config
  useEffect(() => {
    setLocalSegmentID(segmentTagConfig?.segmentID ?? null);
  }, [segmentTagConfig?.segmentID]);

  // Sync segment tag id from config
  useEffect(() => {
    setLocalSegmentTagId(segmentTagConfig?.segmentTagId ?? null);
  }, [segmentTagConfig?.segmentTagId]);

  // Update parent when checkbox changes
  const handleCheckboxChange = (checked: boolean) => {
    setLocalAddSegmentTags(checked);
    updateConfig("addSegmentTags", checked);
  };

  // Update parent when segment ID changes
  const handleSegmentIDChange = (val: "Public Speaking" | "Debate") => {
    setLocalSegmentID(val);
    updateConfig("segmentID", val);
  };

  // Update parent when segment tag id changes
  const handleSegmentTagIdChange = (val: string) => {
    const tagIdNumber = Number(val);
    setLocalSegmentTagId(tagIdNumber);
    updateConfig("segmentTagId", tagIdNumber || null);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Checkbox
          checked={localAddSegmentTags}
          onCheckedChange={handleCheckboxChange}
          className="cursor-pointer"
        />
        <span className="text-sm font-medium">Map Segment Tags</span>
        <Select
          value={localSegmentID || ""}
          onValueChange={handleSegmentIDChange}
        >
          <SelectTrigger className="w-[180px] rounded-none h-8 text-xs">
            <SelectValue placeholder="Select Segment" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Public Speaking">Public Speaking</SelectItem>
            <SelectItem value="Debate">Debate</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={localSegmentTagId ? String(localSegmentTagId) : ""}
          onValueChange={handleSegmentTagIdChange}
        >
          <SelectTrigger className="w-[200px] rounded-none h-8 text-xs">
            <SelectValue placeholder="Select Segment Tag">
              {selectedTagName || "Select Segment Tag"}
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
    </div>
  );
}

