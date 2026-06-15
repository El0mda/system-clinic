"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/dashboard/theme-provider";
import { useLanguage } from "@/components/i18n/language-provider";

export default function SettingsPage() {
  const { t, lang, setLang } = useLanguage();
  const tabs = [
    { id: "General", label: t("settings.tabs.general") },
    { id: "Notifications", label: t("settings.tabs.notifications") },
    { id: "Security", label: t("settings.tabs.security") },
  ];
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
        <h1 className="text-2xl sm:text-3xl font-semibold text-text-primary">{t("settings.title")}</h1>
        <p className="text-sm text-text-secondary mt-1">{t("settings.subtitle")}</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl bg-surface-secondary/80 dark:bg-surface-tertiary/30 border border-border/40 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id
                ? "bg-surface text-text-primary shadow-sm"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            {tab.label}
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
              <h3 className="text-base font-semibold text-text-primary mb-4">{t("settings.clinicInformation")}</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-text-secondary">{t("settings.clinicName")}</label>
                  <input defaultValue="HealthERP Medical Center" className="w-full h-10 px-3 rounded-lg border border-border/60 bg-surface-secondary/50 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-text-secondary">{t("settings.clinicType")}</label>
                  <select defaultValue="Dental" className="w-full h-10 px-3 rounded-lg border border-border/60 bg-surface-secondary/50 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all appearance-none">
                    <option value="Dental">{t("enums.category.Dental")}</option>
                    <option value="Medical">{t("enums.category.Medical")}</option>
                    <option value="Physiotherapy">{t("enums.category.Physiotherapy")}</option>
                    <option value="Beauty">{t("enums.category.Beauty")}</option>
                    <option value="General">{t("enums.category.General")}</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-text-secondary">{t("settings.email")}</label>
                  <input defaultValue="contact@healtherp.com" className="w-full h-10 px-3 rounded-lg border border-border/60 bg-surface-secondary/50 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-text-secondary">{t("settings.phone")}</label>
                  <input defaultValue="+1 (555) 000-0000" className="w-full h-10 px-3 rounded-lg border border-border/60 bg-surface-secondary/50 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all" />
                </div>
              </div>
            </div>
            <div className="pt-4 border-t border-border/30 space-y-5">
              <h3 className="text-base font-semibold text-text-primary">{t("settings.appearance")}</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-text-primary">{t("settings.darkMode")}</p>
                  <p className="text-xs text-text-tertiary">{t("settings.darkModeDesc")}</p>
                </div>
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className={`relative w-11 h-6 rounded-full transition-colors ${theme === "dark" ? "bg-primary-600" : "bg-border"}`}
                >
                  <span className={`absolute top-0.5 left-0.5 rtl:left-auto rtl:right-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${theme === "dark" ? "translate-x-5 rtl:-translate-x-5" : ""}`} />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-text-primary">{t("settings.language")}</p>
                  <p className="text-xs text-text-tertiary">{t("settings.languageDesc")}</p>
                </div>
                <div className="flex gap-1 p-1 rounded-lg bg-surface-secondary/80 dark:bg-surface-tertiary/30 border border-border/40">
                  {(["en", "ar"] as const).map((l) => (
                    <button
                      key={l}
                      onClick={() => setLang(l)}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                        lang === l ? "bg-surface text-text-primary shadow-sm" : "text-text-secondary hover:text-text-primary"
                      }`}
                    >
                      {l === "en" ? "English" : "العربية"}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === "Notifications" && (
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-text-primary mb-4">{t("settings.notificationPreferences")}</h3>
            {["newAppointment", "cancellations", "invoicePayments", "lowStock", "newPatient"].map((key) => (
              <div key={key} className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium text-text-primary">{t(`settings.notifications.${key}.label`)}</p>
                  <p className="text-xs text-text-tertiary">{t(`settings.notifications.${key}.desc`)}</p>
                </div>
                <div className="relative w-11 h-6 rounded-full bg-primary-600 cursor-pointer">
                  <span className="absolute top-0.5 left-[22px] rtl:left-auto rtl:right-[22px] w-5 h-5 rounded-full bg-white shadow-sm" />
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "Security" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-semibold text-text-primary mb-4">{t("settings.changePassword")}</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-text-secondary">{t("settings.currentPassword")}</label>
                  <input type="password" placeholder="••••••••" className="w-full h-10 px-3 rounded-lg border border-border/60 bg-surface-secondary/50 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-text-secondary">{t("settings.newPassword")}</label>
                  <input type="password" placeholder="••••••••" className="w-full h-10 px-3 rounded-lg border border-border/60 bg-surface-secondary/50 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all" />
                </div>
              </div>
            </div>
            <div className="pt-4 border-t border-border/30">
              <h3 className="text-base font-semibold text-text-primary mb-4">{t("settings.twoFactor")}</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-text-primary">{t("settings.twoFactorEmail")}</p>
                  <p className="text-xs text-text-tertiary">{t("settings.twoFactorDesc")}</p>
                </div>
                <div className="relative w-11 h-6 rounded-full bg-border cursor-pointer">
                  <span className="absolute top-0.5 left-0.5 rtl:left-auto rtl:right-0.5 w-5 h-5 rounded-full bg-white shadow-sm" />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-border/30 flex justify-end">
          <Button variant="primary" size="md" onClick={handleSave}>
            <Save className="h-4 w-4" />
            {saved ? t("common.saved") : t("common.saveChanges")}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
