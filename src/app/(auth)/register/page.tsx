"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/dashboard/auth-provider";
import { useT } from "@/components/i18n/language-provider";

const clinicTypes = [
  { value: "dental", labelKey: "auth.clinicTypes.dental", icon: "🦷" },
  { value: "beauty", labelKey: "auth.clinicTypes.beauty", icon: "💅" },
  { value: "physio", labelKey: "auth.clinicTypes.physio", icon: "🏃" },
  { value: "general", labelKey: "auth.clinicTypes.general", icon: "🏥" },
];

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const t = useT();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", password: "",
    confirmPassword: "", clinicName: "", clinicType: "", phone: "",
  });

  const update = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
        confirmPassword: form.password,
        clinicName: form.clinicName,
        clinicType: form.clinicType,
        phone: form.phone,
      });
      router.push("/dashboard");
    } catch {
      // handled by mock
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
      className="relative w-full max-w-[460px] mx-4"
    >
      <div className="rounded-2xl border border-border/50 bg-surface/90 backdrop-blur-xl p-8 shadow-2xl shadow-primary-500/5">
        <div className="flex items-center justify-center gap-2.5 mb-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 shadow-lg">
            <span className="text-white font-bold text-lg">H</span>
          </div>
          <span className="font-semibold text-xl tracking-tight text-text-primary">
            Health<span className="text-primary-600">ERP</span>
          </span>
        </div>

        {/* Steps */}
        <div className="flex items-center gap-2 mb-8 justify-center">
          {[1, 2].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                step >= s ? "bg-primary-600 text-white" : "bg-surface-tertiary text-text-tertiary"
              }`}>{s}</div>
              {s < 2 && <div className={`w-10 h-0.5 transition-colors ${step > s ? "bg-primary-500" : "bg-border"}`} />}
            </div>
          ))}
        </div>

        <form onSubmit={handleRegister}>
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              <h2 className="text-xl font-semibold text-text-primary text-center">{t("auth.createAccount")}</h2>
              <p className="text-sm text-text-secondary text-center mb-6">{t("auth.setupMinutes")}</p>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1.5">{t("auth.firstName")}</label>
                  <input value={form.firstName} onChange={(e) => update("firstName", e.target.value)} placeholder="John" required className="w-full h-11 px-4 rounded-xl border border-border/60 bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1.5">{t("auth.lastName")}</label>
                  <input value={form.lastName} onChange={(e) => update("lastName", e.target.value)} placeholder="Doe" required className="w-full h-11 px-4 rounded-xl border border-border/60 bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">{t("auth.email")}</label>
                <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder={t("auth.emailPlaceholder")} required className="w-full h-11 px-4 rounded-xl border border-border/60 bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all" />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">{t("auth.phone")}</label>
                <input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+1 (555) 000-0000" required className="w-full h-11 px-4 rounded-xl border border-border/60 bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all" />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">{t("auth.password")}</label>
                <input type="password" value={form.password} onChange={(e) => update("password", e.target.value)} placeholder={t("auth.passwordMin")} required minLength={8} className="w-full h-11 px-4 rounded-xl border border-border/60 bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all" />
              </div>

              <Button type="button" variant="primary" size="lg" className="w-full mt-2" onClick={() => setStep(2)}>
                {t("common.continue")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              <h2 className="text-xl font-semibold text-text-primary text-center">{t("auth.clinicDetails")}</h2>
              <p className="text-sm text-text-secondary text-center mb-6">{t("auth.tellUsAboutPractice")}</p>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">{t("auth.clinicName")}</label>
                <input value={form.clinicName} onChange={(e) => update("clinicName", e.target.value)} placeholder="BrightSmile Dental" required className="w-full h-11 px-4 rounded-xl border border-border/60 bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all" />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-3">{t("auth.clinicType")}</label>
                <div className="grid grid-cols-2 gap-3">
                  {clinicTypes.map((ct) => (
                    <button
                      key={ct.value}
                      type="button"
                      onClick={() => update("clinicType", ct.value)}
                      className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-sm font-medium transition-all ${
                        form.clinicType === ct.value
                          ? "border-primary-400 bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300"
                          : "border-border/60 hover:border-primary-200 text-text-secondary hover:text-text-primary"
                      }`}
                    >
                      <span className="text-xl">{ct.icon}</span>
                      {t(ct.labelKey)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button type="button" variant="outline" size="lg" className="flex-1" onClick={() => setStep(1)}>
                  {t("common.back")}
                </Button>
                <Button type="submit" variant="primary" size="lg" className="flex-1" disabled={loading}>
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {t("auth.creating")}
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      {t("auth.createAccountBtn")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                    </span>
                  )}
                </Button>
              </div>
            </motion.div>
          )}
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-text-tertiary">
            {t("auth.haveAccount")}{" "}
            <Link href="/login" className="text-primary-600 font-medium hover:text-primary-700">
              {t("auth.signIn")}
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
