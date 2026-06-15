"use client";

import { Heart } from "lucide-react";
import { useLanguage } from "@/components/i18n/language-provider";

export function Footer() {
  const { t, tArr } = useLanguage();
  const footerLinks = [
    { title: t("footer.groups.product.title"), links: tArr("footer.groups.product.links") },
    { title: t("footer.groups.company.title"), links: tArr("footer.groups.company.links") },
    { title: t("footer.groups.resources.title"), links: tArr("footer.groups.resources.links") },
    { title: t("footer.groups.legal.title"), links: tArr("footer.groups.legal.links") },
  ];
  return (
    <footer className="border-t border-border/50 bg-surface-secondary/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="flex items-center gap-2.5 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 shadow-lg">
                <span className="text-white font-bold text-sm">H</span>
              </div>
              <span className="font-semibold text-lg tracking-tight text-text-primary">
                Health<span className="text-primary-600">ERP</span>
              </span>
            </a>
            <p className="text-sm text-text-secondary leading-relaxed max-w-xs">
              {t("footer.tagline")}
            </p>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-text-tertiary mb-4">
                {group.title}
              </h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-tertiary">
            &copy; {new Date().getFullYear()} HealthERP. {t("footer.rights")}
          </p>
          <p className="text-xs text-text-tertiary flex items-center gap-1">
            {t("footer.madeWith")} <Heart className="h-3 w-3 text-red-500 fill-red-500" /> {t("footer.forHealthcare")}
          </p>
        </div>
      </div>
    </footer>
  );
}
