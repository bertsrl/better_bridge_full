import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Loader2, Plus, Trash2, Save, Database, ArrowRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

// Mock Data for Dropdowns
const kommoContactFields = ["Full Name", "Phone", "Email", "Position", "Company Name", "Tags"];
const kommoLeadFields = ["Lead Name", "Sale Value", "Pipeline Stage", "Responsible User", "Created At"];
const hubspotMockHeaders = ["First Name", "Last Name", "Email Address", "Phone Number", "Lifecycle Stage", "Lead Status"];

export default function CreateRoute() {
  const [, setLocation] = useLocation();
  const [destinations, setDestinations] = useState({
    kommo: false,
    hubspot: false
  });

  // Kommo State
  const [kommoMappings, setKommoMappings] = useState<{
    contacts: { key: string; field: string }[];
    leads: { key: string; field: string }[];
  }>({
    contacts: [{ key: "user_full_name", field: "Full Name" }],
    leads: [{ key: "deal_value", field: "Sale Value" }]
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
    mappings: []
  });

  const toggleDestination = (key: 'kommo' | 'hubspot') => {
    setDestinations(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const addKommoMapping = (type: 'contacts' | 'leads') => {
    setKommoMappings(prev => ({
      ...prev,
      [type]: [...prev[type], { key: "", field: "" }]
    }));
  };

  const removeKommoMapping = (type: 'contacts' | 'leads', index: number) => {
    setKommoMappings(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  const updateKommoMapping = (type: 'contacts' | 'leads', index: number, field: 'key' | 'field', value: string) => {
    setKommoMappings(prev => {
      const newArray = [...prev[type]];
      newArray[index] = { ...newArray[index], [field]: value };
      return { ...prev, [type]: newArray };
    });
  };

  const loadHubspotSegment = () => {
    if (!hubspotState.segmentId) return;
    setHubspotState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate API Call
    setTimeout(() => {
      setHubspotState(prev => ({
        ...prev,
        isLoading: false,
        isLoaded: true,
        mappings: [
          { key: "email", header: "Email Address" },
          { key: "fname", header: "First Name" }
        ]
      }));
    }, 1500);
  };

  const addHubspotMapping = () => {
    setHubspotState(prev => ({
      ...prev,
      mappings: [...prev.mappings, { key: "", header: "" }]
    }));
  };
  
  const updateHubspotMapping = (index: number, field: 'key' | 'header', value: string) => {
    setHubspotState(prev => {
      const newMappings = [...prev.mappings];
      newMappings[index] = { ...newMappings[index], [field]: value };
      return { ...prev, mappings: newMappings };
    });
  };

  const removeHubspotMapping = (index: number) => {
    setHubspotState(prev => ({
      ...prev,
      mappings: prev.mappings.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      
      {/* Header */}
      <div className="flex items-center gap-4 border-b border-border pb-6">
        <Link href="/endpoints">
          <Button variant="outline" size="icon" className="h-10 w-10 rounded-none border-border">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Create API Route</h1>
          <p className="text-muted-foreground mt-1">Configure data ingestion and mapping for external CRMs.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Route Details & Destination Selection */}
        <div className="space-y-8">
          <Card className="rounded-none border-border shadow-none">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Route Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Endpoint Method</Label>
                <Select defaultValue="POST">
                  <SelectTrigger className="rounded-none">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-none">
                    <SelectItem value="POST">POST</SelectItem>
                    <SelectItem value="PUT">PUT</SelectItem>
                    <SelectItem value="PATCH">PATCH</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Endpoint Path</Label>
                <Input placeholder="/api/v1/integrations/..." className="rounded-none font-mono" />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Input placeholder="E.g. New Lead Ingestion" className="rounded-none" />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-none border-border shadow-none">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Destinations</CardTitle>
              <CardDescription>Select where the data should be sent.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div 
                className={`flex items-start space-x-3 p-4 border transition-colors cursor-pointer ${destinations.kommo ? "border-primary bg-primary/5" : "border-border hover:bg-secondary/50"}`}
                onClick={() => toggleDestination('kommo')}
              >
                <Checkbox checked={destinations.kommo} className="mt-1" />
                <div>
                  <label className="text-sm font-bold cursor-pointer">Kommo CRM</label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Map data to Contacts and Lead Cards.
                  </p>
                </div>
              </div>

              <div 
                className={`flex items-start space-x-3 p-4 border transition-colors cursor-pointer ${destinations.hubspot ? "border-primary bg-primary/5" : "border-border hover:bg-secondary/50"}`}
                onClick={() => toggleDestination('hubspot')}
              >
                <Checkbox checked={destinations.hubspot} className="mt-1" />
                <div>
                  <label className="text-sm font-bold cursor-pointer">Hubspot Segments</label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Sync data to specific List Segments.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Dynamic Configuration */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Default State */}
          {!destinations.kommo && !destinations.hubspot && (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center border border-dashed border-border text-muted-foreground bg-secondary/10">
              <Database className="h-12 w-12 mb-4 opacity-20" />
              <p>Select a destination to configure mappings.</p>
            </div>
          )}

          {/* Kommo Configuration */}
          {destinations.kommo && (
            <div className="animate-in slide-in-from-bottom-4 duration-500">
               <div className="flex items-center justify-between mb-4 border-l-4 border-blue-500 pl-4">
                  <h2 className="text-xl font-bold">Kommo CRM Configuration</h2>
                  <Badge variant="outline" className="rounded-none border-blue-200 text-blue-700 bg-blue-50">Active</Badge>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Contacts Column */}
                  <Card className="rounded-none border-border shadow-none bg-background">
                    <CardHeader className="bg-secondary/30 pb-3 border-b border-border">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-sm font-bold uppercase tracking-wider">Contacts Mapping</CardTitle>
                        <Button size="sm" variant="ghost" onClick={() => addKommoMapping('contacts')} className="h-6 w-6 p-0 rounded-none hover:bg-secondary">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="divide-y divide-border">
                        {kommoMappings.contacts.map((mapping, idx) => (
                          <div key={idx} className="p-3 grid gap-2">
                             <div className="grid grid-cols-7 gap-2 items-center">
                                <Input 
                                  placeholder="JSON Key" 
                                  value={mapping.key}
                                  onChange={(e) => updateKommoMapping('contacts', idx, 'key', e.target.value)}
                                  className="col-span-3 rounded-none h-8 text-xs font-mono" 
                                />
                                <div className="col-span-1 flex justify-center text-muted-foreground">
                                  <ArrowRight className="h-3 w-3" />
                                </div>
                                <Select value={mapping.field} onValueChange={(val) => updateKommoMapping('contacts', idx, 'field', val)}>
                                  <SelectTrigger className="col-span-3 rounded-none h-8 text-xs">
                                    <SelectValue placeholder="Select Field" />
                                  </SelectTrigger>
                                  <SelectContent className="rounded-none">
                                    {kommoContactFields.map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}
                                  </SelectContent>
                                </Select>
                             </div>
                             {kommoMappings.contacts.length > 1 && (
                               <div className="flex justify-end">
                                 <button onClick={() => removeKommoMapping('contacts', idx)} className="text-[10px] text-destructive hover:underline uppercase font-bold tracking-wider">Remove</button>
                               </div>
                             )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Leads Column */}
                  <Card className="rounded-none border-border shadow-none bg-background">
                    <CardHeader className="bg-secondary/30 pb-3 border-b border-border">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-sm font-bold uppercase tracking-wider">Lead Cards Mapping</CardTitle>
                        <Button size="sm" variant="ghost" onClick={() => addKommoMapping('leads')} className="h-6 w-6 p-0 rounded-none hover:bg-secondary">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="divide-y divide-border">
                        {kommoMappings.leads.map((mapping, idx) => (
                          <div key={idx} className="p-3 grid gap-2">
                             <div className="grid grid-cols-7 gap-2 items-center">
                                <Input 
                                  placeholder="JSON Key" 
                                  value={mapping.key}
                                  onChange={(e) => updateKommoMapping('leads', idx, 'key', e.target.value)}
                                  className="col-span-3 rounded-none h-8 text-xs font-mono" 
                                />
                                <div className="col-span-1 flex justify-center text-muted-foreground">
                                  <ArrowRight className="h-3 w-3" />
                                </div>
                                <Select value={mapping.field} onValueChange={(val) => updateKommoMapping('leads', idx, 'field', val)}>
                                  <SelectTrigger className="col-span-3 rounded-none h-8 text-xs">
                                    <SelectValue placeholder="Select Field" />
                                  </SelectTrigger>
                                  <SelectContent className="rounded-none">
                                    {kommoLeadFields.map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}
                                  </SelectContent>
                                </Select>
                             </div>
                             {kommoMappings.leads.length > 1 && (
                               <div className="flex justify-end">
                                 <button onClick={() => removeKommoMapping('leads', idx)} className="text-[10px] text-destructive hover:underline uppercase font-bold tracking-wider">Remove</button>
                               </div>
                             )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
               </div>
            </div>
          )}

          {/* Hubspot Configuration */}
          {destinations.hubspot && (
            <div className="animate-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between mb-4 border-l-4 border-orange-500 pl-4">
                  <h2 className="text-xl font-bold">Hubspot Configuration</h2>
                  <Badge variant="outline" className="rounded-none border-orange-200 text-orange-700 bg-orange-50">Active</Badge>
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
                          onChange={(e) => setHubspotState(prev => ({ ...prev, segmentId: e.target.value }))}
                        />
                     </div>
                     <Button 
                       onClick={loadHubspotSegment} 
                       disabled={!hubspotState.segmentId || hubspotState.isLoading}
                       className="rounded-none"
                     >
                       {hubspotState.isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Fetch Headers"}
                     </Button>
                  </div>

                  {hubspotState.isLoaded && (
                    <div className="space-y-4 animate-in fade-in">
                       <Separator />
                       
                       <div className="bg-secondary/20 border border-border">
                          <div className="flex items-center justify-between p-3 border-b border-border bg-secondary/30">
                             <h3 className="text-sm font-bold uppercase tracking-wider">Column Mapping</h3>
                             <Button size="sm" variant="ghost" onClick={addHubspotMapping} className="h-6 w-6 p-0 rounded-none hover:bg-secondary">
                                <Plus className="h-4 w-4" />
                             </Button>
                          </div>
                          
                          <div className="divide-y divide-border">
                             {hubspotState.mappings.length === 0 && (
                               <div className="p-8 text-center text-sm text-muted-foreground">
                                 No mappings defined. Add one to start connecting data.
                               </div>
                             )}
                             
                             {hubspotState.mappings.map((mapping, idx) => (
                               <div key={idx} className="p-3 grid grid-cols-12 gap-4 items-center group hover:bg-background">
                                  <div className="col-span-5">
                                    <Input 
                                      placeholder="Incoming JSON Key" 
                                      value={mapping.key}
                                      onChange={(e) => updateHubspotMapping(idx, 'key', e.target.value)}
                                      className="rounded-none h-9 font-mono text-sm" 
                                    />
                                  </div>
                                  <div className="col-span-1 flex justify-center text-muted-foreground">
                                    <ArrowRight className="h-4 w-4" />
                                  </div>
                                  <div className="col-span-5">
                                    <Select value={mapping.header} onValueChange={(val) => updateHubspotMapping(idx, 'header', val)}>
                                      <SelectTrigger className="rounded-none h-9">
                                        <SelectValue placeholder="Select Header Column" />
                                      </SelectTrigger>
                                      <SelectContent className="rounded-none">
                                        {hubspotMockHeaders.map(h => <SelectItem key={h} value={h}>{h}</SelectItem>)}
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
           <Button variant="outline" className="rounded-none">Cancel</Button>
         </Link>
         <Button className="rounded-none bg-primary hover:bg-primary/90 text-primary-foreground min-w-[150px]">
           <Save className="mr-2 h-4 w-4" />
           Create Endpoint
         </Button>
      </div>
    </div>
  );
}
