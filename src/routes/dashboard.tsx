import { createFileRoute, Outlet, Link, useNavigate } from "@tanstack/react-router";
import { Leaf, Sprout, ShoppingBag, ClipboardList, BarChart3, LogOut, Menu } from "lucide-react";
import { store } from "@/lib/store";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — FARM2HOME" },
      { name: "description", content: "Manage your farm, products, and orders." },
    ],
  }),
  component: DashboardLayout,
});

const navItems = [
  { to: "/dashboard", icon: BarChart3, label: "Analytics" },
  { to: "/dashboard/crops", icon: Sprout, label: "Crops" },
  { to: "/dashboard/products", icon: ShoppingBag, label: "Products" },
  { to: "/dashboard/orders", icon: ClipboardList, label: "Orders" },
];

function DashboardLayout() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = store.getUser();

  const handleLogout = () => {
    store.setUser(null);
    navigate({ to: "/" });
  };

  return (
    <div className="flex min-h-screen bg-muted/20">
      {/* Mobile overlay */}
      {sidebarOpen && <div className="fixed inset-0 z-30 bg-foreground/30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-sidebar-border bg-sidebar transform transition-transform lg:translate-x-0 lg:static ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-6">
          <Leaf className="h-6 w-6 text-sidebar-primary" />
          <span className="font-bold text-sidebar-foreground">FARM<span className="text-sidebar-primary">2</span>HOME</span>
        </div>

        <nav className="flex flex-col gap-1 p-4">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/dashboard" }}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors"
              activeProps={{ className: "bg-sidebar-accent text-sidebar-primary font-semibold" }}
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto border-t border-sidebar-border p-4">
          {user && <p className="mb-2 text-xs text-sidebar-foreground/60 truncate">{user.fullName}</p>}
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-sidebar-foreground/60 hover:text-sidebar-foreground transition-colors">
            <LogOut className="h-4 w-4" /> Log out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="flex h-16 items-center gap-4 border-b border-border bg-background px-4 lg:px-8">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <h2 className="text-lg font-semibold text-foreground">Dashboard</h2>
        </header>
        <main className="flex-1 p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
