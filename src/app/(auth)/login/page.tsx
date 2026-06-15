"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowRight, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/dashboard/auth-provider";
import { useT } from "@/components/i18n/language-provider";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const t = useT();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login({ email, password });
      router.push("/dashboard");
    } catch {
      setError(t("auth.invalidCredentials"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
      className="relative w-full max-w-[420px] mx-4"
    >
      <div className="rounded-2xl border border-border/50 bg-surface/90 backdrop-blur-xl p-8 shadow-2xl shadow-primary-500/5">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2.5 mb-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 shadow-lg">
            <span className="text-white font-bold text-lg">H</span>
          </div>
          <span className="font-semibold text-xl tracking-tight text-text-primary">
            Health<span className="text-primary-600">ERP</span>
          </span>
        </div>

        <h1 className="text-2xl font-semibold text-text-primary text-center mb-1">{t("auth.welcomeBack")}</h1>
        <p className="text-sm text-text-secondary text-center mb-8">{t("auth.signInSubtitle")}</p>

        {error && (
          <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/50 text-sm text-red-600 dark:text-red-400 text-center mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">{t("auth.email")}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("auth.emailPlaceholder")}
              required
              className="w-full h-11 px-4 rounded-xl border border-border/60 bg-surface text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">{t("auth.password")}</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t("auth.passwordPlaceholder")}
                required
                minLength={6}
                className="w-full h-11 px-4 pr-11 rtl:pr-4 rtl:pl-11 rounded-xl border border-border/60 bg-surface text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-primary"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-border/60 text-primary-600 focus:ring-primary-500/30" />
              <span className="text-xs text-text-secondary">{t("auth.rememberMe")}</span>
            </label>
            <a href="#" className="text-xs font-medium text-primary-600 hover:text-primary-700">{t("auth.forgotPassword")}</a>
          </div>

          <Button type="submit" variant="primary" size="lg" className="w-full" disabled={loading}>
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                {t("auth.signingIn")}
              </span>
            ) : (
              <span className="flex items-center gap-2">
                {t("auth.signIn")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </span>
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-text-tertiary">
            {t("auth.noAccount")}{" "}
            <Link href="/register" className="text-primary-600 font-medium hover:text-primary-700">
              {t("auth.createOne")}
            </Link>
          </p>
        </div>

        <div className="mt-6 pt-6 border-t border-border/30 flex items-center justify-center gap-2 text-xs text-text-tertiary">
          <Shield className="h-3 w-3" />
          {t("auth.secured")}
        </div>
      </div>
    </motion.div>
  );
}
