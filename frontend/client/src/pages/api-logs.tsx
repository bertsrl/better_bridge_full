import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Download, RefreshCcw, FileText } from "lucide-react";

// Mock Logs Data
const logs = [
  { id: "req_1", timestamp: "10:30:45", method: "GET", path: "/api/v1/users", status: 200, duration: "45ms", ip: "192.168.1.1" },
  { id: "req_2", timestamp: "10:31:12", method: "POST", path: "/api/v1/auth/login", status: 200, duration: "120ms", ip: "192.168.1.5" },
  { id: "req_3", timestamp: "10:32:01", method: "GET", path: "/api/v1/products", status: 304, duration: "20ms", ip: "192.168.1.2" },
  { id: "req_4", timestamp: "10:35:22", method: "POST", path: "/api/v1/users", status: 400, duration: "55ms", ip: "192.168.1.8" },
  { id: "req_5", timestamp: "10:40:05", method: "DELETE", path: "/api/v1/products/12", status: 403, duration: "12ms", ip: "192.168.1.9" },
  { id: "req_6", timestamp: "10:42:15", method: "GET", path: "/health", status: 200, duration: "5ms", ip: "127.0.0.1" },
  { id: "req_7", timestamp: "10:45:30", method: "GET", path: "/api/v1/users/5", status: 404, duration: "30ms", ip: "192.168.1.1" },
];

export default function ApiLogs() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">System Logs</h1>
        </div>
        <div className="flex items-center gap-2">
           <Input 
             placeholder="Filter logs..." 
             className="w-[300px] rounded-none border-border" 
           />
           <Button variant="outline" className="rounded-none border-border">
             <Download className="h-4 w-4" />
           </Button>
           <Button variant="outline" className="rounded-none border-border">
             <RefreshCcw className="h-4 w-4" />
           </Button>
        </div>
      </div>

      <div className="border border-border bg-background font-mono text-sm">
        {/* Log Viewer Header - Look like a printout */}
        <div className="bg-muted/40 p-2 border-b border-border flex justify-between items-center text-xs text-muted-foreground uppercase tracking-widest">
           <span>Log Manifest: {new Date().toLocaleDateString()}</span>
           <span>Live Stream</span>
        </div>

        <div className="divide-y divide-border">
          {logs.map((log) => (
            <div key={log.id} className="p-3 hover:bg-secondary/20 transition-colors flex items-center gap-4 group">
               <div className="w-24 text-muted-foreground">{log.timestamp}</div>
               
               <div className={`w-12 font-bold ${
                 log.status >= 500 ? "text-red-600" :
                 log.status >= 400 ? "text-orange-600" :
                 "text-emerald-600"
               }`}>
                 {log.status}
               </div>

               <div className="w-16 font-bold text-foreground">{log.method}</div>
               
               <div className="flex-1 text-foreground/80">{log.path}</div>
               
               <div className="w-20 text-right text-muted-foreground">{log.duration}</div>
               
               <div className="w-8 flex justify-center opacity-0 group-hover:opacity-100">
                  <FileText className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-foreground" />
               </div>
            </div>
          ))}
        </div>
        
        <div className="p-2 border-t border-border bg-muted/20 text-center text-xs text-muted-foreground">
           End of stream
        </div>
      </div>
    </div>
  );
}
