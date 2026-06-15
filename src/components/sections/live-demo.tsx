"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  Calendar,
  DollarSign,
  Activity,
  ArrowUp,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { AnimatedNumber } from "@/components/ui/animated-number";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "appointments", label: "Schedule" },
  { id: "revenue", label: "Revenue" },
];

const tabContent = {
  overview: {
    kpis: [
      { label: "Total Patients", value: 2847, prefix: "", suffix: "", change: "+12.5%", icon: Activity },
      { label: "Monthly Revenue", value: 48200, prefix: "$", suffix: "", change: "+23.1%", icon: DollarSign },
      { label: "Appointments", value: 1156, prefix: "", suffix: "", change: "+8.3%", icon: Calendar },
      { label: "Growth Rate", value: 94, prefix: "", suffix: "%", change: "+5.2%", icon: TrendingUp },
    ],
  },
  appointments: {
    items: [
      { patient: "Sarah Johnson", time: "09:00 AM", doctor: "Dr. Williams", status: "Completed", type: "Check-up" },
      { patient: "Michael Chen", time: "10:30 AM", doctor: "Dr. Patel", status: "In Progress", type: "Cleaning" },
      { patient: "Emily Rodriguez", time: "11:45 AM", doctor: "Dr. Williams", status: "Confirmed", type: "Consultation" },
      { patient: "David Kim", time: "02:00 PM", doctor: "Dr. Patel", status: "Confirmed", type: "Surgery Prep" },
      { patient: "Lisa Thompson", time: "03:30 PM", doctor: "Dr. Williams", status: "Pending", type: "Follow-up" },
    ],
  },
  revenue: {
    months: [
      { month: "Jan", revenue: 32000 },
      { month: "Feb", revenue: 35000 },
      { month: "Mar", revenue: 38000 },
      { month: "Apr", revenue: 42000 },
      { month: "May", revenue: 45000 },
      { month: "Jun", revenue: 48200 },
    ],
  },
};

export function LiveDemo() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <section id="demo" className="relative py-20 sm:py-28 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-surface-secondary/50 to-white pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Live Demo"
          title="See it in action"
          description="Explore the dashboard interface with real-time data visualization and intuitive controls."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 sm:mt-16"
        >
          {/* Tab bar */}
          <div className="flex items-center justify-center mb-8">
            <div className="inline-flex items-center gap-1 rounded-xl bg-surface-tertiary/70 p-1 border border-border/40">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-4 sm:px-5 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    activeTab === tab.id
                      ? "text-white"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-primary-600 rounded-lg shadow-sm"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab content */}
          <div className="relative rounded-2xl border border-border/50 bg-surface shadow-xl shadow-primary-500/5 overflow-hidden">
            {/* Mockup browser bar */}
            <div className="flex items-center gap-2 px-5 py-3 border-b border-border/30 bg-surface-secondary/40">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="flex items-center gap-2 px-4 py-1 rounded-md bg-surface border border-border/30 text-xs text-text-tertiary">
                  <span className="w-3 h-3 rounded-full bg-emerald-400" />
                  app.healtherp.com/dashboard
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-6 lg:p-8">
              <AnimatePresence mode="wait">
                {activeTab === "overview" && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      {tabContent.overview.kpis.map((kpi) => {
                        const Icon = kpi.icon;
                        return (
                          <div
                            key={kpi.label}
                            className="rounded-xl bg-surface-secondary/70 border border-border/40 p-4 sm:p-5 hover:shadow-md transition-shadow"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-xs sm:text-sm text-text-tertiary font-medium">
                                {kpi.label}
                              </span>
                              <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center">
                                <Icon className="w-4 h-4 text-primary-600" />
                              </div>
                            </div>
                            <div className="text-xl sm:text-2xl lg:text-3xl font-semibold text-text-primary">
                              <AnimatedNumber
                                value={kpi.value}
                                prefix={kpi.prefix}
                                suffix={kpi.suffix}
                              />
                            </div>
                            <div className="flex items-center gap-1 mt-1.5">
                              <ArrowUp className="w-3 h-3 text-emerald-500" />
                              <span className="text-xs font-medium text-emerald-600">
                                {kpi.change}
                              </span>
                              <span className="text-xs text-text-tertiary">vs last month</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {activeTab === "appointments" && (
                  <motion.div
                    key="appointments"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border/40">
                            <th className="text-left text-xs font-semibold text-text-tertiary uppercase tracking-wider pb-3 pr-4">
                              Patient
                            </th>
                            <th className="text-left text-xs font-semibold text-text-tertiary uppercase tracking-wider pb-3 pr-4">
                              Time
                            </th>
                            <th className="text-left text-xs font-semibold text-text-tertiary uppercase tracking-wider pb-3 pr-4">
                              Doctor
                            </th>
                            <th className="text-left text-xs font-semibold text-text-tertiary uppercase tracking-wider pb-3 pr-4">
                              Type
                            </th>
                            <th className="text-right text-xs font-semibold text-text-tertiary uppercase tracking-wider pb-3">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {tabContent.appointments.items.map((appt) => (
                            <tr key={appt.patient} className="border-b border-border/20 last:border-0">
                              <td className="py-3 pr-4">
                                <div className="flex items-center gap-2.5">
                                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-200 to-accent-200 flex items-center justify-center text-xs font-medium text-primary-700">
                                    {appt.patient.split(" ").map(n => n[0]).join("")}
                                  </div>
                                  <span className="text-sm font-medium text-text-primary">
                                    {appt.patient}
                                  </span>
                                </div>
                              </td>
                              <td className="py-3 pr-4 text-sm text-text-secondary">{appt.time}</td>
                              <td className="py-3 pr-4 text-sm text-text-secondary">{appt.doctor}</td>
                              <td className="py-3 pr-4 text-sm text-text-secondary">{appt.type}</td>
                              <td className="py-3 text-right">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  appt.status === "Completed" ? "bg-emerald-50 text-emerald-700" :
                                  appt.status === "In Progress" ? "bg-primary-50 text-primary-700" :
                                  appt.status === "Confirmed" ? "bg-blue-50 text-blue-700" :
                                  "bg-amber-50 text-amber-700"
                                }`}>
                                  {appt.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                )}

                {activeTab === "revenue" && (
                  <motion.div
                    key="revenue"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-end gap-3 sm:gap-4 h-48 sm:h-56">
                      {tabContent.revenue.months.map((month) => {
                        const maxRevenue = Math.max(...tabContent.revenue.months.map(m => m.revenue));
                        const height = (month.revenue / maxRevenue) * 100;
                        return (
                          <div key={month.month} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                            <span className="text-xs font-medium text-text-secondary">
                              ${(month.revenue / 1000).toFixed(0)}k
                            </span>
                            <motion.div
                              initial={{ height: 0 }}
                              whileInView={{ height: `${height}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
                              className="w-full max-w-[48px] rounded-lg bg-gradient-to-t from-primary-500 to-accent-400 hover:from-primary-400 hover:to-accent-300 transition-all cursor-pointer relative group"
                            >
                              <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-primary-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </motion.div>
                            <span className="text-xs font-medium text-text-tertiary">
                              {month.month}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
