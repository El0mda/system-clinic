"use client";

import { useState } from "react";
import { Search, Plus, Filter, Package, MoreHorizontal, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { products as initialProducts } from "@/lib/dashboard-data";
import type { Product } from "@/lib/dashboard-data";

type CategoryFilter = "All" | "Dental Supplies" | "General Supplies" | "Therapy" | "Medical";

export default function InventoryPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("All");
  const [showFilters, setShowFilters] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: "", category: "General Supplies", sku: "", price: "", cost: "", stock: "", minStock: "", unit: "Box" });

  const filtered = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "All" || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const lowStock = products.filter((p) => p.stock <= p.minStock);

  const handleAdd = () => {
    const newProduct: Product = {
      id: crypto.randomUUID(),
      name: form.name,
      category: form.category,
      sku: form.sku || `${form.category.slice(0, 3).toUpperCase()}-${String(products.length + 1).padStart(3, "0")}`,
      price: parseFloat(form.price) || 0,
      cost: parseFloat(form.cost) || 0,
      stock: parseInt(form.stock) || 0,
      minStock: parseInt(form.minStock) || 10,
      unit: form.unit,
    };
    setProducts((prev) => [...prev, newProduct]);
    setModalOpen(false);
    setForm({ name: "", category: "General Supplies", sku: "", price: "", cost: "", stock: "", minStock: "", unit: "Box" });
  };

  const filterBadge = categoryFilter !== "All";

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-text-primary">Inventory</h1>
          <p className="text-sm text-text-secondary mt-1">{products.length} products · {lowStock.length} low stock</p>
        </div>
        <Button variant="primary" size="md" onClick={() => setModalOpen(true)}>
          <Plus className="h-4 w-4" /> Add Product
        </Button>
      </div>

      {lowStock.length > 0 && (
        <div className="flex items-center gap-3 p-4 rounded-xl border border-amber-200 bg-amber-50 dark:border-amber-800/50 dark:bg-amber-900/10">
          <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" />
          <p className="text-sm text-amber-700 dark:text-amber-400">{lowStock.length} product{lowStock.length > 1 ? "s" : ""} running low on stock</p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..."
            className="w-full h-11 pl-10 pr-4 rounded-xl border border-border/60 bg-surface text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all" />
        </div>
        <div className="relative">
          <Button variant="outline" size="md" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="h-4 w-4" /> Filters {filterBadge && <span className="ml-1 w-2 h-2 rounded-full bg-primary-500" />}
          </Button>
          {showFilters && (
            <div className="absolute right-0 top-full mt-2 z-50 w-56 rounded-xl border border-border/40 bg-surface shadow-xl p-4 space-y-3">
              <p className="text-xs font-medium text-text-tertiary mb-2">Category</p>
              <div className="flex flex-wrap gap-1.5">
                {(["All", "Dental Supplies", "General Supplies", "Therapy", "Medical"] as CategoryFilter[]).map((c) => (
                  <button key={c} onClick={() => setCategoryFilter(c)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${categoryFilter === c ? "bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300" : "text-text-secondary hover:text-text-primary hover:bg-surface-secondary"}`}>{c}</button>
                ))}
              </div>
              {categoryFilter !== "All" && (
                <button onClick={() => setCategoryFilter("All")} className="block text-xs font-medium text-primary-600 hover:text-primary-700 mt-2">Clear filters</button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-border/40 bg-surface overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/30 bg-surface-secondary/50 dark:bg-surface-tertiary/30">
                <th className="text-left text-xs font-semibold text-text-tertiary uppercase tracking-wider px-4 py-3">Product</th>
                <th className="text-left text-xs font-semibold text-text-tertiary uppercase tracking-wider px-4 py-3">SKU</th>
                <th className="text-left text-xs font-semibold text-text-tertiary uppercase tracking-wider px-4 py-3">Category</th>
                <th className="text-right text-xs font-semibold text-text-tertiary uppercase tracking-wider px-4 py-3">Price</th>
                <th className="text-right text-xs font-semibold text-text-tertiary uppercase tracking-wider px-4 py-3">Cost</th>
                <th className="text-right text-xs font-semibold text-text-tertiary uppercase tracking-wider px-4 py-3">Stock</th>
                <th className="text-left text-xs font-semibold text-text-tertiary uppercase tracking-wider px-4 py-3">Unit</th>
                <th className="text-right text-xs font-semibold text-text-tertiary uppercase tracking-wider px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => {
                const isLow = p.stock <= p.minStock;
                return (
                  <tr key={p.id} className="border-b border-border/20 last:border-0 hover:bg-surface-secondary/50 dark:hover:bg-surface-tertiary/20 transition-colors">
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center">
                          <Package className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                        </div>
                        <span className="text-sm font-medium text-text-primary">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-sm font-mono text-text-secondary">{p.sku}</td>
                    <td className="px-4 py-3.5 text-sm text-text-secondary">{p.category}</td>
                    <td className="px-4 py-3.5 text-sm text-right font-medium text-text-primary">${p.price}</td>
                    <td className="px-4 py-3.5 text-sm text-right text-text-secondary">${p.cost}</td>
                    <td className="px-4 py-3.5 text-right">
                      <span className={`inline-flex items-center gap-1.5 text-sm font-medium ${isLow ? "text-red-600" : "text-emerald-600"}`}>
                        {isLow && <AlertTriangle className="h-3 w-3" />}{p.stock}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-sm text-text-secondary">{p.unit}</td>
                    <td className="px-4 py-3.5 text-right">
                      <button className="h-8 w-8 rounded-lg text-text-tertiary hover:text-text-primary hover:bg-surface-secondary dark:hover:bg-surface-tertiary/50 transition-colors flex items-center justify-center">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add Product">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label className="block text-xs font-medium text-text-secondary mb-1.5">Product Name</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Surgical Gloves"
                className="w-full h-10 px-3 rounded-lg border border-border/60 bg-surface-secondary/50 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all" />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1.5">Category</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full h-10 px-3 rounded-lg border border-border/60 bg-surface-secondary/50 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all appearance-none">
                <option>Dental Supplies</option><option>General Supplies</option><option>Therapy</option><option>Medical</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1.5">SKU</label>
              <input value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} placeholder="Auto-generated"
                className="w-full h-10 px-3 rounded-lg border border-border/60 bg-surface-secondary/50 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all" />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1.5">Price ($)</label>
              <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="0.00"
                className="w-full h-10 px-3 rounded-lg border border-border/60 bg-surface-secondary/50 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all" />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1.5">Cost ($)</label>
              <input type="number" value={form.cost} onChange={(e) => setForm({ ...form, cost: e.target.value })} placeholder="0.00"
                className="w-full h-10 px-3 rounded-lg border border-border/60 bg-surface-secondary/50 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all" />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1.5">Stock</label>
              <input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} placeholder="0"
                className="w-full h-10 px-3 rounded-lg border border-border/60 bg-surface-secondary/50 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all" />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1.5">Min. Stock</label>
              <input type="number" value={form.minStock} onChange={(e) => setForm({ ...form, minStock: e.target.value })} placeholder="10"
                className="w-full h-10 px-3 rounded-lg border border-border/60 bg-surface-secondary/50 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all" />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1.5">Unit</label>
              <select value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })}
                className="w-full h-10 px-3 rounded-lg border border-border/60 bg-surface-secondary/50 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all appearance-none">
                <option>Box</option><option>Bottle</option><option>Vial</option><option>Pack</option><option>Piece</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" size="md" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button variant="primary" size="md" onClick={handleAdd} disabled={!form.name}>Add Product</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
