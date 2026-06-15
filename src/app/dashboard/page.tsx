"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
import {
  ArrowUp, ArrowDown, Users, Calendar, DollarSign, UsersRound,
  Activity, Plus, Download, TrendingUp,
} from "lucide-react";
import { kpiCards, revenueData, activities, appointments } from "@/lib/dashboard-data";
import { AnimatedNumber } from "@/components/ui/animated-number";

const icons = { Users, Calendar, DollarSign, UsersRound };

/* Per-metric accent palette so KPI cards read as distinct, scannable tiles. */
const accents = [
  { icon: "bg-primary-50 text-primary-600 dark:bg-primary-900/25 dark:text-primary-300", bar: "bg-primary-500" },
  { icon: "bg-blue-50 text-blue-600 dark:bg-blue-900/25 dark:text-blue-400", bar: "bg-blue-500" },
  { icon: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/25 dark:text-emerald-400", bar: "bg-emerald-500" },
  { icon: "bg-accent-50 text-accent-600 dark:bg-accent-700/25 dark:text-accent-300", bar: "bg-accent-500" },
];

export default function DashboardHome() {
  const kpisRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!kpisRef.current) return;
    const cards = kpisRef.current.querySelectorAll(".kpi-card");
    gsap.fromTo(cards,
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power3.out" }
    );
  }, []);

  const maxRevenue = Math.max(...revenueData.map((r) => r.revenue));
  const totalRevenue = revenueData.reduce((s, r) => s + r.revenue, 0);
  const totalExpenses = revenueData.reduce((s, r) => s + r.expenses, 0);
  const netProfit = totalRevenue - totalExpenses;

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-text-primary">Dashboard</h1>
          <p className="text-sm text-text-secondary mt-1">
            Welcome back — here&apos;s what&apos;s happening at your clinic today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-border bg-surface text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface-tertiary transition-colors">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
          </button>
          <button className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-gradient-to-br from-primary-600 to-accent-600 text-sm font-medium text-white shadow-sm hover:shadow-md hover:from-primary-500 hover:to-accent-500 transition-all">
            <Plus className="h-4 w-4" />
            <span>New Appointment</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div ref={kpisRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((kpi, i) => {
          const Icon = icons[kpi.icon as keyof typeof icons] || Activity;
          const accent = accents[i % accents.length];
          return (
            <div
              key={kpi.label}
              className="kpi-card card-elevated relative overflow-hidden rounded-xl border border-border bg-surface p-5 transition-shadow"
            >
              <span className={`absolute left-0 top-0 h-full w-1 ${accent.bar}`} />
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-text-secondary font-medium">{kpi.label}</span>
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${accent.icon}`}>
                  <Icon className="w-[18px] h-[18px]" />
                </div>
              </div>
              <div className="text-2xl lg:text-3xl font-semibold tracking-tight text-text-primary">
                {kpi.value.startsWith("$") ? (
                  kpi.value
                ) : (
                  <AnimatedNumber value={parseInt(kpi.value.replace(/,/g, ""))} />
                )}
              </div>
              <div className="flex items-center gap-1.5 mt-2">
                <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-xs font-semibold ${
                  kpi.trend === "up"
                    ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/25 dark:text-emerald-400"
                    : "bg-red-50 text-red-700 dark:bg-red-900/25 dark:text-red-400"
                }`}>
                  {kpi.trend === "up" ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                  {kpi.change}%
                </span>
                <span className="text-xs text-text-tertiary">{kpi.changeLabel}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts + Activity */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 card-elevated rounded-xl border border-border bg-surface p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
            <div>
              <h3 className="text-base font-semibold text-text-primary">Revenue Overview</h3>
              <p className="text-xs text-text-tertiary mt-0.5">Last 6 months · revenue vs expenses</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-[11px] text-text-tertiary">Net profit</p>
                <p className="text-sm font-semibold text-text-primary">
                  ${(netProfit / 1000).toFixed(1)}k
                </p>
              </div>
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-emerald-50 text-emerald-700 dark:bg-emerald-900/25 dark:text-emerald-400 text-xs font-semibold">
                <TrendingUp className="w-3.5 h-3.5" /> +23.1%
              </span>
            </div>
          </div>

          {/* Plot area with gridlines */}
          <div className="relative h-44 sm:h-52">
            {[0, 25, 50, 75, 100].map((g) => (
              <div
                key={g}
                className="absolute left-0 right-0 border-t border-dashed border-border/60"
                style={{ bottom: `${g}%` }}
              />
            ))}
            <div className="relative flex items-end gap-2 sm:gap-4 h-full">
              {revenueData.map((item) => {
                const rHeight = (item.revenue / maxRevenue) * 100;
                const eHeight = (item.expenses / maxRevenue) * 100;
                return (
                  <div key={item.month} className="group flex-1 flex flex-col items-center justify-end h-full">
                    <div className="relative flex items-end justify-center gap-1 w-full h-full">
                      {/* tooltip */}
                      <div className="pointer-events-none absolute -top-1 left-1/2 -translate-x-1/2 -translate-y-full z-10 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap rounded-lg bg-text-primary px-2.5 py-1.5 text-[11px] font-medium text-surface shadow-lg">
                        <span className="block">Rev ${(item.revenue / 1000).toFixed(1)}k</span>
                        <span className="block opacity-70">Exp ${(item.expenses / 1000).toFixed(1)}k</span>
                      </div>
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${rHeight}%` }}
                        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                        className="w-full max-w-[20px] sm:max-w-[26px] rounded-t-md bg-gradient-to-t from-primary-600 to-primary-400 group-hover:from-primary-500 group-hover:to-primary-300 transition-colors"
                      />
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${eHeight}%` }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                        className="w-full max-w-[20px] sm:max-w-[26px] rounded-t-md bg-surface-tertiary group-hover:bg-border transition-colors"
                      />
                    </div>
                    <span className="mt-2 text-[11px] text-text-tertiary">{item.month}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-5 pt-4 border-t border-border text-xs text-text-tertiary">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-gradient-to-t from-primary-600 to-primary-400" /> Revenue
              <span className="font-medium text-text-secondary">${(totalRevenue / 1000).toFixed(0)}k</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-surface-tertiary border border-border" /> Expenses
              <span className="font-medium text-text-secondary">${(totalExpenses / 1000).toFixed(0)}k</span>
            </span>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card-elevated rounded-xl border border-border bg-surface p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-text-primary">Recent Activity</h3>
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <div className="space-y-1">
            {activities.map((act) => (
              <div key={act.id} className="flex items-start gap-3 rounded-lg -mx-2 px-2 py-2 hover:bg-surface-tertiary/60 transition-colors">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-200 to-accent-200 dark:from-primary-700 dark:to-accent-700 flex items-center justify-center text-[11px] font-semibold text-primary-700 dark:text-primary-100 shrink-0">
                  {act.avatar}
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-text-primary leading-snug">
                    <span className="font-medium">{act.user}</span>{" "}
                    {act.action}{" "}
                    <span className="font-medium text-primary-600 dark:text-primary-400">{act.target}</span>
                  </p>
                  <p className="text-xs text-text-tertiary mt-0.5">{act.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Today's Appointments */}
      <div className="card-elevated rounded-xl border border-border bg-surface overflow-hidden">
        <div className="flex items-center justify-between p-5 sm:p-6 pb-4">
          <div>
            <h3 className="text-base font-semibold text-text-primary">Today&apos;s Appointments</h3>
            <p className="text-xs text-text-tertiary mt-0.5">{appointments.length} scheduled</p>
          </div>
          <a href="/dashboard/appointments" className="text-xs font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400">View all</a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-y border-border bg-surface-secondary/60">
                <th className="text-left text-[11px] font-semibold text-text-tertiary uppercase tracking-wider py-2.5 px-5 sm:px-6">Patient</th>
                <th className="text-left text-[11px] font-semibold text-text-tertiary uppercase tracking-wider py-2.5 pr-4">Service</th>
                <th className="text-left text-[11px] font-semibold text-text-tertiary uppercase tracking-wider py-2.5 pr-4">Time</th>
                <th className="text-left text-[11px] font-semibold text-text-tertiary uppercase tracking-wider py-2.5 pr-4">Doctor</th>
                <th className="text-right text-[11px] font-semibold text-text-tertiary uppercase tracking-wider py-2.5 px-5 sm:px-6">Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.slice(0, 5).map((apt) => (
                <tr key={apt.id} className="border-b border-border last:border-0 hover:bg-surface-tertiary/40 transition-colors">
                  <td className="py-3 px-5 sm:px-6">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-200 to-accent-200 dark:from-primary-700 dark:to-accent-700 flex items-center justify-center text-[11px] font-semibold text-primary-700 dark:text-primary-100">
                        {apt.patientAvatar}
                      </div>
                      <span className="text-sm font-medium text-text-primary">{apt.patientName}</span>
                    </div>
                  </td>
                  <td className="py-3 pr-4 text-sm text-text-secondary">{apt.service}</td>
                  <td className="py-3 pr-4 text-sm text-text-secondary tabular-nums">{apt.time}</td>
                  <td className="py-3 pr-4 text-sm text-text-secondary">{apt.doctor}</td>
                  <td className="py-3 px-5 sm:px-6 text-right">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium ${
                      apt.status === "Completed" ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/25 dark:text-emerald-400" :
                      apt.status === "In Progress" ? "bg-primary-50 text-primary-700 dark:bg-primary-900/25 dark:text-primary-300" :
                      apt.status === "Confirmed" ? "bg-blue-50 text-blue-700 dark:bg-blue-900/25 dark:text-blue-400" :
                      apt.status === "Cancelled" ? "bg-red-50 text-red-700 dark:bg-red-900/25 dark:text-red-400" :
                      "bg-amber-50 text-amber-700 dark:bg-amber-900/25 dark:text-amber-400"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        apt.status === "Completed" ? "bg-emerald-500" :
                        apt.status === "In Progress" ? "bg-primary-500" :
                        apt.status === "Confirmed" ? "bg-blue-500" :
                        apt.status === "Cancelled" ? "bg-red-500" :
                        "bg-amber-500"
                      }`} />
                      {apt.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
