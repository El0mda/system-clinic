"use client";

import { motion } from "framer-motion";
import { useT } from "@/components/i18n/language-provider";

const logos = [
  "BrightSmile Dental",
  "ElitePhysio Center",
  "Aura Beauty Studio",
  "MediCare General",
  "OrthoPlus Clinic",
  "VitalCare Health",
  "PureDent Studio",
  "Renew Physio",
];

export function TrustedBy() {
  const t = useT();
  return (
    <section className="relative py-16 sm:py-20 border-y border-border/30 bg-surface-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-xs sm:text-sm font-medium text-text-tertiary uppercase tracking-widest mb-8"
        >
          {t("trustedBy.title")}
        </motion.p>

        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-surface-secondary/30 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-surface-secondary/30 to-transparent z-10 pointer-events-none" />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex gap-12 sm:gap-16 items-center justify-center flex-wrap"
          >
            {logos.map((name, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="flex items-center gap-2 text-text-tertiary hover:text-text-primary transition-colors group"
              >
                <div className="w-7 h-7 rounded-md bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <div className="w-3 h-3 rounded-sm bg-primary-400" />
                </div>
                <span className="text-sm font-medium whitespace-nowrap">{name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
