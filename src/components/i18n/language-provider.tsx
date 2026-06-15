"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { translations, type Lang } from "@/lib/i18n/translations";

type Dir = "ltr" | "rtl";

interface LanguageContextType {
  lang: Lang;
  dir: Dir;
  t: (key: string, fallback?: string) => string;
  tArr: <T = string>(key: string) => T[];
  setLang: (l: Lang) => void;
  toggle: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  dir: "ltr",
  t: (k) => k,
  tArr: () => [],
  setLang: () => {},
  toggle: () => {},
});

function resolve(dict: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, part) => {
    if (acc && typeof acc === "object" && part in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, dict);
}

function getInitialLang(): Lang {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem("lang");
      if (stored === "ar" || stored === "en") return stored;
    } catch {}
  }
  return "en";
}

function applyDocumentLang(lang: Lang) {
  if (typeof document === "undefined") return;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitialLang);

  useEffect(() => {
    applyDocumentLang(lang);
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    applyDocumentLang(l);
    try {
      localStorage.setItem("lang", l);
    } catch {}
  }, []);

  const toggle = useCallback(() => {
    setLang(lang === "en" ? "ar" : "en");
  }, [lang, setLang]);

  const t = useCallback(
    (key: string, fallback?: string): string => {
      const value = resolve(translations[lang], key);
      if (typeof value === "string") return value;
      // Fall back to English, then to the provided fallback / key itself.
      const enValue = resolve(translations.en, key);
      if (typeof enValue === "string") return enValue;
      return fallback ?? key;
    },
    [lang]
  );

  const tArr = useCallback(
    <T = string,>(key: string): T[] => {
      const value = resolve(translations[lang], key);
      if (Array.isArray(value)) return value as T[];
      const enValue = resolve(translations.en, key);
      return Array.isArray(enValue) ? (enValue as T[]) : [];
    },
    [lang]
  );

  const dir: Dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <LanguageContext.Provider value={{ lang, dir, t, tArr, setLang, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
/** Convenience hook returning just the translate function. */
export const useT = () => useContext(LanguageContext).t;
