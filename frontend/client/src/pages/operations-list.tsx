import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Database, Plug, Table, Key } from "lucide-react";

const operations = [
  {
    id: "kommo-test",
    title: "Kommo Connection Test",
    description: "Verify connectivity to Kommo CRM API using current credentials.",
    icon: Plug,
    category: "Integrations"
  },
  {
    id: "hubspot-test",
    title: "Hubspot Connection Test",
    description: "Check OAuth token validity and API reachability for Hubspot.",
    icon: Plug,
    category: "Integrations"
  },
  {
    id: "sheets-test",
    title: "Spreadsheets Connection",
    description: "Test Read/Write permissions on configured Google Sheets.",
    icon: Table,
    category: "Data Sources"
  },
  {
    id: "oauth-init",
    title: "Initiate OAuth Flow",
    description: "Start a new OAuth handshake to refresh or authorize external services.",
    icon: Key,
    category: "Security"
  },
  {
    id: "db-maintenance",
    title: "Database Maintenance",
    description: "Perform routine database cleanup and optimization tasks.",
    icon: Database,
    category: "System"
  }
];

export default function OperationsList() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">System Operations</h1>
        <p className="text-muted-foreground text-lg">
          Manage integrations, verify connections, and perform system maintenance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {operations.map((op) => (
          <Card key={op.id} className="group hover:border-primary transition-colors cursor-pointer rounded-none border-border shadow-none">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div className="p-2 bg-secondary/50 rounded-none">
                  <op.icon className="h-6 w-6 text-foreground" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground bg-secondary/30 px-2 py-1">
                  {op.category}
                </span>
              </div>
              <CardTitle className="mt-4 text-xl">{op.title}</CardTitle>
              <CardDescription className="mt-2 line-clamp-2">
                {op.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={`/actions/${op.id}`}>
                <Button className="w-full rounded-none bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  Configure & Run <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
