"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Users,
  Calendar,
  CreditCard,
  Package,
  UsersRound,
  BarChart3,
  Building2,
  Cpu,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { Card3D, DepthLayer } from "@/components/effects/card-3d";
import { useT } from "@/components/i18n/language-provider";

gsap.registerPlugin(ScrollTrigger);

const featureItems = [
  { icon: Users, key: "patientManagement" },
  { icon: Calendar, key: "scheduling" },
  { icon: CreditCard, key: "billing" },
  { icon: Package, key: "inventory" },
  { icon: UsersRound, key: "staff" },
  { icon: BarChart3, key: "analytics" },
  { icon: Building2, key: "multiBranch" },
  { icon: Cpu, key: "integration" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

export function Features() {
  const t = useT();
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll(".feature-card");
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        const direction = i % 2 === 0 ? -1 : 1;
        gsap.fromTo(
          card,
          { x: direction * 60, y: 40, opacity: 0, rotationY: direction * -15 },
          {
            x: 0, y: 0, opacity: 1, rotationY: 0,
            duration: 0.9, ease: "power4.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative py-20 sm:py-28 lg:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-surface via-primary-50/30 to-surface dark:via-primary-900/10 pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-72 h-72 bg-primary-300/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge={t("features.badge")}
          title={t("features.title")}
          description={t("features.description")}
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-16 sm:mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
        >
          {featureItems.map((feature) => {
            const Icon = feature.icon;
            const title = t(`features.items.${feature.key}.title`);
            const description = t(`features.items.${feature.key}.description`);
            return (
              <motion.div
                key={feature.key}
                className="feature-card"
              >
                <Card3D className="group relative rounded-2xl border border-border/50 bg-surface p-6 sm:p-7 transition-all duration-500 hover:shadow-2xl hover:shadow-primary-500/10 hover:border-primary-200/50 cursor-default"
                >
                  <DepthLayer depth={1.5}>
                    <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/30 dark:to-accent-700/20 border border-primary-100/50 dark:border-primary-800/50 mb-4 group-hover:scale-110 group-hover:rotate-[5deg] transition-all duration-300">
                      <Icon className="w-5 h-5 text-primary-600" />
                    </div>
                  </DepthLayer>

                  <DepthLayer depth={1}>
                    <h3 className="text-base font-semibold text-text-primary mb-2 group-hover:text-primary-700 transition-colors">
                      {title}
                    </h3>
                  </DepthLayer>

                  <DepthLayer depth={0.5}>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {description}
                    </p>
                  </DepthLayer>

                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/[0.02] group-hover:ring-primary-200/50 transition-all duration-300 pointer-events-none" />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/[0.03] to-accent-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </Card3D>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
