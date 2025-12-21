import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ApiInfo } from "PARENT_DIR/_shared/dto";
import { useState, useEffect } from "react";

export default function RouteDestinationsConfigCard({
  localNewApiInfo,
  updateNewApiInfo,
}: {
  localNewApiInfo: Partial<ApiInfo>;
  updateNewApiInfo: (apiInfo: Partial<ApiInfo>) => void;
}) {
  const [localDestinationMaps, setLocalDestinationMaps] = useState<
    Partial<{
      kommo_map: {
        contactMappingEnabled: boolean;
        contactMappingKeys: {
          [key: string]: string;
        };
        leadCardMappingEnabled: boolean;
        leadCardMappingKeys: {
          [key: string]: string;
        };
        tagConfig: {
          [key: string]: string;
        };
      };
      hubspot_map: {
        segmentListIdAdded: boolean;
        segmentColumnsMappingKeys: {
          [key: string]: string;
        };
      };
    }>
  >();

  const [destinations, setDestinations] = useState({
    kommo: false,
    hubspot: false,
  });

  const toggleDestination = (key: "kommo" | "hubspot") => {
    setDestinations((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  useEffect(() => {
    console.log("🔍 local destination maps: ", localDestinationMaps);

    if (localDestinationMaps) {
      updateNewApiInfo(localDestinationMaps as Partial<ApiInfo>);
    }
  }, [localDestinationMaps]);

  useEffect(() => {
    updateNewApiInfo({});

    setLocalDestinationMaps((prev) => {
      const updated = { ...prev };
      if (destinations.kommo && !destinations.hubspot) {
        updated.kommo_map = {
          contactMappingEnabled: false,
          contactMappingKeys: {},
          leadCardMappingEnabled: false,
          leadCardMappingKeys: {},
          tagConfig: {},
        };
        delete updated.hubspot_map;
      } else if (destinations.hubspot && !destinations.kommo) {
        updated.hubspot_map = {
          segmentListIdAdded: false,
          segmentColumnsMappingKeys: {},
        };
        delete updated.kommo_map;
      } else if (destinations.kommo && destinations.hubspot) {
        updated.kommo_map = {
          contactMappingEnabled: false,
          contactMappingKeys: {},
          leadCardMappingEnabled: false,
          leadCardMappingKeys: {},
          tagConfig: {},
        };
        updated.hubspot_map = {
          segmentListIdAdded: false,
          segmentColumnsMappingKeys: {},
        };
      } else {
        delete updated.kommo_map;
        delete updated.hubspot_map;
      }
      return updated;
    });
  }, [destinations]);

  return (
    <div className="space-y-8">
      <Card className="rounded-none border-border shadow-none">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Destinations</CardTitle>
          <CardDescription>
            Select where the data should be sent.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div
            className={`flex items-start space-x-3 p-4 border transition-colors cursor-pointer ${
              destinations.kommo
                ? "border-primary bg-primary/5"
                : "border-border hover:bg-secondary/50"
            }`}
            onClick={() => toggleDestination("kommo")}
          >
            <Checkbox checked={destinations.kommo} className="mt-1" />
            <div>
              <label className="text-sm font-bold cursor-pointer">
                Kommo CRM
              </label>
              <p className="text-xs text-muted-foreground mt-1">
                Map data to Contacts and Lead Cards.
              </p>
            </div>
          </div>

          <div
            className={`flex items-start space-x-3 p-4 border transition-colors cursor-pointer ${
              destinations.hubspot
                ? "border-primary bg-primary/5"
                : "border-border hover:bg-secondary/50"
            }`}
            onClick={() => toggleDestination("hubspot")}
          >
            <Checkbox checked={destinations.hubspot} className="mt-1" />
            <div>
              <label className="text-sm font-bold cursor-pointer">
                Hubspot Segments
              </label>
              <p className="text-xs text-muted-foreground mt-1">
                Sync data to specific List Segments.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
