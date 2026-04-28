import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { store, type Crop } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Sprout } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/dashboard/crops")({
  component: CropsPage,
});

function CropsPage() {
  const [crops, setCrops] = useState<Crop[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", quantity: "", expectedHarvest: "", status: "growing" as Crop["status"] });

  useEffect(() => { setCrops(store.getCrops()); }, []);

  const save = (updated: Crop[]) => { setCrops(updated); store.setCrops(updated); };

  const addCrop = (e: React.FormEvent) => {
    e.preventDefault();
    save([...crops, { id: crypto.randomUUID(), ...form }]);
    setForm({ name: "", quantity: "", expectedHarvest: "", status: "growing" });
    setOpen(false);
  };

  const removeCrop = (id: string) => save(crops.filter((c) => c.id !== id));

  const statusColors = { growing: "bg-primary/10 text-primary", ready: "bg-farm-gold/20 text-farm-earth", harvested: "bg-muted text-muted-foreground" };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Crop Management</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" /> Add Crop</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Add New Crop</DialogTitle></DialogHeader>
            <form onSubmit={addCrop} className="space-y-4">
              <div><Label>Crop Name</Label><Input placeholder="e.g. Tomatoes" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} required /></div>
              <div><Label>Quantity</Label><Input placeholder="e.g. 500 kg" value={form.quantity} onChange={(e) => setForm((p) => ({ ...p, quantity: e.target.value }))} required /></div>
              <div><Label>Expected Harvest</Label><Input type="date" value={form.expectedHarvest} onChange={(e) => setForm((p) => ({ ...p, expectedHarvest: e.target.value }))} required /></div>
              <div>
                <Label>Status</Label>
                <Select value={form.status} onValueChange={(v) => setForm((p) => ({ ...p, status: v as Crop["status"] }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="growing">Growing</SelectItem>
                    <SelectItem value="ready">Ready</SelectItem>
                    <SelectItem value="harvested">Harvested</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full">Add Crop</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {crops.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Sprout className="h-12 w-12 text-muted-foreground/40 mb-4" />
          <p className="text-muted-foreground">No crops yet. Add your first crop to get started!</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {crops.map((crop) => (
            <div key={crop.id} className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <h3 className="font-semibold text-foreground">{crop.name}</h3>
                <button onClick={() => removeCrop(crop.id)} className="text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="h-4 w-4" /></button>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">Qty: {crop.quantity}</p>
              <p className="text-sm text-muted-foreground">Harvest: {crop.expectedHarvest}</p>
              <span className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-medium ${statusColors[crop.status]}`}>{crop.status}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
