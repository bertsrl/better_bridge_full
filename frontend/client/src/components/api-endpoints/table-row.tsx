import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Search, Plus, Filter, MoreHorizontal, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ApiInfo } from "PARENT_DIR/_shared/dto";
import { fetchApiInfos } from "@/dbOps/firebase/fetch-apiInfos";
import { updateApiInfoEnabledStatus } from "@/dbOps/firebase/apiInfo/update";
import { toast } from "sonner";

const MethodBadge = ({ method }: { method: string }) => {
  const colors: Record<string, string> = {
    GET: "bg-blue-100 text-blue-700 border-blue-200",
    POST: "bg-emerald-100 text-emerald-700 border-emerald-200",
    PUT: "bg-orange-100 text-orange-700 border-orange-200",
    DELETE: "bg-red-100 text-red-700 border-red-200",
  };

  return (
    <span
      className={`px-2 py-0.5 text-[10px] font-bold tracking-wider border rounded-sm ${
        colors[method] || "bg-gray-100 text-gray-700"
      }`}
    >
      {method}
    </span>
  );
};

export default function ApiEndpointsTableRow({
  apiInfo,
}: {
  apiInfo: ApiInfo;
}) {
  const [localApiInfo, setLocalApiInfo] = useState<ApiInfo>(apiInfo);
  const [apiInfoRowDisabled, setApiInfoRowDisabled] = useState<boolean>(false);

  const handleUpdateApiInfoEnabledStatus = async (
    apiInfoId: string,
    enabled: boolean
  ) => {
    setLocalApiInfo({ ...localApiInfo, enabled: enabled });
    setApiInfoRowDisabled(true);
    const result = await updateApiInfoEnabledStatus(apiInfoId, enabled);
    if (result) {
      toast.success("API info enabled status updated successfully");
    }
    setApiInfoRowDisabled(false);
  };

  return (
    <div
      key={localApiInfo.id}
      className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-secondary/20 transition-colors group"
    >
      <div className="col-span-1">
        <MethodBadge method={localApiInfo.method} />
      </div>
      <div className="col-span-4 font-mono text-sm text-foreground font-medium">
        {localApiInfo.endpoint}
      </div>
      <div className="col-span-2">
        <span className="text-sm text-muted-foreground">
          {localApiInfo.module}
        </span>
      </div>
      <div className="col-span-2 flex items-center gap-2">
        <Switch
          checked={localApiInfo.enabled}
          className="data-[state=checked]:bg-emerald-600"
          onCheckedChange={(checked) =>
            handleUpdateApiInfoEnabledStatus(localApiInfo.id, checked)
          }
        />
        <span
          className={`text-xs font-medium ${
            localApiInfo.enabled ? "text-emerald-700" : "text-muted-foreground"
          }`}
        >
          {localApiInfo.enabled ? "Active" : "Disabled"}
        </span>
      </div>
      <div className="col-span-2 text-sm text-muted-foreground font-mono">
        {localApiInfo.lastRun?.toISOString()}
      </div>
      <div className="col-span-1 text-right opacity-0 group-hover:opacity-100 transition-opacity">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="rounded-none border-border"
          >
            <DropdownMenuItem className="rounded-none cursor-pointer">
              Edit Route
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-none cursor-pointer">
              View Logs
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-none cursor-pointer text-destructive focus:text-destructive">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
