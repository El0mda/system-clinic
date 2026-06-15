"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/dashboard/theme-provider";

const tabs = ["General", "Notifications", "Security"];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("General");
  const { theme, setTheme } = useTheme();
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-text-primary">Settings</h1>
        <p className="text-sm text-text-secondary mt-1">Manage your clinic preferences</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl bg-surface-secondary/80 dark:bg-surface-tertiary/30 border border-border/40 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab
                ? "bg-surface text-text-primary shadow-sm"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="rounded-xl border border-border/40 bg-surface p-6 space-y-6"
      >
        {activeTab === "General" && (
          <>
            <div>
              <h3 className="text-base font-semibold text-text-primary mb-4">Clinic Information</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-text-secondary">Clinic Name</label>
                  <input defaultValue="HealthERP Medical Center" className="w-full h-10 px-3 rounded-lg border border-border/60 bg-surface-secondary/50 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-text-secondary">Clinic Type</label>
                  <select defaultValue="Dental" className="w-full h-10 px-3 rounded-lg border border-border/60 bg-surface-secondary/50 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all appearance-none">
                    <option>Dental</option>
                    <option>Medical</option>
                    <option>Physiotherapy</option>
                    <option>Beauty</option>
                    <option>General</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-text-secondary">Email</label>
                  <input defaultValue="contact@healtherp.com" className="w-full h-10 px-3 rounded-lg border border-border/60 bg-surface-secondary/50 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-text-secondary">Phone</label>
                  <input defaultValue="+1 (555) 000-0000" className="w-full h-10 px-3 rounded-lg border border-border/60 bg-surface-secondary/50 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all" />
                </div>
              </div>
            </div>
            <div className="pt-4 border-t border-border/30">
              <h3 className="text-base font-semibold text-text-primary mb-4">Appearance</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-text-primary">Dark Mode</p>
                  <p className="text-xs text-text-tertiary">Toggle between light and dark theme</p>
                </div>
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className={`relative w-11 h-6 rounded-full transition-colors ${theme === "dark" ? "bg-primary-600" : "bg-border"}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${theme === "dark" ? "translate-x-5" : ""}`} />
                </button>
              </div>
            </div>
          </>
        )}

        {activeTab === "Notifications" && (
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-text-primary mb-4">Notification Preferences</h3>
            {[
              { label: "New Appointment", desc: "When a patient books a new appointment" },
              { label: "Cancellations", desc: "When an appointment is cancelled" },
              { label: "Invoice Payments", desc: "When an invoice is paid or overdue" },
              { label: "Low Stock Alerts", desc: "When inventory items run low" },
              { label: "New Patient Registration", desc: "When a new patient registers" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium text-text-primary">{item.label}</p>
                  <p className="text-xs text-text-tertiary">{item.desc}</p>
                </div>
                <div className="relative w-11 h-6 rounded-full bg-primary-600 cursor-pointer">
                  <span className="absolute top-0.5 left-[22px] w-5 h-5 rounded-full bg-white shadow-sm" />
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "Security" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-semibold text-text-primary mb-4">Change Password</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-text-secondary">Current Password</label>
                  <input type="password" placeholder="••••••••" className="w-full h-10 px-3 rounded-lg border border-border/60 bg-surface-secondary/50 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-text-secondary">New Password</label>
                  <input type="password" placeholder="••••••••" className="w-full h-10 px-3 rounded-lg border border-border/60 bg-surface-secondary/50 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all" />
                </div>
              </div>
            </div>
            <div className="pt-4 border-t border-border/30">
              <h3 className="text-base font-semibold text-text-primary mb-4">Two-Factor Authentication</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-text-primary">2FA via Email</p>
                  <p className="text-xs text-text-tertiary">Receive verification codes via email</p>
                </div>
                <div className="relative w-11 h-6 rounded-full bg-border cursor-pointer">
                  <span className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm" />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-border/30 flex justify-end">
          <Button variant="primary" size="md" onClick={handleSave}>
            <Save className="h-4 w-4" />
            {saved ? "Saved!" : "Save Changes"}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
