"use client";

import { useState } from "react";
import { Search, Plus, Filter, Download, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { invoices as initialInvoices, patients } from "@/lib/dashboard-data";
import type { Invoice } from "@/lib/dashboard-data";

type StatusFilter = "All" | "Paid" | "Partially Paid" | "Overdue" | "Pending" | "Cancelled";

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [showFilters, setShowFilters] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ patientName: "", amount: "" });

  const filtered = invoices.filter((inv) => {
    const matchesSearch = inv.patientName.toLowerCase().includes(search.toLowerCase()) || inv.number.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || inv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = invoices.reduce((s, i) => s + i.amount, 0);
  const totalCollected = invoices.reduce((s, i) => s + i.paid, 0);
  const totalDue = invoices.reduce((s, i) => s + i.due, 0);

  const handleAdd = () => {
    const patient = patients.find((p) => p.name === form.patientName);
    const amount = parseFloat(form.amount) || 0;
    const newInv: Invoice = {
      id: crypto.randomUUID(),
      number: `INV-2026-${String(invoices.length + 1).padStart(3, "0")}`,
      patientName: form.patientName,
      patientAvatar: patient?.avatar || form.patientName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2),
      amount,
      paid: 0,
      due: amount,
      date: new Date().toISOString().slice(0, 10),
      status: "Pending",
    };
    setInvoices((prev) => [newInv, ...prev]);
    setModalOpen(false);
    setForm({ patientName: "", amount: "" });
  };

  const filterBadge = statusFilter !== "All";

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-text-primary">Invoices</h1>
          <p className="text-sm text-text-secondary mt-1">{invoices.length} total invoices</p>
        </div>
        <Button variant="primary" size="md" onClick={() => setModalOpen(true)}>
          <Plus className="h-4 w-4" /> Create Invoice
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-xl border border-border/40 bg-surface p-4">
          <p className="text-xs text-text-tertiary font-medium">Total Revenue</p>
          <p className="text-xl font-semibold text-text-primary mt-1">${totalRevenue.toLocaleString()}</p>
        </div>
        <div className="rounded-xl border border-border/40 bg-surface p-4">
          <p className="text-xs text-text-tertiary font-medium">Collected</p>
          <p className="text-xl font-semibold text-emerald-600 mt-1">${totalCollected.toLocaleString()}</p>
        </div>
        <div className="rounded-xl border border-border/40 bg-surface p-4">
          <p className="text-xs text-text-tertiary font-medium">Outstanding</p>
          <p className="text-xl font-semibold text-amber-600 mt-1">${totalDue.toLocaleString()}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search invoices..."
            className="w-full h-11 pl-10 pr-4 rounded-xl border border-border/60 bg-surface text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all" />
        </div>
        <div className="relative">
          <Button variant="outline" size="md" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="h-4 w-4" /> Filters {filterBadge && <span className="ml-1 w-2 h-2 rounded-full bg-primary-500" />}
          </Button>
          {showFilters && (
            <div className="absolute right-0 top-full mt-2 z-50 w-56 rounded-xl border border-border/40 bg-surface shadow-xl p-4 space-y-3">
              <p className="text-xs font-medium text-text-tertiary mb-2">Status</p>
              <div className="flex flex-wrap gap-1.5">
                {(["All", "Paid", "Partially Paid", "Overdue", "Pending", "Cancelled"] as StatusFilter[]).map((s) => (
                  <button key={s} onClick={() => setStatusFilter(s)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${statusFilter === s ? "bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300" : "text-text-secondary hover:text-text-primary hover:bg-surface-secondary"}`}>{s}</button>
                ))}
              </div>
              {statusFilter !== "All" && (
                <button onClick={() => setStatusFilter("All")} className="block text-xs font-medium text-primary-600 hover:text-primary-700 mt-2">Clear filters</button>
              )}
            </div>
          )}
        </div>
        <Button variant="outline" size="md"><Download className="h-4 w-4" /> Export</Button>
      </div>

      <div className="rounded-xl border border-border/40 bg-surface overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/30 bg-surface-secondary/50 dark:bg-surface-tertiary/30">
                <th className="text-left text-xs font-semibold text-text-tertiary uppercase tracking-wider px-4 py-3">Invoice</th>
                <th className="text-left text-xs font-semibold text-text-tertiary uppercase tracking-wider px-4 py-3">Patient</th>
                <th className="text-left text-xs font-semibold text-text-tertiary uppercase tracking-wider px-4 py-3">Date</th>
                <th className="text-right text-xs font-semibold text-text-tertiary uppercase tracking-wider px-4 py-3">Amount</th>
                <th className="text-right text-xs font-semibold text-text-tertiary uppercase tracking-wider px-4 py-3">Paid</th>
                <th className="text-right text-xs font-semibold text-text-tertiary uppercase tracking-wider px-4 py-3">Due</th>
                <th className="text-left text-xs font-semibold text-text-tertiary uppercase tracking-wider px-4 py-3">Status</th>
                <th className="text-right text-xs font-semibold text-text-tertiary uppercase tracking-wider px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((inv) => (
                <tr key={inv.id} className="border-b border-border/20 last:border-0 hover:bg-surface-secondary/50 dark:hover:bg-surface-tertiary/20 transition-colors">
                  <td className="px-4 py-3.5"><span className="text-sm font-medium text-primary-600 dark:text-primary-400">{inv.number}</span></td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-300 to-accent-300 dark:from-primary-600 dark:to-accent-600 flex items-center justify-center text-xs font-semibold text-white">{inv.patientAvatar}</div>
                      <span className="text-sm font-medium text-text-primary">{inv.patientName}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-sm text-text-secondary">{inv.date}</td>
                  <td className="px-4 py-3.5 text-sm text-right font-medium text-text-primary">${inv.amount.toLocaleString()}</td>
                  <td className="px-4 py-3.5 text-sm text-right font-medium text-emerald-600">${inv.paid.toLocaleString()}</td>
                  <td className="px-4 py-3.5 text-sm text-right font-medium text-amber-600">${inv.due.toLocaleString()}</td>
                  <td className="px-4 py-3.5">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium ${
                      inv.status === "Paid" ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400" :
                      inv.status === "Partially Paid" ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400" :
                      inv.status === "Overdue" ? "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400" :
                      inv.status === "Cancelled" ? "bg-slate-50 text-slate-500 dark:bg-slate-900/20 dark:text-slate-400" :
                      "bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400"
                    }`}>{inv.status}</span>
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

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Create Invoice">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">Patient</label>
            <select value={form.patientName} onChange={(e) => setForm({ ...form, patientName: e.target.value })}
              className="w-full h-10 px-3 rounded-lg border border-border/60 bg-surface-secondary/50 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all appearance-none">
              <option value="">Select patient</option>
              {patients.map((p) => <option key={p.id} value={p.name}>{p.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">Amount ($)</label>
            <input type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })}
              placeholder="0.00"
              className="w-full h-10 px-3 rounded-lg border border-border/60 bg-surface-secondary/50 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all" />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" size="md" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button variant="primary" size="md" onClick={handleAdd} disabled={!form.patientName || !form.amount}>Create Invoice</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
