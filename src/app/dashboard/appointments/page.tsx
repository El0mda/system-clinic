"use client";

import { useState } from "react";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { appointments as initialAppointments, patients, employees } from "@/lib/dashboard-data";
import type { Appointment } from "@/lib/dashboard-data";
import { useLanguage } from "@/components/i18n/language-provider";

const serviceOptions = ["Dental Cleaning", "Root Canal", "Teeth Whitening", "General Checkup", "Physiotherapy", "Facial Treatment", "Massage Therapy", "Skin Consultation"];

const statusColors: Record<string, string> = {
  Completed: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400",
  "In Progress": "bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400",
  Confirmed: "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
  Cancelled: "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400",
  Pending: "bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400",
};

export default function AppointmentsPage() {
  const { t, tArr, lang } = useLanguage();
  const weekDays = tArr("enums.weekDays");
  const localeCode = lang === "ar" ? "ar-EG" : "en-US";
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [weekStart, setWeekStart] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - d.getDay());
    return d;
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ patientName: "", service: "Dental Cleaning", doctor: "", date: "", time: "", duration: "30" });

  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(weekStart.getDate() + i);
    return d;
  });

  const hours = Array.from({ length: 10 }, (_, i) => `${(i + 8).toString().padStart(2, "0")}:00`);
  const today = new Date().toDateString();

  const handleAdd = () => {
    const patient = patients.find((p) => p.name === form.patientName);
    const newAppt: Appointment = {
      id: crypto.randomUUID(),
      patientName: form.patientName,
      patientAvatar: patient?.avatar || form.patientName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2),
      service: form.service,
      doctor: form.doctor || "Dr. Williams",
      date: form.date || dates[0].toISOString().slice(0, 10),
      time: form.time || "09:00",
      duration: parseInt(form.duration) || 30,
      status: "Confirmed",
    };
    setAppointments((prev) => [...prev, newAppt]);
    setModalOpen(false);
    setForm({ patientName: "", service: "Dental Cleaning", doctor: "", date: "", time: "", duration: "30" });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-text-primary">{t("appointments.title")}</h1>
          <p className="text-sm text-text-secondary mt-1">{appointments.length} {t("appointments.thisWeek")}</p>
        </div>
        <Button variant="primary" size="md" onClick={() => setModalOpen(true)}>
          <Plus className="h-4 w-4" />
          {t("appointments.newAppointment")}
        </Button>
      </div>

      {/* Week navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button className="h-9 w-9 rounded-lg border border-border/40 flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-surface-secondary transition-colors"
            onClick={() => { const d = new Date(weekStart); d.setDate(d.getDate() - 7); setWeekStart(d); }}>
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button className="h-9 w-9 rounded-lg border border-border/40 flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-surface-secondary transition-colors"
            onClick={() => { const d = new Date(weekStart); d.setDate(d.getDate() + 7); setWeekStart(d); }}>
            <ChevronRight className="h-4 w-4" />
          </button>
          <span className="text-sm font-medium text-text-primary mx-2">
            {dates[0].toLocaleDateString(localeCode, { month: "long", day: "numeric" })} — {dates[6].toLocaleDateString(localeCode, { month: "long", day: "numeric", year: "numeric" })}
          </span>
        </div>
        <Button variant="outline" size="sm" onClick={() => { const d = new Date(); d.setDate(d.getDate() - d.getDay()); setWeekStart(d); }}>{t("common.today")}</Button>
      </div>

      {/* Calendar grid */}
      <div className="rounded-xl border border-border/40 bg-surface overflow-hidden">
        <div className="grid grid-cols-8 border-b border-border/30">
          <div className="p-3 border-r border-border/30" />
          {dates.map((d) => {
            const isToday = d.toDateString() === today;
            return (
              <div key={d.toISOString()} className={`p-3 text-center border-r border-border/30 last:border-r-0 ${isToday ? "bg-primary-50/50 dark:bg-primary-900/10" : ""}`}>
                <p className="text-xs text-text-tertiary">{weekDays[d.getDay()]}</p>
                <p className={`text-lg font-semibold mt-0.5 ${isToday ? "text-primary-600" : "text-text-primary"}`}>{d.getDate()}</p>
              </div>
            );
          })}
        </div>

        <div className="overflow-y-auto max-h-[500px]">
          {hours.map((hour) => {
            const slotApps = appointments.filter((a) => a.time.startsWith(hour.slice(0, 2)));
            return (
              <div key={hour} className="grid grid-cols-8 border-b border-border/20 last:border-0">
                <div className="p-3 border-r border-border/20 text-xs text-text-tertiary flex items-start justify-center pt-3">{hour}</div>
                {dates.map((d) => {
                  const dateStr = d.toISOString().slice(0, 10);
                  const dayApps = slotApps.filter((a) => a.date === dateStr);
                  return (
                    <div key={d.toISOString()} className="p-1.5 border-r border-border/20 last:border-r-0 min-h-[60px]">
                      {dayApps.map((a) => (
                        <div key={a.id} className={`rounded-lg p-2 mb-1 text-xs cursor-pointer transition-transform hover:scale-[1.02] ${statusColors[a.status] || statusColors.Pending}`}>
                          <p className="font-medium">{a.patientName}</p>
                          <p className="opacity-70">{t(`enums.service.${a.service}`, a.service)} · {a.time}</p>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={t("appointments.newAppointment")}>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">{t("appointments.patient")}</label>
            <select value={form.patientName} onChange={(e) => setForm({ ...form, patientName: e.target.value })}
              className="w-full h-10 px-3 rounded-lg border border-border/60 bg-surface-secondary/50 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all appearance-none">
              <option value="">{t("appointments.selectPatient")}</option>
              {patients.map((p) => <option key={p.id} value={p.name}>{p.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">{t("appointments.service")}</label>
            <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}
              className="w-full h-10 px-3 rounded-lg border border-border/60 bg-surface-secondary/50 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all appearance-none">
              {serviceOptions.map((s) => <option key={s} value={s}>{t(`enums.service.${s}`, s)}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">{t("appointments.doctor")}</label>
            <select value={form.doctor} onChange={(e) => setForm({ ...form, doctor: e.target.value })}
              className="w-full h-10 px-3 rounded-lg border border-border/60 bg-surface-secondary/50 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all appearance-none">
              <option value="">{t("appointments.selectDoctor")}</option>
              {employees.filter((e) => e.role === "Doctor").map((doc) => (
                <option key={doc.id} value={doc.name}>{doc.name}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1.5">{t("appointments.date")}</label>
              <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full h-10 px-3 rounded-lg border border-border/60 bg-surface-secondary/50 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all" />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1.5">{t("appointments.time")}</label>
              <input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })}
                className="w-full h-10 px-3 rounded-lg border border-border/60 bg-surface-secondary/50 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">{t("appointments.duration")}</label>
            <select value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })}
              className="w-full h-10 px-3 rounded-lg border border-border/60 bg-surface-secondary/50 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all appearance-none">
              <option value="15">15 {t("appointments.min")}</option>
              <option value="30">30 {t("appointments.min")}</option>
              <option value="45">45 {t("appointments.min")}</option>
              <option value="60">60 {t("appointments.min")}</option>
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" size="md" onClick={() => setModalOpen(false)}>{t("common.cancel")}</Button>
            <Button variant="primary" size="md" onClick={handleAdd} disabled={!form.patientName}>{t("appointments.schedule")}</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
