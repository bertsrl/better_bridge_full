import { useState } from "react";
import { Link, useLocation } from "wouter";
import { 
  LayoutGrid, 
  Terminal, 
  Activity, 
  Settings,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  };

  const NavItem = ({ href, label, icon: Icon }: { href: string, label: string, icon?: any }) => (
    <Link href={href}>
      <a className={cn(
        "relative flex items-center px-1 py-4 text-sm font-medium transition-colors border-b-2",
        isActive(href) 
          ? "border-primary text-foreground" 
          : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
      )}>
        {Icon && <Icon className="mr-2 h-4 w-4" />}
        {label}
      </a>
    </Link>
  );

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/20">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            {/* Logo Area */}
            <Link href="/">
              <a className="flex items-center gap-2 group">
                <div className="h-8 w-8 bg-foreground text-background flex items-center justify-center font-bold text-lg rounded-sm group-hover:bg-primary transition-colors">
                  N
                </div>
                <span className="font-bold text-lg tracking-tight">NestJS<span className="text-muted-foreground font-normal">Control</span></span>
              </a>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              <NavItem href="/" label="Overview" icon={LayoutGrid} />
              <NavItem href="/endpoints" label="API Routes" />
              <NavItem href="/logs" label="System Logs" />
              <div className="h-4 w-px bg-border mx-2" />
              <NavItem href="/operations" label="Operations" />
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center text-xs font-mono text-muted-foreground bg-secondary/50 px-2 py-1 rounded-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse" />
              SYSTEM ONLINE
            </div>
            
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            
            <Button variant="outline" size="sm" className="hidden md:flex border-border bg-transparent hover:bg-secondary">
              <Settings className="h-4 w-4 mr-2" />
              Config
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-background">
          <nav className="flex flex-col p-4 space-y-2">
            <Link href="/">
              <a className={cn("flex items-center p-2 rounded-md", isActive("/") ? "bg-secondary" : "")}>Overview</a>
            </Link>
            <Link href="/endpoints">
              <a className={cn("flex items-center p-2 rounded-md", isActive("/endpoints") ? "bg-secondary" : "")}>API Routes</a>
            </Link>
            <Link href="/logs">
              <a className={cn("flex items-center p-2 rounded-md", isActive("/logs") ? "bg-secondary" : "")}>System Logs</a>
            </Link>
          </nav>
        </div>
      )}

      {/* Main Content Area */}
      <main className="container mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
}
