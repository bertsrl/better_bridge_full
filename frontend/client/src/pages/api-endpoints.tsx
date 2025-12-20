import { useState } from "react";
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

// Mock Data
const endpoints = [
  { id: 1, method: "GET", path: "/api/v1/users", module: "Users", status: true, lastRun: "2m ago" },
  { id: 2, method: "POST", path: "/api/v1/users", module: "Users", status: true, lastRun: "1h ago" },
  { id: 3, method: "GET", path: "/api/v1/products", module: "Products", status: true, lastRun: "5m ago" },
  { id: 4, method: "DELETE", path: "/api/v1/products/:id", module: "Products", status: false, lastRun: "-" },
  { id: 5, method: "POST", path: "/api/v1/auth/login", module: "Auth", status: true, lastRun: "1m ago" },
  { id: 6, method: "POST", path: "/api/v1/auth/register", module: "Auth", status: true, lastRun: "30m ago" },
  { id: 7, method: "GET", path: "/health", module: "System", status: true, lastRun: "10s ago" },
];

const MethodBadge = ({ method }: { method: string }) => {
  const colors: Record<string, string> = {
    GET: "bg-blue-100 text-blue-700 border-blue-200",
    POST: "bg-emerald-100 text-emerald-700 border-emerald-200",
    PUT: "bg-orange-100 text-orange-700 border-orange-200",
    DELETE: "bg-red-100 text-red-700 border-red-200",
  };
  
  return (
    <span className={`px-2 py-0.5 text-[10px] font-bold tracking-wider border rounded-sm ${colors[method] || "bg-gray-100 text-gray-700"}`}>
      {method}
    </span>
  );
};

export default function ApiEndpoints() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEndpoints = endpoints.filter(ep => 
    ep.path.toLowerCase().includes(searchTerm.toLowerCase()) || 
    ep.module.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">API Routes</h1>
          <p className="text-muted-foreground mt-2 max-w-xl">
            Manage your application endpoints. Toggle availability or configure route parameters directly from the control plane.
          </p>
        </div>
        <Link href="/endpoints/create">
          <Button className="rounded-none bg-primary hover:bg-primary/90 text-primary-foreground shadow-none cursor-pointer">
            <Plus className="h-4 w-4 mr-2" />
            New Endpoint
          </Button>
        </Link>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search paths or modules..." 
            className="pl-9 rounded-none border-border focus-visible:ring-1 focus-visible:ring-primary" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="rounded-none border-border">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      <div className="border border-border bg-background">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-border bg-secondary/30 text-xs font-bold uppercase tracking-wider text-muted-foreground">
          <div className="col-span-1">Method</div>
          <div className="col-span-4">Path</div>
          <div className="col-span-2">Module</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Last Active</div>
          <div className="col-span-1 text-right"></div>
        </div>

        <div className="divide-y divide-border">
          {filteredEndpoints.map((endpoint) => (
            <div key={endpoint.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-secondary/20 transition-colors group">
              <div className="col-span-1">
                <MethodBadge method={endpoint.method} />
              </div>
              <div className="col-span-4 font-mono text-sm text-foreground font-medium">
                {endpoint.path}
              </div>
              <div className="col-span-2">
                <span className="text-sm text-muted-foreground">{endpoint.module}</span>
              </div>
              <div className="col-span-2 flex items-center gap-2">
                <Switch 
                  checked={endpoint.status} 
                  className="data-[state=checked]:bg-emerald-600"
                />
                <span className={`text-xs font-medium ${endpoint.status ? "text-emerald-700" : "text-muted-foreground"}`}>
                  {endpoint.status ? "Active" : "Disabled"}
                </span>
              </div>
              <div className="col-span-2 text-sm text-muted-foreground font-mono">
                {endpoint.lastRun}
              </div>
              <div className="col-span-1 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="rounded-none border-border">
                    <DropdownMenuItem className="rounded-none cursor-pointer">Edit Route</DropdownMenuItem>
                    <DropdownMenuItem className="rounded-none cursor-pointer">View Logs</DropdownMenuItem>
                    <DropdownMenuItem className="rounded-none cursor-pointer text-destructive focus:text-destructive">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
        
        {filteredEndpoints.length === 0 && (
          <div className="p-12 text-center text-muted-foreground">
            No endpoints found matching your search.
          </div>
        )}
      </div>
      
      <div className="flex justify-between items-center text-sm text-muted-foreground">
        <span>Showing {filteredEndpoints.length} of {endpoints.length} routes</span>
        <div className="flex gap-2">
           <Button variant="outline" size="sm" disabled className="rounded-none h-8 w-8 p-0">
              <span className="sr-only">Previous</span>
              &larr;
           </Button>
           <Button variant="outline" size="sm" className="rounded-none h-8 w-8 p-0">
              <span className="sr-only">Next</span>
              &rarr;
           </Button>
        </div>
      </div>
    </div>
  );
}
