export interface User {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  location: { village: string; district: string; state: string };
}

export interface Crop {
  id: string;
  name: string;
  quantity: string;
  expectedHarvest: string;
  status: "growing" | "ready" | "harvested";
}

export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  category: string;
}

export interface Order {
  id: string;
  productName: string;
  customerName: string;
  quantity: number;
  total: number;
  status: "pending" | "shipped" | "delivered";
  date: string;
}

function getStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function setStorage<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

export const store = {
  getUser: () => getStorage<User | null>("f2h_user", null),
  setUser: (u: User | null) => setStorage("f2h_user", u),

  getCrops: () => getStorage<Crop[]>("f2h_crops", []),
  setCrops: (c: Crop[]) => setStorage("f2h_crops", c),

  getProducts: () => getStorage<Product[]>("f2h_products", []),
  setProducts: (p: Product[]) => setStorage("f2h_products", p),

  getOrders: () => getStorage<Order[]>("f2h_orders", sampleOrders),
  setOrders: (o: Order[]) => setStorage("f2h_orders", o),
};

const sampleOrders: Order[] = [
  { id: "1", productName: "Organic Tomatoes", customerName: "Priya Sharma", quantity: 5, total: 250, status: "pending", date: "2026-04-12" },
  { id: "2", productName: "Basmati Rice", customerName: "Rahul Verma", quantity: 10, total: 1200, status: "shipped", date: "2026-04-10" },
  { id: "3", productName: "Fresh Spinach", customerName: "Anita Patel", quantity: 3, total: 90, status: "delivered", date: "2026-04-08" },
];
