import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Sprout, ShoppingBag, BarChart3, Truck, ArrowRight, Star, Check } from "lucide-react";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-farm2home.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FARM2HOME — Sell Farm Produce Directly" },
      { name: "description", content: "Manage crops, sell online, and reach customers directly without middlemen." },
      { property: "og:title", content: "FARM2HOME — Connecting Your Farm to Every Home" },
      { property: "og:description", content: "Manage crops, sell online, and reach customers directly without middlemen." },
    ],
  }),
  component: LandingPage,
});

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div initial="hidden" animate="visible" variants={fadeUp}>
              <span className="inline-block rounded-full bg-farm-green-light px-4 py-1.5 text-sm font-medium text-primary mb-6">
                🌱 No middlemen. More profits.
              </span>
              <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl leading-tight">
                Sell your farm produce directly — <span className="text-primary">no middlemen</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-lg">
                Manage crops, sell online, and reach customers easily. FARM2HOME gives every farmer the digital tools to grow their business.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button variant="hero" size="xl" asChild>
                  <Link to="/login" search={{ mode: "signup" }}>Start Free <ArrowRight className="ml-1 h-5 w-5" /></Link>
                </Button>
                <Button variant="heroOutline" size="xl" asChild>
                  <a href="#features">See Features</a>
                </Button>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }}>
              <img src={heroImage} alt="Farmer delivering fresh produce to families" className="rounded-2xl shadow-2xl w-full" width={1280} height={720} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-muted/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Everything you need to sell directly</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">Simple digital tools designed for Indian farmers to manage crops, create storefronts, and track orders.</p>
          </motion.div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Sprout, title: "Crop Management", desc: "Track your crops, harvest timelines, and quantities in one place." },
              { icon: ShoppingBag, title: "Online Storefront", desc: "Create product listings with pricing and images. Share your store link." },
              { icon: Truck, title: "Order Tracking", desc: "Receive orders, update status, and manage deliveries seamlessly." },
              { icon: BarChart3, title: "Sales Analytics", desc: "See total sales, top products, and order trends at a glance." },
            ].map((f, i) => (
              <motion.div key={f.title} className="rounded-2xl bg-card p-6 shadow-sm border border-border hover:shadow-md transition-shadow" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { duration: 0.5, delay: i * 0.1 } } }}>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-farm-green-light mb-4">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground text-lg">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">How it works</h2>
            <p className="mt-4 text-muted-foreground">Three simple steps to start selling your produce online.</p>
          </motion.div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { step: "01", title: "Sign Up Free", desc: "Create your account in under 2 minutes. No fees to start." },
              { step: "02", title: "Add Your Products", desc: "List your crops with prices, photos, and quantities." },
              { step: "03", title: "Start Selling", desc: "Share your store link. Receive orders directly from customers." },
            ].map((s, i) => (
              <motion.div key={s.step} className="text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { duration: 0.5, delay: i * 0.15 } } }}>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold mb-4">{s.step}</div>
                <h3 className="text-xl font-semibold text-foreground">{s.title}</h3>
                <p className="mt-2 text-muted-foreground">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-muted/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Simple pricing for every farmer</h2>
          </motion.div>
          <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
            {[
              { name: "Free", price: "₹0", period: "/forever", features: ["5 product listings", "Basic analytics", "Order management", "Share store link"], cta: "Get Started" },
              { name: "Pro", price: "₹499", period: "/month", features: ["Unlimited listings", "Advanced analytics", "Priority support", "Custom store URL", "SMS notifications"], cta: "Start Pro", popular: true },
              { name: "Premium", price: "₹999", period: "/month", features: ["Everything in Pro", "Dedicated manager", "Bulk order tools", "API access", "Multi-farm support"], cta: "Go Premium" },
            ].map((plan) => (
              <motion.div key={plan.name} className={`rounded-2xl bg-card p-8 border ${plan.popular ? "border-primary shadow-lg ring-2 ring-primary/20 relative" : "border-border shadow-sm"}`} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                {plan.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">Most Popular</span>}
                <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
                <div className="mt-4"><span className="text-4xl font-bold text-foreground">{plan.price}</span><span className="text-muted-foreground">{plan.period}</span></div>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-primary flex-shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-8" variant={plan.popular ? "default" : "outline"} asChild>
                  <Link to="/login" search={{ mode: "signup" }}>{plan.cta}</Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Trusted by farmers across India</h2>
          </motion.div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { name: "Ramesh Kumar", location: "Punjab", text: "I increased my income by 40% after cutting out middlemen. FARM2HOME made it simple.", stars: 5 },
              { name: "Lakshmi Devi", location: "Karnataka", text: "Managing orders was so hard before. Now I track everything from my phone!", stars: 5 },
              { name: "Sunil Reddy", location: "Andhra Pradesh", text: "My organic vegetables reach customers within 24 hours. The freshness makes them come back.", stars: 5 },
            ].map((t) => (
              <motion.div key={t.name} className="rounded-2xl bg-card p-6 border border-border shadow-sm" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <div className="flex gap-1 mb-4">{Array.from({ length: t.stars }).map((_, i) => <Star key={i} className="h-4 w-4 fill-farm-gold text-farm-gold" />)}</div>
                <p className="text-foreground italic">"{t.text}"</p>
                <div className="mt-4">
                  <p className="font-semibold text-foreground text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-primary py-16">
        <div className="mx-auto max-w-3xl text-center px-4">
          <h2 className="text-3xl font-bold text-primary-foreground sm:text-4xl">Ready to grow your farm business?</h2>
          <p className="mt-4 text-primary-foreground/80">Join thousands of farmers already selling directly to customers. Start free today.</p>
          <Button variant="hero" size="xl" className="mt-8 bg-background text-foreground hover:bg-background/90" asChild>
            <Link to="/login" search={{ mode: "signup" }}>Start Free Now <ArrowRight className="ml-1 h-5 w-5" /></Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
