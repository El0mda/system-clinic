"use client";

import { useState } from "react";
import { Search, Plus, User, CalendarDays, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useT } from "@/components/i18n/language-provider";

interface TreatmentPlan {
  id: string;
  client: string;
  goal: string;
  category: string;
  sessionsDone: number;
  sessionsTotal: number;
  startDate: string;
  status: "Active" | "Completed" | "Paused";
}

const initialPlans: TreatmentPlan[] = [
  { id: "tp1", client: "Layla Hassan", goal: "Acne & skin renewal", category: "Skin", sessionsDone: 3, sessionsTotal: 6, startDate: "2026-04-02", status: "Active" },
  { id: "tp2", client: "Mona Adel", goal: "Full-leg laser hair removal", category: "Laser", sessionsDone: 5, sessionsTotal: 8, startDate: "2026-02-18", status: "Active" },
  { id: "tp3", client: "Sara Khaled", goal: "Bridal package — hair, skin & makeup", category: "Makeup", sessionsDone: 2, sessionsTotal: 4, startDate: "2026-05-10", status: "Active" },
  { id: "tp4", client: "Nour Ibrahim", goal: "Anti-cellulite body program", category: "Body Treatments", sessionsDone: 10, sessionsTotal: 10, startDate: "2026-01-08", status: "Completed" },
  { id: "tp5", client: "Dina Tarek", goal: "Keratin & scalp recovery", category: "Hair", sessionsDone: 1, sessionsTotal: 3, startDate: "2026-06-01", status: "Paused" },
];

const statusStyles: Record<TreatmentPlan["status"], string> = {
  Active: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400",
  Completed: "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
  Paused: "bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400",
};

export default function TreatmentPlansPage() {
  const t = useT();
  const [plans] = useState<TreatmentPlan[]>(initialPlans);
  const [search, setSearch] = useState("");

  const filtered = plans.filter((p) =>
    p.client.toLowerCase().includes(search.toLowerCase()) ||
    p.goal.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-text-primary">
            {t("treatmentPlans.title", "Treatment Plans")}
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            {plans.length} {t("treatmentPlans.subtitle", "client treatment plans")}
          </p>
        </div>
        <Button variant="primary" size="md">
          <Plus className="h-4 w-4" /> {t("treatmentPlans.add", "New Plan")}
        </Button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3.5 rtl:left-auto rtl:right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t("treatmentPlans.searchPlaceholder", "Search plans...")}
          className="w-full h-11 pl-10 pr-4 rtl:pl-4 rtl:pr-10 rounded-xl border border-border/60 bg-surface text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all"
        />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((p) => {
          const pct = Math.round((p.sessionsDone / p.sessionsTotal) * 100);
          return (
            <div key={p.id} className="rounded-xl border border-border/40 bg-surface p-5 hover:shadow-lg hover:shadow-primary-500/5 transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary-400 to-accent-400 text-white">
                    <User className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-text-primary leading-tight">{p.client}</h3>
                    <span className="text-xs text-text-tertiary flex items-center gap-1">
                      <Layers className="h-3 w-3" /> {t(`enums.category.${p.category}`, p.category)}
                    </span>
                  </div>
                </div>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium ${statusStyles[p.status]}`}>
                  {t(`treatmentPlans.status.${p.status}`, p.status)}
                </span>
              </div>

              <p className="text-sm text-text-secondary mb-4">{p.goal}</p>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-text-tertiary">
                  <span>{t("treatmentPlans.progress", "Sessions")}</span>
                  <span>{p.sessionsDone}/{p.sessionsTotal}</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-surface-tertiary overflow-hidden">
                  <div className="h-full rounded-full bg-primary-500 transition-all" style={{ width: `${pct}%` }} />
                </div>
              </div>

              <div className="mt-4 flex items-center gap-1.5 text-xs text-text-tertiary">
                <CalendarDays className="h-3.5 w-3.5" />
                {t("treatmentPlans.started", "Started")} {p.startDate}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
