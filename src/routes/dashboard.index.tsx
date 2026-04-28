import { createFileRoute } from "@tanstack/react-router";
import { store } from "@/lib/store";
import { ShoppingBag, DollarSign, TrendingUp, Package, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/dashboard/")({
  component: AnalyticsPage,
});

interface Profile {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

function AnalyticsPage() {
  const orders = store.getOrders();
  const products = store.getProducts();
  const totalSales = orders.reduce((s, o) => s + o.total, 0);
  const totalOrders = orders.length;
  const delivered = orders.filter((o) => o.status === "delivered").length;

  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loadingProfiles, setLoadingProfiles] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, name, email, created_at")
        .order("created_at", { ascending: false });
      if (!error && data) setProfiles(data as Profile[]);
      setLoadingProfiles(false);
    };
    load();
  }, []);

  const topProducts = orders.reduce<Record<string, number>>((acc, o) => {
    acc[o.productName] = (acc[o.productName] || 0) + o.quantity;
    return acc;
  }, {});
  const topList = Object.entries(topProducts).sort((a, b) => b[1] - a[1]).slice(0, 5);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-foreground">Analytics Overview</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Sales", value: `₹${totalSales.toLocaleString()}`, icon: DollarSign, color: "text-primary" },
          { label: "Total Orders", value: totalOrders, icon: ShoppingBag, color: "text-farm-earth" },
          { label: "Products Listed", value: products.length, icon: Package, color: "text-farm-gold" },
          { label: "Delivered", value: delivered, icon: TrendingUp, color: "text-primary" },
          { label: "Registered Users", value: profiles.length, icon: Users, color: "text-farm-earth" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
            <p className="mt-2 text-3xl font-bold text-foreground">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground mb-4">Top Selling Products</h2>
        {topList.length === 0 ? (
          <p className="text-muted-foreground text-sm">No orders yet. Start selling to see analytics!</p>
        ) : (
          <div className="space-y-3">
            {topList.map(([name, qty]) => (
              <div key={name} className="flex items-center justify-between">
                <span className="text-sm text-foreground">{name}</span>
                <span className="text-sm font-medium text-muted-foreground">{qty} units</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Users className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Registered Users</h2>
        </div>
        {loadingProfiles ? (
          <p className="text-muted-foreground text-sm">Loading users…</p>
        ) : profiles.length === 0 ? (
          <p className="text-muted-foreground text-sm">No registered users yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-muted-foreground">
                  <th className="py-2 pr-4 font-medium">Name</th>
                  <th className="py-2 pr-4 font-medium">Email</th>
                  <th className="py-2 font-medium">Joined</th>
                </tr>
              </thead>
              <tbody>
                {profiles.map((p) => (
                  <tr key={p.id} className="border-b border-border/50 last:border-0">
                    <td className="py-2 pr-4 font-medium text-foreground">{p.name}</td>
                    <td className="py-2 pr-4 text-muted-foreground">{p.email}</td>
                    <td className="py-2 text-muted-foreground">
                      {new Date(p.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
