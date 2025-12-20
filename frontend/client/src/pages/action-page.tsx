import { useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, Play, AlertTriangle, ShieldCheck, CheckCircle2, XCircle, RefreshCw, ExternalLink } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function ActionPage() {
  const params = useParams();
  const actionId = params.actionId || "unknown";
  const [status, setStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle');

  const getActionDetails = (id: string) => {
    switch(id) {
      case "db-maintenance":
        return {
          title: "Database Maintenance",
          description: "Perform routine database cleanup and optimization tasks.",
          isDestructive: false,
          type: "system"
        };
      case "kommo-test":
        return {
          title: "Kommo Connection Test",
          description: "Verify connectivity to Kommo CRM API using current credentials.",
          isDestructive: false,
          type: "integration"
        };
      case "hubspot-test":
        return {
          title: "Hubspot Connection Test",
          description: "Check OAuth token validity and API reachability for Hubspot.",
          isDestructive: false,
          type: "integration"
        };
      case "sheets-test":
        return {
          title: "Spreadsheets Connection",
          description: "Test Read/Write permissions on configured Google Sheets.",
          isDestructive: false,
          type: "integration"
        };
      case "oauth-init":
        return {
          title: "Initiate OAuth Flow",
          description: "Start a new OAuth handshake to refresh or authorize external services.",
          isDestructive: false,
          type: "auth"
        };
      default:
        return {
          title: "Custom Action",
          description: "Execute a custom defined script or task.",
          isDestructive: false,
          type: "generic"
        };
    }
  };

  const details = getActionDetails(actionId);

  const handleRun = () => {
    setStatus('running');
    // Simulate operation
    setTimeout(() => {
      setStatus(Math.random() > 0.3 ? 'success' : 'error');
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-500 py-12">
      <div className="border-l-4 border-primary pl-6">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">{details.title}</h1>
        <p className="text-xl text-muted-foreground mt-2">{details.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
           <div className="p-6 border border-border bg-white shadow-sm">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-emerald-600" />
                Execution Context
              </h3>
              
              <div className="space-y-4">
                 <div className="grid grid-cols-3 text-sm gap-2">
                    <span className="text-muted-foreground">Environment:</span>
                    <span className="col-span-2 font-mono font-bold">Production</span>
                 </div>
                 <div className="grid grid-cols-3 text-sm gap-2">
                    <span className="text-muted-foreground">User:</span>
                    <span className="col-span-2 font-mono">admin@system.local</span>
                 </div>
                 {details.type === 'integration' && (
                    <div className="grid grid-cols-3 text-sm gap-2">
                      <span className="text-muted-foreground">Service:</span>
                      <span className="col-span-2 font-mono text-primary font-bold">{details.title.split(' ')[0]}</span>
                    </div>
                 )}
              </div>
           </div>

           {details.type === 'auth' ? (
              <Alert className="rounded-none border-blue-200 bg-blue-50 text-blue-900">
                <Info className="h-4 w-4 text-blue-600" />
                <AlertTitle>Interactive Session</AlertTitle>
                <AlertDescription>
                  This action will open a new window to complete the authentication process.
                </AlertDescription>
              </Alert>
           ) : (
              <Alert className="rounded-none border-orange-200 bg-orange-50 text-orange-900">
                <Info className="h-4 w-4 text-orange-600" />
                <AlertTitle>Audit Log</AlertTitle>
                <AlertDescription>
                  This operation will be logged in the system audit trail.
                </AlertDescription>
              </Alert>
           )}
        </div>

        <div className="space-y-6">
           <div className="p-6 border border-border bg-muted/10">
              <h3 className="text-lg font-bold mb-4">Parameters</h3>
              
              {details.type === 'integration' && (
                <div className="space-y-4">
                   <div className="space-y-2">
                      <label className="text-sm font-medium uppercase tracking-wide">Connection Mode</label>
                      <select className="w-full p-2 border border-border bg-background rounded-none">
                         <option>Read/Write Check</option>
                         <option>Ping Only</option>
                         <option>Full Diagnostic</option>
                      </select>
                   </div>
                </div>
              )}

              {details.type === 'auth' && (
                <div className="space-y-4">
                   <div className="space-y-2">
                      <label className="text-sm font-medium uppercase tracking-wide">Provider</label>
                      <select className="w-full p-2 border border-border bg-background rounded-none">
                         <option>Hubspot OAuth 2.0</option>
                         <option>Google Workspace</option>
                         <option>Kommo OAuth</option>
                      </select>
                   </div>
                   <div className="space-y-2">
                      <label className="text-sm font-medium uppercase tracking-wide">Scope</label>
                      <select className="w-full p-2 border border-border bg-background rounded-none">
                         <option>Full Access</option>
                         <option>Read Only</option>
                      </select>
                   </div>
                </div>
              )}

              {details.type === 'system' && (
                 <div className="space-y-4">
                    <div className="space-y-2">
                       <label className="text-sm font-medium uppercase tracking-wide">Target Region</label>
                       <select className="w-full p-2 border border-border bg-background rounded-none">
                          <option>us-east-1</option>
                          <option>eu-west-1</option>
                       </select>
                    </div>
                 </div>
              )}
              
              <div className="mt-8 pt-6 border-t border-border">
                 <Button 
                    onClick={handleRun}
                    disabled={status === 'running'}
                    className={cn(
                      "w-full h-12 text-lg rounded-none font-bold transition-all",
                      status === 'success' ? "bg-emerald-600 hover:bg-emerald-700 text-white" :
                      status === 'error' ? "bg-red-600 hover:bg-red-700 text-white" :
                      "bg-foreground hover:bg-foreground/90 text-background"
                    )}
                 >
                    {status === 'running' ? (
                      <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                    ) : status === 'success' ? (
                      <CheckCircle2 className="mr-2 h-5 w-5" />
                    ) : status === 'error' ? (
                      <XCircle className="mr-2 h-5 w-5" />
                    ) : details.type === 'auth' ? (
                      <ExternalLink className="mr-2 h-5 w-5" />
                    ) : (
                      <Play className="mr-2 h-5 w-5" />
                    )}
                    
                    {status === 'running' ? "EXECUTING..." :
                     status === 'success' ? "SUCCESS - DONE" :
                     status === 'error' ? "FAILED - RETRY" :
                     details.type === 'auth' ? "INITIATE AUTH" : "RUN OPERATION"}
                 </Button>
              </div>

              {status === 'success' && (
                <div className="mt-4 p-3 bg-emerald-50 text-emerald-900 text-sm border border-emerald-200 animate-in fade-in slide-in-from-top-2">
                  <span className="font-bold">Result:</span> Connection established successfully. Latency: 45ms.
                </div>
              )}
              
              {status === 'error' && (
                <div className="mt-4 p-3 bg-red-50 text-red-900 text-sm border border-red-200 animate-in fade-in slide-in-from-top-2">
                  <span className="font-bold">Error:</span> Connection timed out after 3000ms. Check firewall settings.
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
}
