import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { store, type Product } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Edit, ShoppingBag } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export const Route = createFileRoute("/dashboard/products")({
  component: ProductsPage,
});

function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", price: "", quantity: "", imageUrl: "", category: "" });

  useEffect(() => { setProducts(store.getProducts()); }, []);
  const save = (updated: Product[]) => { setProducts(updated); store.setProducts(updated); };

  const resetForm = () => { setForm({ name: "", price: "", quantity: "", imageUrl: "", category: "" }); setEditId(null); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const product: Product = {
      id: editId || crypto.randomUUID(),
      name: form.name,
      price: Number(form.price),
      quantity: Number(form.quantity),
      imageUrl: form.imageUrl,
      category: form.category,
    };
    if (editId) {
      save(products.map((p) => (p.id === editId ? product : p)));
    } else {
      save([...products, product]);
    }
    resetForm();
    setOpen(false);
  };

  const startEdit = (p: Product) => {
    setForm({ name: p.name, price: String(p.price), quantity: String(p.quantity), imageUrl: p.imageUrl, category: p.category });
    setEditId(p.id);
    setOpen(true);
  };

  const remove = (id: string) => save(products.filter((p) => p.id !== id));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Product Listings</h1>
        <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) resetForm(); }}>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" /> Add Product</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>{editId ? "Edit Product" : "Add Product"}</DialogTitle></DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><Label>Product Name</Label><Input placeholder="e.g. Organic Tomatoes" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} required /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Price (₹)</Label><Input type="number" placeholder="50" value={form.price} onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))} required /></div>
                <div><Label>Quantity</Label><Input type="number" placeholder="100" value={form.quantity} onChange={(e) => setForm((p) => ({ ...p, quantity: e.target.value }))} required /></div>
              </div>
              <div><Label>Image URL</Label><Input placeholder="https://..." value={form.imageUrl} onChange={(e) => setForm((p) => ({ ...p, imageUrl: e.target.value }))} /></div>
              <div><Label>Category</Label><Input placeholder="e.g. Vegetables" value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))} required /></div>
              <Button type="submit" className="w-full">{editId ? "Update Product" : "Add Product"}</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <ShoppingBag className="h-12 w-12 text-muted-foreground/40 mb-4" />
          <p className="text-muted-foreground">No products yet. Add your first product listing!</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div key={product.id} className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
              {product.imageUrl && <img src={product.imageUrl} alt={product.name} className="h-40 w-full object-cover" loading="lazy" />}
              <div className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">{product.name}</h3>
                    <span className="text-xs text-muted-foreground">{product.category}</span>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => startEdit(product)} className="text-muted-foreground hover:text-primary transition-colors"><Edit className="h-4 w-4" /></button>
                    <button onClick={() => remove(product.id)} className="text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-lg font-bold text-primary">₹{product.price}</span>
                  <span className="text-sm text-muted-foreground">{product.quantity} in stock</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
