"use client";

import { useState } from "react";
import { Search, Plus, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { employees as initialEmployees } from "@/lib/dashboard-data";
import type { Employee } from "@/lib/dashboard-data";

const roles = Array.from(new Set(initialEmployees.map((e) => e.role)));

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [search, setSearch] = useState("");
  const [activeRole, setActiveRole] = useState<string>("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", role: "Doctor", specialty: "" });

  const filtered = employees.filter((e) => {
    const matchesSearch = e.name.toLowerCase().includes(search.toLowerCase()) || e.specialty.toLowerCase().includes(search.toLowerCase());
    const matchesRole = activeRole === "All" || e.role === activeRole;
    return matchesSearch && matchesRole;
  });

  const handleAdd = () => {
    const newEmployee: Employee = {
      id: crypto.randomUUID(),
      name: form.name,
      email: form.email,
      phone: form.phone,
      role: form.role,
      specialty: form.specialty,
      status: "Active",
      avatar: form.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) || "??",
    };
    setEmployees((prev) => [...prev, newEmployee]);
    setModalOpen(false);
    setForm({ name: "", email: "", phone: "", role: "Doctor", specialty: "" });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-text-primary">Employees</h1>
          <p className="text-sm text-text-secondary mt-1">{employees.length} team members</p>
        </div>
        <Button variant="primary" size="md" onClick={() => setModalOpen(true)}>
          <Plus className="h-4 w-4" /> Add Employee
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search employees..."
            className="w-full h-11 pl-10 pr-4 rounded-xl border border-border/60 bg-surface text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all" />
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {["All", ...roles].map((role) => (
          <button key={role} onClick={() => setActiveRole(role)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              activeRole === role
                ? "bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300 border border-primary-200 dark:border-primary-800"
                : "bg-surface-secondary/50 text-text-secondary hover:text-text-primary border border-transparent hover:border-border/40"
            }`}>{role}</button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((e) => (
          <div key={e.id} className="rounded-xl border border-border/40 bg-surface p-5 hover:shadow-lg hover:shadow-primary-500/5 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-300 to-accent-300 dark:from-primary-600 dark:to-accent-600 flex items-center justify-center text-sm font-semibold text-white">{e.avatar}</div>
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium ${
                e.status === "Active" ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400" :
                e.status === "On Leave" ? "bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400" :
                "bg-slate-50 text-slate-500 dark:bg-slate-900/20 dark:text-slate-400"
              }`}>{e.status}</span>
            </div>
            <h3 className="text-base font-semibold text-text-primary">{e.name}</h3>
            <p className="text-sm text-primary-600 dark:text-primary-400 font-medium">{e.role}</p>
            <p className="text-xs text-text-tertiary mt-0.5">{e.specialty}</p>
            <div className="mt-4 pt-4 border-t border-border/30 space-y-2">
              <p className="text-xs text-text-secondary flex items-center gap-1.5"><Mail className="h-3 w-3 text-text-tertiary" /> {e.email}</p>
              <p className="text-xs text-text-secondary flex items-center gap-1.5"><Phone className="h-3 w-3 text-text-tertiary" /> {e.phone}</p>
            </div>
          </div>
        ))}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add Employee">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">Full Name</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Dr. John Doe"
              className="w-full h-10 px-3 rounded-lg border border-border/60 bg-surface-secondary/50 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1.5">Email</label>
              <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="john@clinic.com"
                className="w-full h-10 px-3 rounded-lg border border-border/60 bg-surface-secondary/50 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all" />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1.5">Phone</label>
              <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+1 (555) 000-0000"
                className="w-full h-10 px-3 rounded-lg border border-border/60 bg-surface-secondary/50 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">Role</label>
            <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full h-10 px-3 rounded-lg border border-border/60 bg-surface-secondary/50 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all appearance-none">
              {roles.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">Specialty</label>
            <input value={form.specialty} onChange={(e) => setForm({ ...form, specialty: e.target.value })} placeholder="e.g. Dentistry"
              className="w-full h-10 px-3 rounded-lg border border-border/60 bg-surface-secondary/50 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all" />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" size="md" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button variant="primary" size="md" onClick={handleAdd} disabled={!form.name || !form.email}>Add Employee</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
