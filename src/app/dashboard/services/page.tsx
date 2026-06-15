"use client";

import { useState } from "react";
import { Search, Plus, Clock, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { services as initialServices } from "@/lib/dashboard-data";
import type { Service } from "@/lib/dashboard-data";
import { useT } from "@/components/i18n/language-provider";

const categories = Array.from(new Set(initialServices.map((s) => s.category)));

export default function ServicesPage() {
  const t = useT();
  const [services, setServices] = useState<Service[]>(initialServices);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: "", category: "Dental", price: "", duration: "30" });

  const filtered = services.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || s.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAdd = () => {
    const newService: Service = {
      id: crypto.randomUUID(),
      name: form.name,
      category: form.category,
      price: parseFloat(form.price) || 0,
      duration: parseInt(form.duration) || 30,
      active: true,
      clinicType: form.category,
    };
    setServices((prev) => [...prev, newService]);
    setModalOpen(false);
    setForm({ name: "", category: "Dental", price: "", duration: "30" });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-text-primary">{t("services.title")}</h1>
          <p className="text-sm text-text-secondary mt-1">{services.length} {t("services.totalServices")}</p>
        </div>
        <Button variant="primary" size="md" onClick={() => setModalOpen(true)}>
          <Plus className="h-4 w-4" /> {t("services.addService")}
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 rtl:left-auto rtl:right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t("services.searchPlaceholder")}
            className="w-full h-11 pl-10 pr-4 rtl:pl-4 rtl:pr-10 rounded-xl border border-border/60 bg-surface text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all" />
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {["All", ...categories].map((cat) => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              activeCategory === cat
                ? "bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300 border border-primary-200 dark:border-primary-800"
                : "bg-surface-secondary/50 text-text-secondary hover:text-text-primary border border-transparent hover:border-border/40"
            }`}>{cat === "All" ? t("common.all") : t(`enums.category.${cat}`, cat)}</button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((s) => (
          <div key={s.id} className="rounded-xl border border-border/40 bg-surface p-5 hover:shadow-lg hover:shadow-primary-500/5 transition-all">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-base font-semibold text-text-primary">{t(`enums.service.${s.name}`, s.name)}</h3>
                <span className="text-xs text-text-tertiary">{t(`enums.category.${s.category}`, s.category)}</span>
              </div>
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium ${
                s.active ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400" : "bg-slate-50 text-slate-500 dark:bg-slate-900/20 dark:text-slate-400"
              }`}>{s.active ? t("services.active") : t("services.inactive")}</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-text-secondary">
              <span className="flex items-center gap-1.5"><DollarSign className="h-3.5 w-3.5 text-text-tertiary" /> ${s.price}</span>
              <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-text-tertiary" /> {s.duration} {t("services.min")}</span>
            </div>
          </div>
        ))}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={t("services.addService")}>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">{t("services.serviceName")}</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder={t("services.serviceNamePlaceholder")}
              className="w-full h-10 px-3 rounded-lg border border-border/60 bg-surface-secondary/50 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1.5">{t("services.category")}</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full h-10 px-3 rounded-lg border border-border/60 bg-surface-secondary/50 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all appearance-none">
                {categories.map((c) => <option key={c} value={c}>{t(`enums.category.${c}`, c)}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1.5">{t("services.duration")}</label>
              <select value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })}
                className="w-full h-10 px-3 rounded-lg border border-border/60 bg-surface-secondary/50 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all appearance-none">
                <option value="15">15</option><option value="30">30</option><option value="45">45</option><option value="60">60</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">{t("services.price")}</label>
            <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="0.00"
              className="w-full h-10 px-3 rounded-lg border border-border/60 bg-surface-secondary/50 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all" />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" size="md" onClick={() => setModalOpen(false)}>{t("common.cancel")}</Button>
            <Button variant="primary" size="md" onClick={handleAdd} disabled={!form.name || !form.price}>{t("services.addService")}</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
