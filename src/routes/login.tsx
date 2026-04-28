import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Leaf } from "lucide-react";
import { store } from "@/lib/store";
import { Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  validateSearch: (search: Record<string, unknown>) => ({
    mode: (search.mode as string) ?? "login",
  }),
  head: () => ({
    meta: [
      { title: "Login — FARM2HOME" },
      { name: "description", content: "Sign in or create your FARM2HOME account." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { mode: initialMode } = Route.useSearch();
  const [isSignup, setIsSignup] = useState(initialMode === "signup");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ fullName: "", phone: "", email: "", password: "", village: "", district: "", state: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isSignup) {
        const { error } = await supabase.auth.signUp({
          email: form.email,
          password: form.password,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`,
            data: { name: form.fullName },
          },
        });
        if (error) throw error;
        store.setUser({
          id: crypto.randomUUID(),
          fullName: form.fullName,
          phone: form.phone,
          email: form.email,
          location: { village: form.village, district: form.district, state: form.state },
        });
        toast.success("Account created successfully!", {
          description: `Welcome, ${form.fullName}.`,
        });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: form.email,
          password: form.password,
        });
        if (error) throw error;
        toast.success("Welcome back!");
      }
      navigate({ to: "/dashboard" });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      toast.error(isSignup ? "Sign up failed" : "Login failed", { description: message });
    } finally {
      setLoading(false);
    }
  };

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [field]: e.target.value }));

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link to="/" className="inline-flex items-center gap-2">
            <Leaf className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">FARM<span className="text-primary">2</span>HOME</span>
          </Link>
        </div>

        <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-foreground text-center">{isSignup ? "Create Account" : "Welcome Back"}</h1>
          <p className="mt-2 text-center text-sm text-muted-foreground">{isSignup ? "Start selling your produce today" : "Log in to your dashboard"}</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {isSignup && (
              <>
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" placeholder="Ramesh Kumar" value={form.fullName} onChange={update("fullName")} required />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="+91 98765 43210" value={form.phone} onChange={update("phone")} required />
                </div>
              </>
            )}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="farmer@example.com" value={form.email} onChange={update("email")} required />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" value={form.password} onChange={update("password")} required />
            </div>
            {isSignup && (
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label htmlFor="village">Village</Label>
                  <Input id="village" placeholder="Village" value={form.village} onChange={update("village")} />
                </div>
                <div>
                  <Label htmlFor="district">District</Label>
                  <Input id="district" placeholder="District" value={form.district} onChange={update("district")} />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input id="state" placeholder="State" value={form.state} onChange={update("state")} />
                </div>
              </div>
            )}
            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? "Please wait…" : isSignup ? "Create Account" : "Log In"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <button type="button" className="font-medium text-primary hover:underline" onClick={() => setIsSignup(!isSignup)}>
              {isSignup ? "Log in" : "Sign up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
