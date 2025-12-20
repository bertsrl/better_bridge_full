import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { Layout } from "@/components/layout";
import Dashboard from "@/pages/dashboard";
import ApiEndpoints from "@/pages/api-endpoints";
import ApiLogs from "@/pages/api-logs";
import ActionPage from "@/pages/action-page";
import CreateRoute from "@/pages/create-route";
import OperationsList from "@/pages/operations-list";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/endpoints" component={ApiEndpoints} />
        <Route path="/endpoints/create" component={CreateRoute} />
        <Route path="/logs" component={ApiLogs} />
        <Route path="/operations" component={OperationsList} />
        <Route path="/actions/:actionId" component={ActionPage} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
