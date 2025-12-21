import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { fetchApiBuckets } from "@/dbOps/firebase/fetch-apiBuckets";
import { Textarea } from "@/components/ui/textarea";
import { ApiInfo } from "PARENT_DIR/_shared/dto";

export default function RouteConfigurationCard({
  localNewApiInfo,
  updateNewApiInfo,
}: {
  localNewApiInfo: Partial<ApiInfo>;
  updateNewApiInfo: (apiInfo: Partial<ApiInfo>) => void;
}) {
  const [apiEndpointString, setApiEndpointString] = useState<string>("");
  const [apiMethod, setApiMethod] = useState<string>("POST");
  const [apiDescription, setApiDescription] = useState<string>("");
  const [apiBuckets, setApiBuckets] = useState<{ id: string; name: string }[]>(
    []
  );
  const [selectedBucket, setSelectedBucket] = useState<{
    name: string;
    id: string;
  } | null>(
    apiBuckets[0]
      ? { name: apiBuckets[0]?.name + "/", id: apiBuckets[0]?.id }
      : null
  );

  useEffect(() => {
    if (selectedBucket) {
      updateNewApiInfo({
        ...localNewApiInfo,
        method: apiMethod,
        endpoint: "api/v1/" + selectedBucket?.name + apiEndpointString,
        description: apiDescription,
      });
    }
  }, [apiEndpointString, apiDescription, selectedBucket]);

  useEffect(() => {
    console.log("🔍 selectedBucket: ", selectedBucket);
  }, [selectedBucket]);

  useEffect(() => {
    console.log("🔍 apiBuckets: ", apiBuckets);
    if (apiBuckets.length > 0) {
      setSelectedBucket(
        apiBuckets[0]
          ? { name: apiBuckets[0]?.name + "/", id: apiBuckets[0]?.id }
          : null
      );
    }
  }, [apiBuckets]);

  useEffect(() => {
    fetchApiBuckets().then((buckets: any) => {
      console.log("🔍 buckets: ", buckets);
      setApiBuckets(buckets);
    });
  }, []);

  return (
    <Card className="rounded-none border-border shadow-none">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Route Configuration</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          <div className="flex items-center gap-2 border-b border-border pb-4">
            <Label>Endpoint Method</Label>
            <Select
              defaultValue="POST"
              onValueChange={(value) => setApiMethod(value)}
            >
              <SelectTrigger className="rounded-none w-[100px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-none">
                <SelectItem value="POST">POST</SelectItem>
                <SelectItem value="PUT">PUT</SelectItem>
                <SelectItem value="PATCH">PATCH</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="border-b border-border gap-2 flex flex-col pb-4">
            <Label className="block">Endpoint Address</Label>
            <div className="flex items-center gap-2">
              <span>api/v1/</span>
              <Select
                value={selectedBucket?.name}
                onValueChange={(value) => {
                  const bucket = apiBuckets.find((b) => b.name + "/" === value);
                  setSelectedBucket({
                    name: value || "", // Store with "/"
                    id: bucket?.id || "",
                  });
                }}
              >
                <SelectTrigger className="rounded-none max-w-[15%]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-none">
                  {apiBuckets.map((bucket) => {
                    const bucketNameString = bucket.name + "/";
                    return (
                      <SelectItem key={bucket.id} value={bucketNameString}>
                        {bucketNameString}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <Input
                placeholder="jotform-tabere-uk/new-registrations"
                className="rounded-none font-mono"
                value={apiEndpointString}
                onChange={(e) => setApiEndpointString(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              placeholder="E.g. New Lead Ingestion"
              className="rounded-none min-h-[20px]"
              value={apiDescription}
              onChange={(e) => setApiDescription(e.target.value)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
