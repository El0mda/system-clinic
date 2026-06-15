"use client";

import { useState } from "react";
import { Search, Plus, Filter, Package, MoreHorizontal, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { products as initialProducts } from "@/lib/dashboard-data";
import type { Product } from "@/lib/dashboard-data";
import { useT } from "@/components/i18n/language-provider";

type CategoryFilter = "All" | "Dental Supplies" | "General Supplies" | "Therapy" | "Medical";

export default function InventoryPage() {
  const t = useT();
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
          <h1 className="text-2xl sm:text-3xl font-semibold text-text-primary">{t("inventory.title")}</h1>
          <p className="text-sm text-text-secondary mt-1">{products.length} {t("inventory.products")} · {lowStock.length} {t("inventory.lowStock")}</p>
        </div>
        <Button variant="primary" size="md" onClick={() => setModalOpen(true)}>
          <Plus className="h-4 w-4" /> {t("inventory.addProduct")}
        </Button>
      </div>

      {lowStock.length > 0 && (
        <div className="flex items-center gap-3 p-4 rounded-xl border border-amber-200 bg-amber-50 dark:border-amber-800/50 dark:bg-amber-900/10">
          <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" />
          <p className="text-sm text-amber-700 dark:text-amber-400">{t("inventory.productsRunningLow").replace("{count}", String(lowStock.length))}</p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 rtl:left-auto rtl:right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t("inventory.searchPlaceholder")}
            className="w-full h-11 pl-10 pr-4 rtl:pl-4 rtl:pr-10 rounded-xl border border-border/60 bg-surface text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all" />
        </div>
        <div className="relative">
          <Button variant="outline" size="md" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="h-4 w-4" /> {t("common.filters")} {filterBadge && <span className="mx-1 w-2 h-2 rounded-full bg-primary-500" />}
          </Button>
          {showFilters && (
            <div className="absolute right-0 rtl:right-auto rtl:left-0 top-full mt-2 z-50 w-56 rounded-xl border border-border/40 bg-surface shadow-xl p-4 space-y-3">
              <p className="text-xs font-medium text-text-tertiary mb-2">{t("inventory.category")}</p>
              <div className="flex flex-wrap gap-1.5">
                {(["All", "Dental Supplies", "General Supplies", "Therapy", "Medical"] as CategoryFilter[]).map((c) => (
                  <button key={c} onClick={() => setCategoryFilter(c)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${categoryFilter === c ? "bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300" : "text-text-secondary hover:text-text-primary hover:bg-surface-secondary"}`}>{c === "All" ? t("common.all") : t(`enums.category.${c}`, c)}</button>
                ))}
              </div>
              {categoryFilter !== "All" && (
                <button onClick={() => setCategoryFilter("All")} className="block text-xs font-medium text-primary-600 hover:text-primary-700 mt-2">{t("common.clearFilters")}</button>
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
                <th className="text-left text-xs font-semibold text-text-tertiary uppercase tracking-wider px-4 py-3">{t("inventory.cols.product")}</th>
                <th className="text-left text-xs font-semibold text-text-tertiary uppercase tracking-wider px-4 py-3">{t("inventory.cols.sku")}</th>
                <th className="text-left text-xs font-semibold text-text-tertiary uppercase tracking-wider px-4 py-3">{t("inventory.cols.category")}</th>
                <th className="text-right text-xs font-semibold text-text-tertiary uppercase tracking-wider px-4 py-3">{t("inventory.cols.price")}</th>
                <th className="text-right text-xs font-semibold text-text-tertiary uppercase tracking-wider px-4 py-3">{t("inventory.cols.cost")}</th>
                <th className="text-right text-xs font-semibold text-text-tertiary uppercase tracking-wider px-4 py-3">{t("inventory.cols.stock")}</th>
                <th className="text-left text-xs font-semibold text-text-tertiary uppercase tracking-wider px-4 py-3">{t("inventory.cols.unit")}</th>
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
                        <span className="text-sm font-medium text-text-primary">{t(`enums.product.${p.name}`, p.name)}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-sm font-mono text-text-secondary">{p.sku}</td>
                    <td className="px-4 py-3.5 text-sm text-text-secondary">{t(`enums.category.${p.category}`, p.category)}</td>
                    <td className="px-4 py-3.5 text-sm text-right font-medium text-text-primary">${p.price}</td>
                    <td className="px-4 py-3.5 text-sm text-right text-text-secondary">${p.cost}</td>
                    <td className="px-4 py-3.5 text-right">
                      <span className={`inline-flex items-center gap-1.5 text-sm font-medium ${isLow ? "text-red-600" : "text-emerald-600"}`}>
                        {isLow && <AlertTriangle className="h-3 w-3" />}{p.stock}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-sm text-text-secondary">{t(`enums.unit.${p.unit}`, p.unit)}</td>
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

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={t("inventory.addProduct")}>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label className="block text-xs font-medium text-text-secondary mb-1.5">{t("inventory.productName")}</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder={t("inventory.productNamePlaceholder")}
                className="w-full h-10 px-3 rounded-lg border border-border/60 bg-surface-secondary/50 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all" />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1.5">{t("inventory.category")}</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full h-10 px-3 rounded-lg border border-border/60 bg-surface-secondary/50 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all appearance-none">
                <option value="Dental Supplies">{t("enums.category.Dental Supplies")}</option><option value="General Supplies">{t("enums.category.General Supplies")}</option><option value="Therapy">{t("enums.category.Therapy")}</option><option value="Medical">{t("enums.category.Medical")}</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1.5">{t("inventory.cols.sku")}</label>
              <input value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} placeholder={t("inventory.skuAuto")}
                className="w-full h-10 px-3 rounded-lg border border-border/60 bg-surface-secondary/50 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all" />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1.5">{t("inventory.price")}</label>
              <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="0.00"
                className="w-full h-10 px-3 rounded-lg border border-border/60 bg-surface-secondary/50 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all" />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1.5">{t("inventory.cost")}</label>
              <input type="number" value={form.cost} onChange={(e) => setForm({ ...form, cost: e.target.value })} placeholder="0.00"
                className="w-full h-10 px-3 rounded-lg border border-border/60 bg-surface-secondary/50 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all" />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1.5">{t("inventory.stock")}</label>
              <input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} placeholder="0"
                className="w-full h-10 px-3 rounded-lg border border-border/60 bg-surface-secondary/50 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all" />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1.5">{t("inventory.minStock")}</label>
              <input type="number" value={form.minStock} onChange={(e) => setForm({ ...form, minStock: e.target.value })} placeholder="10"
                className="w-full h-10 px-3 rounded-lg border border-border/60 bg-surface-secondary/50 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all" />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1.5">{t("inventory.unit")}</label>
              <select value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })}
                className="w-full h-10 px-3 rounded-lg border border-border/60 bg-surface-secondary/50 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all appearance-none">
                <option value="Box">{t("enums.unit.Box")}</option><option value="Bottle">{t("enums.unit.Bottle")}</option><option value="Vial">{t("enums.unit.Vial")}</option><option value="Pack">{t("enums.unit.Pack")}</option><option value="Piece">{t("enums.unit.Piece")}</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" size="md" onClick={() => setModalOpen(false)}>{t("common.cancel")}</Button>
            <Button variant="primary" size="md" onClick={handleAdd} disabled={!form.name}>{t("inventory.addProduct")}</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
