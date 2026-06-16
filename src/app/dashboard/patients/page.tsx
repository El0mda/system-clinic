"use client";

import { useState } from "react";
import { Search, Plus, Filter, MoreHorizontal, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import type { Patient } from "@/lib/dashboard-data";
import { useT } from "@/components/i18n/language-provider";
import { useAuth } from "@/components/dashboard/auth-provider";
import { getClinicConfig } from "@/lib/clinic-config";

type GenderFilter = "All" | "Male" | "Female";
type StatusFilter = "All" | "Active" | "Inactive" | "New";

export default function PatientsPage() {
  const t = useT();
  const { user } = useAuth();
  // "Patients" for clinics, "Clients" for a beauty center.
  const config = getClinicConfig(user?.clinicType);
  const isBeauty = config.key === "beauty";
  const title = isBeauty ? t("clients.title", "Clients") : t("patients.title");
  const totalLabel = isBeauty ? t("clients.total", "total clients") : t("patients.totalPatients");
  const addLabel = isBeauty ? t("clients.add", "Add Client") : t("patients.addPatient");
  const searchLabel = isBeauty ? t("clients.searchPlaceholder", "Search clients...") : t("patients.searchPlaceholder");
  const colLabel = isBeauty ? t("clients.colClient", "Client") : t("patients.cols.patient");

  const [patients, setPatients] = useState<Patient[]>(config.data.clients);
  const [search, setSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState<GenderFilter>("All");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [showFilters, setShowFilters] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", gender: "Male" as "Male" | "Female", age: "" });

  const filtered = patients.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.email.toLowerCase().includes(search.toLowerCase());
    const matchesGender = genderFilter === "All" || p.gender === genderFilter;
    const matchesStatus = statusFilter === "All" || p.status === statusFilter;
    return matchesSearch && matchesGender && matchesStatus;
  });

  const handleAdd = () => {
    const newPatient: Patient = {
      id: crypto.randomUUID(),
      name: form.name,
      email: form.email,
      phone: form.phone,
      gender: form.gender,
      age: parseInt(form.age) || 0,
      lastVisit: new Date().toISOString().slice(0, 10),
      status: "New",
      avatar: form.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) || "??",
    };
    setPatients((prev) => [newPatient, ...prev]);
    setModalOpen(false);
    setForm({ name: "", email: "", phone: "", gender: "Male", age: "" });
  };

  const filterBadge = genderFilter !== "All" || statusFilter !== "All";

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-text-primary">{title}</h1>
          <p className="text-sm text-text-secondary mt-1">{patients.length} {totalLabel}</p>
        </div>
        <Button variant="primary" size="md" onClick={() => setModalOpen(true)}>
          <Plus className="h-4 w-4" />
          {addLabel}
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 rtl:left-auto rtl:right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={searchLabel}
            className="w-full h-11 pl-10 pr-4 rtl:pl-4 rtl:pr-10 rounded-xl border border-border/60 bg-surface text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all"
          />
        </div>
        <div className="relative">
          <Button variant="outline" size="md" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="h-4 w-4" />
            {t("common.filters")}
            {filterBadge && <span className="mx-1 w-2 h-2 rounded-full bg-primary-500" />}
          </Button>
          {showFilters && (
            <div className="absolute right-0 top-full mt-2 z-50 w-64 rounded-xl border border-border/40 bg-surface shadow-xl p-4 space-y-4">
              <div>
                <p className="text-xs font-medium text-text-tertiary mb-2">{t("patients.gender")}</p>
                <div className="flex gap-1.5">
                  {(["All", "Male", "Female"] as GenderFilter[]).map((g) => (
                    <button key={g} onClick={() => setGenderFilter(g)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${genderFilter === g ? "bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300" : "text-text-secondary hover:text-text-primary hover:bg-surface-secondary"}`}>{g === "All" ? t("common.all") : t(`enums.gender.${g}`, g)}</button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-text-tertiary mb-2">{t("common.status")}</p>
                <div className="flex gap-1.5">
                  {(["All", "Active", "Inactive", "New"] as StatusFilter[]).map((s) => (
                    <button key={s} onClick={() => setStatusFilter(s)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${statusFilter === s ? "bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300" : "text-text-secondary hover:text-text-primary hover:bg-surface-secondary"}`}>{s === "All" ? t("common.all") : t(`enums.status.${s}`, s)}</button>
                  ))}
                </div>
              </div>
              {(genderFilter !== "All" || statusFilter !== "All") && (
                <button onClick={() => { setGenderFilter("All"); setStatusFilter("All"); }}
                  className="text-xs font-medium text-primary-600 hover:text-primary-700">{t("common.clearFilters")}</button>
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
                <th className="text-left text-xs font-semibold text-text-tertiary uppercase tracking-wider px-4 py-3">{colLabel}</th>
                <th className="text-left text-xs font-semibold text-text-tertiary uppercase tracking-wider px-4 py-3">{t("patients.cols.contact")}</th>
                <th className="text-left text-xs font-semibold text-text-tertiary uppercase tracking-wider px-4 py-3">{t("patients.cols.gender")}</th>
                <th className="text-left text-xs font-semibold text-text-tertiary uppercase tracking-wider px-4 py-3">{t("patients.cols.age")}</th>
                <th className="text-left text-xs font-semibold text-text-tertiary uppercase tracking-wider px-4 py-3">{t("patients.cols.lastVisit")}</th>
                <th className="text-left text-xs font-semibold text-text-tertiary uppercase tracking-wider px-4 py-3">{t("patients.cols.status")}</th>
                <th className="text-right text-xs font-semibold text-text-tertiary uppercase tracking-wider px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b border-border/20 last:border-0 hover:bg-surface-secondary/50 dark:hover:bg-surface-tertiary/20 transition-colors">
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-300 to-accent-300 dark:from-primary-600 dark:to-accent-600 flex items-center justify-center text-xs font-semibold text-white">{p.avatar}</div>
                      <div>
                        <p className="text-sm font-medium text-text-primary">{p.name}</p>
                        <p className="text-xs text-text-tertiary">ID: #{p.id.padStart(4, "0")}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="space-y-1">
                      <p className="text-xs text-text-secondary flex items-center gap-1.5"><Mail className="h-3 w-3 text-text-tertiary" />{p.email}</p>
                      <p className="text-xs text-text-secondary flex items-center gap-1.5"><Phone className="h-3 w-3 text-text-tertiary" />{p.phone}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-sm text-text-secondary">{t(`enums.gender.${p.gender}`, p.gender)}</td>
                  <td className="px-4 py-3.5 text-sm text-text-secondary">{p.age}</td>
                  <td className="px-4 py-3.5 text-sm text-text-secondary">{p.lastVisit}</td>
                  <td className="px-4 py-3.5">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium ${
                      p.status === "Active" ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400" :
                      p.status === "New" ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400" :
                      "bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400"
                    }`}>{t(`enums.status.${p.status}`, p.status)}</span>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <button className="h-8 w-8 rounded-lg text-text-tertiary hover:text-text-primary hover:bg-surface-secondary dark:hover:bg-surface-tertiary/50 transition-colors flex items-center justify-center">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={addLabel}>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">{t("patients.fullName")}</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="John Doe" required
              className="w-full h-10 px-3 rounded-lg border border-border/60 bg-surface-secondary/50 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all" />
          </div>
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">{t("employees.email")}</label>
            <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="john@email.com" required
              className="w-full h-10 px-3 rounded-lg border border-border/60 bg-surface-secondary/50 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all" />
          </div>
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">{t("employees.phone")}</label>
            <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="+1 (555) 000-0000"
              className="w-full h-10 px-3 rounded-lg border border-border/60 bg-surface-secondary/50 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1.5">{t("patients.gender")}</label>
              <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value as "Male" | "Female" })}
                className="w-full h-10 px-3 rounded-lg border border-border/60 bg-surface-secondary/50 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all appearance-none">
                <option value="Male">{t("enums.gender.Male")}</option>
                <option value="Female">{t("enums.gender.Female")}</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1.5">{t("patients.age")}</label>
              <input type="number" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })}
                placeholder="30"
                className="w-full h-10 px-3 rounded-lg border border-border/60 bg-surface-secondary/50 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all" />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" size="md" onClick={() => setModalOpen(false)}>{t("common.cancel")}</Button>
            <Button variant="primary" size="md" onClick={handleAdd} disabled={!form.name || !form.email}>{addLabel}</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
