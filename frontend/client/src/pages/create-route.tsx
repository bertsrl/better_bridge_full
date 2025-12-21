import { useState, useEffect } from "react";
import { Link, Switch, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  ArrowLeft,
  Loader2,
  Plus,
  Trash2,
  Save,
  Database,
  ArrowRight,
  Check,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { fetchApiBuckets } from "@/dbOps/firebase/fetch-apiBuckets";
import RouteConfigurationCard from "@/components/create-endpoints/route-configuration-card";
import { setNewApiInfoAtom } from "@/store";
import { ApiInfo } from "PARENT_DIR/_shared/dto";
import RouteDestinationsConfigCard from "@/components/create-endpoints/route-destinations-config-card";
import getCustomFields from "@/phone/kommo/get-custom-fields";
import {
  SelectScrollDownButton,
  SelectScrollUpButton,
} from "@radix-ui/react-select";
import LeadCardMappingsCard from "@/components/create-endpoints/lead-card-mappings-card";
import getPipelines from "@/phone/kommo/get-pipelines";
import TagsMappingsCard from "@/components/create-endpoints/tags-mappings-card";

// Mock Data for Dropdowns
const kommoContactFields = [
  "Full Name",
  "Phone",
  "Email",
  "Position",
  "Company Name",
  "Tags",
];
const kommoLeadFields = [
  "Lead Name",
  "Sale Value",
  "Pipeline Stage",
  "Responsible User",
  "Created At",
];
const hubspotMockHeaders = [
  "First Name",
  "Last Name",
  "Email Address",
  "Phone Number",
  "Lifecycle Stage",
  "Lead Status",
];

export default function CreateRoute() {
  // Kommo Pipelines State
  const [kommoPipelines, setKommoPipelines] = useState<Record<string, string>>(
    {}
  );
  const [selectedPipelineId, setSelectedPipelineId] = useState<string>("");

  const [localNewApiInfo, setLocalNewApiInfo] = useState<Partial<ApiInfo>>({
    id: "",
    endpoint: "",
    method: "",
    enabled: false,
    module: "",
    lastRun: null,
    customerEmail_field_id: "",
    customerPhone_field_id: "",
    pipeline_id: 0,
    name: "",
    description: "",
    createdAt: null,
    updatedAt: null,
    version: "",
    sourceConfig: undefined,
    rateLimit: undefined,
    kommo_map: undefined,
    hubspot_map: undefined,
  });

  // Kommo State
  const [kommoMappings, setKommoMappings] = useState<{
    contacts: { key: string; field: string }[];
    leads: { key: string; field: string }[];
  }>({
    contacts: [{ key: "user_full_name", field: "Full Name" }],
    leads: [{ key: "deal_value", field: "Sale Value" }],
  });

  const [localKommoMap, setLocalKommoMap] = useState<ApiInfo["kommo_map"]>({
    contactMappingEnabled: false,
    contactMappingKeys: {},
    leadCardMappingEnabled: false,
    leadCardMappingKeys: {},
    tagConfig: null,
  });

  // Hubspot State
  const [hubspotState, setHubspotState] = useState<{
    segmentId: string;
    isLoading: boolean;
    isLoaded: boolean;
    mappings: { key: string; header: string }[];
  }>({
    segmentId: "",
    isLoading: false,
    isLoaded: false,
    mappings: [],
  });

  const fetchKommoPipelines = () => {
    getPipelines().then((pipelines) => {
      setKommoPipelines(pipelines);
    });
  };

  const addKommoMapping = (type: "contacts" | "leads") => {
    setKommoMappings((prev) => ({
      ...prev,
      [type]: [...prev[type], { key: "", field: "" }],
    }));
  };

  const removeKommoMapping = (type: "contacts" | "leads", index: number) => {
    setKommoMappings((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));
  };

  const updateKommoMapping = (
    type: "contacts" | "leads",
    index: number,
    field: "key" | "field",
    value: string
  ) => {
    setKommoMappings((prev) => {
      const newArray = [...prev[type]];
      newArray[index] = { ...newArray[index], [field]: value };
      return { ...prev, [type]: newArray };
    });
  };

  const loadHubspotSegment = () => {
    if (!hubspotState.segmentId) return;
    setHubspotState((prev) => ({ ...prev, isLoading: true }));

    // Simulate API Call
    setTimeout(() => {
      setHubspotState((prev) => ({
        ...prev,
        isLoading: false,
        isLoaded: true,
        mappings: [
          { key: "email", header: "Email Address" },
          { key: "fname", header: "First Name" },
        ],
      }));
    }, 1500);
  };

  const addHubspotMapping = () => {
    setHubspotState((prev) => ({
      ...prev,
      mappings: [...prev.mappings, { key: "", header: "" }],
    }));
  };

  const updateHubspotMapping = (
    index: number,
    field: "key" | "header",
    value: string
  ) => {
    setHubspotState((prev) => {
      const newMappings = [...prev.mappings];
      newMappings[index] = { ...newMappings[index], [field]: value };
      return { ...prev, mappings: newMappings };
    });
  };

  const removeHubspotMapping = (index: number) => {
    setHubspotState((prev) => ({
      ...prev,
      mappings: prev.mappings.filter((_, i) => i !== index),
    }));
  };

  useEffect(() => {
    console.log("🔍 localNewApiInfo: ", localNewApiInfo);
  }, [localNewApiInfo]);

  useEffect(() => {
    fetchKommoPipelines();
  }, []);

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      {/* Header */}
      <div className="flex items-center gap-4 border-b border-border pb-6">
        <Link href="/endpoints">
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-none border-border"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Create API Route
          </h1>
          <p className="text-muted-foreground mt-1">
            Configure data ingestion and mapping for external CRMs.
          </p>
        </div>
      </div>

      <RouteConfigurationCard
        localNewApiInfo={localNewApiInfo}
        updateNewApiInfo={(apiInfo) => setLocalNewApiInfo(apiInfo)}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Route Details & Destination Selection */}
        <RouteDestinationsConfigCard
          localNewApiInfo={localNewApiInfo}
          updateNewApiInfo={(apiInfoMappings) =>
            setLocalNewApiInfo({
              ...localNewApiInfo,
              kommo_map: apiInfoMappings.kommo_map ?? null,
              hubspot_map: apiInfoMappings.hubspot_map ?? null,
            })
          }
        />

        {/* Right Column: Dynamic Configuration */}
        <div className="lg:col-span-2 space-y-8">
          {/* Default State */}
          {!localNewApiInfo.kommo_map && !localNewApiInfo.hubspot_map && (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center border border-dashed border-border text-muted-foreground bg-secondary/10">
              <Database className="h-12 w-12 mb-4 opacity-20" />
              <p>Select a destination to configure mappings.</p>
            </div>
          )}

          {/* Kommo Configuration */}
          {localNewApiInfo.kommo_map && (
            <div className="animate-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between mb-4 border-l-4 border-blue-500 pl-4">
                <h2 className="text-xl font-bold">Kommo CRM Configuration</h2>
                <Badge
                  variant="outline"
                  className="rounded-none border-blue-200 text-blue-700 bg-blue-50"
                >
                  Active
                </Badge>
              </div>

              <div className="flex items-center gap-2 my-4">
                <Label>Pipeline ID</Label>
                <Select
                  value={
                    Object.entries(kommoPipelines).find(
                      ([key, value]) =>
                        value.toString() ===
                        localNewApiInfo.pipeline_id?.toString()
                    )?.[1]
                  }
                  onValueChange={(val) =>
                    setLocalNewApiInfo({
                      ...localNewApiInfo,
                      pipeline_id: parseInt(val),
                    })
                  }
                >
                  <SelectTrigger className="rounded-none h-9 w-[200px]">
                    <SelectValue placeholder="Select Pipeline" />
                  </SelectTrigger>
                  <SelectContent className="rounded-none">
                    {Object.entries(kommoPipelines).map(([key, value]) => (
                      <SelectItem key={key} value={value}>
                        {key}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Check
                  className={`h-4 w-4 ${
                    localNewApiInfo.pipeline_id
                      ? "text-green-600"
                      : "text-gray-300"
                  }`}
                />
              </div>

              <div className="grid grid-cols-1">
                <Separator />

                {/* Leads Column */}
                <div className="flex font-bold text-[1.2vw] my-4">
                  <span>Lead Cards Custom Fields Mapping</span>
                </div>

                <LeadCardMappingsCard
                  newApiInfo={localNewApiInfo}
                  updateNewApiInfo={setLocalNewApiInfo}
                />

                <Separator />

                {/* Tags  */}
                <div className="flex font-bold text-[1.2vw] my-4">
                  <span>Tags Mapping</span>
                </div>

                <TagsMappingsCard
                  newApiInfo={localNewApiInfo}
                  updateNewApiInfo={setLocalNewApiInfo}
                />

                {/* Contacts Column */}
                {/* <Card
                  className="rounded-none border-border shadow-none bg-background"
                  style={{
                    // if disabled then gray the entire card and content
                    opacity: localKommoMap?.contactMappingEnabled ? 1 : 0.5,
                    filter: localKommoMap?.contactMappingEnabled
                      ? "none"
                      : "grayscale(100%)",
                  }}
                >
                  <CardHeader className="bg-secondary/30 pb-3 border-b border-border">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-sm font-bold uppercase tracking-wider">
                          Contacts Mapping
                        </CardTitle>
                        <div
                          className="flex gap-3 space-x-2 px-3 border 
                        border-border rounded-full p-1 
                        hover:bg-secondary cursor-pointer"
                          onClick={() => {
                            setLocalKommoMap((prev) => ({
                              ...prev!,
                              contactMappingEnabled:
                                !prev?.contactMappingEnabled,
                            }));
                          }}
                        >
                          <span className="text-xs font-bold uppercase tracking-wider">
                            Enable
                          </span>
                          <Checkbox
                            className="cursor-pointer"
                            checked={
                              localKommoMap?.contactMappingEnabled ?? false
                            }
                          />
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => addKommoMapping("contacts")}
                        className="h-6 w-6 p-0 rounded-none hover:bg-secondary"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y divide-border">
                      {localKommoMap?.contactMappingEnabled &&
                        kommoMappings.contacts.map((mapping, idx) => (
                          <div key={idx} className="p-3 grid gap-2">
                            <div className="grid grid-cols-7 gap-2 items-center">
                              <Input
                                placeholder="JSON Key"
                                value={mapping.key}
                                onChange={(e) =>
                                  updateKommoMapping(
                                    "contacts",
                                    idx,
                                    "key",
                                    e.target.value
                                  )
                                }
                                className="col-span-3 rounded-none h-8 text-xs font-mono"
                              />
                              <div className="col-span-1 flex justify-center text-muted-foreground">
                                <ArrowRight className="h-3 w-3" />
                              </div>
                              <Select
                                value={mapping.field}
                                onValueChange={(val) =>
                                  updateKommoMapping(
                                    "contacts",
                                    idx,
                                    "field",
                                    val
                                  )
                                }
                              >
                                <SelectTrigger className="col-span-3 rounded-none h-8 text-xs">
                                  <SelectValue placeholder="Select Field" />
                                </SelectTrigger>
                                <SelectContent className="rounded-none">
                                  {kommoContactFields.map((f) => (
                                    <SelectItem key={f} value={f}>
                                      {f}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            {kommoMappings.contacts.length > 1 && (
                              <div className="flex justify-end">
                                <button
                                  onClick={() =>
                                    removeKommoMapping("contacts", idx)
                                  }
                                  className="text-[10px] text-destructive hover:underline uppercase font-bold tracking-wider"
                                >
                                  Remove
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card> */}
              </div>
            </div>
          )}

          {/* Hubspot Configuration */}
          {localNewApiInfo.hubspot_map && (
            <div className="animate-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between mb-4 border-l-4 border-orange-500 pl-4">
                <h2 className="text-xl font-bold">Hubspot Configuration</h2>
                <Badge
                  variant="outline"
                  className="rounded-none border-orange-200 text-orange-700 bg-orange-50"
                >
                  Active
                </Badge>
              </div>

              <Card className="rounded-none border-border shadow-none bg-background">
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-end gap-4 max-w-md">
                    <div className="flex-1 space-y-2">
                      <Label>Segment List ID</Label>
                      <Input
                        placeholder="e.g. 12345"
                        className="rounded-none font-mono"
                        value={hubspotState.segmentId}
                        onChange={(e) =>
                          setHubspotState((prev) => ({
                            ...prev,
                            segmentId: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <Button
                      onClick={loadHubspotSegment}
                      disabled={
                        !hubspotState.segmentId || hubspotState.isLoading
                      }
                      className="rounded-none"
                    >
                      {hubspotState.isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        "Fetch Headers"
                      )}
                    </Button>
                  </div>

                  {hubspotState.isLoaded && (
                    <div className="space-y-4 animate-in fade-in">
                      <Separator />

                      <div className="bg-secondary/20 border border-border">
                        <div className="flex items-center justify-between p-3 border-b border-border bg-secondary/30">
                          <h3 className="text-sm font-bold uppercase tracking-wider">
                            Column Mapping
                          </h3>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={addHubspotMapping}
                            className="h-6 w-6 p-0 rounded-none hover:bg-secondary"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="divide-y divide-border">
                          {hubspotState.mappings.length === 0 && (
                            <div className="p-8 text-center text-sm text-muted-foreground">
                              No mappings defined. Add one to start connecting
                              data.
                            </div>
                          )}

                          {hubspotState.mappings.map((mapping, idx) => (
                            <div
                              key={idx}
                              className="p-3 grid grid-cols-12 gap-4 items-center group hover:bg-background"
                            >
                              <div className="col-span-5">
                                <Input
                                  placeholder="Incoming JSON Key"
                                  value={mapping.key}
                                  onChange={(e) =>
                                    updateHubspotMapping(
                                      idx,
                                      "key",
                                      e.target.value
                                    )
                                  }
                                  className="rounded-none h-9 font-mono text-sm"
                                />
                              </div>
                              <div className="col-span-1 flex justify-center text-muted-foreground">
                                <ArrowRight className="h-4 w-4" />
                              </div>
                              <div className="col-span-5">
                                <Select
                                  value={mapping.header}
                                  onValueChange={(val) =>
                                    updateHubspotMapping(idx, "header", val)
                                  }
                                >
                                  <SelectTrigger className="rounded-none h-9">
                                    <SelectValue placeholder="Select Header Column" />
                                  </SelectTrigger>
                                  <SelectContent className="rounded-none">
                                    {hubspotMockHeaders.map((h) => (
                                      <SelectItem key={h} value={h}>
                                        {h}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="col-span-1 flex justify-end">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => removeHubspotMapping(idx)}
                                  className="h-8 w-8 text-muted-foreground hover:text-destructive rounded-none"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border z-10 flex justify-end gap-4 container mx-auto max-w-5xl">
        <Link href="/endpoints">
          <Button variant="outline" className="rounded-none">
            Cancel
          </Button>
        </Link>
        <Button className="rounded-none bg-primary hover:bg-primary/90 text-primary-foreground min-w-[150px]">
          <Save className="mr-2 h-4 w-4" />
          Create Endpoint
        </Button>
      </div>
    </div>
  );
}
