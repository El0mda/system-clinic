"use client";

import { Languages } from "lucide-react";
import { useLanguage } from "./language-provider";
import { cn } from "@/lib/utils";

export function LanguageToggle({ className }: { className?: string }) {
  const { lang, toggle } = useLanguage();

  return (
    <button
      onClick={toggle}
      className={cn(
        "flex h-9 items-center justify-center gap-1.5 rounded-lg border border-border/50 bg-surface px-2.5 text-text-secondary hover:text-text-primary hover:bg-surface-secondary transition-all",
        className
      )}
      aria-label={lang === "en" ? "التبديل إلى العربية" : "Switch to English"}
      title={lang === "en" ? "التبديل إلى العربية" : "Switch to English"}
    >
      <Languages className="h-4 w-4 shrink-0" />
      <span className="text-xs font-semibold">{lang === "en" ? "ع" : "EN"}</span>
    </button>
  );
}
