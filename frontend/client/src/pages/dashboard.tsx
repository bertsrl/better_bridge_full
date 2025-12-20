import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ArrowDownRight, Activity, Globe, Database, Cpu } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

const data = [
  { time: "00:00", reqs: 120 },
  { time: "04:00", reqs: 80 },
  { time: "08:00", reqs: 450 },
  { time: "12:00", reqs: 980 },
  { time: "16:00", reqs: 850 },
  { time: "20:00", reqs: 340 },
  { time: "23:59", reqs: 190 },
];

export default function Dashboard() {
  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      
      {/* Header Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold tracking-tight text-foreground max-w-2xl">
          System Performance
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Real-time telemetry and operational status.
        </p>
      </div>

      {/* Metric Grid - Swiss Style (Big numbers, stark grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
        {/* Card 1 */}
        <div className="bg-background p-6 hover:bg-muted/30 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Total Requests</span>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-5xl font-bold tracking-tighter mb-2">24.5k</div>
          <div className="flex items-center text-sm font-medium text-emerald-600">
            <ArrowUpRight className="h-4 w-4 mr-1" />
            +12.5%
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-background p-6 hover:bg-muted/30 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Latency</span>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-5xl font-bold tracking-tighter mb-2">42<span className="text-2xl text-muted-foreground ml-1">ms</span></div>
          <div className="flex items-center text-sm font-medium text-emerald-600">
            <ArrowDownRight className="h-4 w-4 mr-1" />
            -8ms
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-background p-6 hover:bg-muted/30 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Error Rate</span>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-5xl font-bold tracking-tighter mb-2 text-foreground">0.04<span className="text-2xl text-muted-foreground ml-1">%</span></div>
          <div className="flex items-center text-sm font-medium text-muted-foreground">
            Stable
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-background p-6 hover:bg-muted/30 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Uptime</span>
            <Cpu className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-5xl font-bold tracking-tighter mb-2">99.9<span className="text-2xl text-muted-foreground ml-1">%</span></div>
          <div className="flex items-center text-sm font-medium text-emerald-600">
            +0.1%
          </div>
        </div>
      </div>

      {/* Main Chart Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 border border-border p-6 bg-background">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold">Traffic Volume</h3>
            <div className="flex gap-2">
              <Badge variant="secondary" className="rounded-none font-normal">24h</Badge>
              <Badge variant="outline" className="rounded-none font-normal text-muted-foreground border-transparent hover:bg-secondary">7d</Badge>
              <Badge variant="outline" className="rounded-none font-normal text-muted-foreground border-transparent hover:bg-secondary">30d</Badge>
            </div>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorReqs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="time" 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  dy={10}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--background))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0px",
                    boxShadow: "none"
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="reqs" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorReqs)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status List - Minimalist List */}
        <div className="border border-border p-6 bg-background flex flex-col">
          <h3 className="text-lg font-bold mb-6">Infrastructure</h3>
          
          <div className="space-y-6 flex-1">
            <div className="flex items-start justify-between group">
              <div className="flex gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                <div>
                  <div className="font-medium">Primary Database</div>
                  <div className="text-sm text-muted-foreground">PostgreSQL 14</div>
                </div>
              </div>
              <Badge variant="outline" className="rounded-sm font-mono text-xs">OK</Badge>
            </div>

            <div className="flex items-start justify-between group">
              <div className="flex gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                <div>
                  <div className="font-medium">Cache Layer</div>
                  <div className="text-sm text-muted-foreground">Redis Cluster</div>
                </div>
              </div>
              <Badge variant="outline" className="rounded-sm font-mono text-xs">OK</Badge>
            </div>

            <div className="flex items-start justify-between group">
              <div className="flex gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-orange-500" />
                <div>
                  <div className="font-medium">Message Queue</div>
                  <div className="text-sm text-muted-foreground">RabbitMQ</div>
                </div>
              </div>
              <Badge variant="outline" className="rounded-sm font-mono text-xs text-orange-600 border-orange-200 bg-orange-50">WARN</Badge>
            </div>

            <div className="flex items-start justify-between group">
              <div className="flex gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                <div>
                  <div className="font-medium">Search Engine</div>
                  <div className="text-sm text-muted-foreground">ElasticSearch</div>
                </div>
              </div>
              <Badge variant="outline" className="rounded-sm font-mono text-xs">OK</Badge>
            </div>
          </div>

          <div className="pt-6 border-t border-border mt-auto">
             <div className="text-xs text-muted-foreground font-mono">
                LAST CHECK: 12 SECONDS AGO
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
