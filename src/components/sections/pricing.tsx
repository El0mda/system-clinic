"use client";

import { useState, useRef, useEffect, forwardRef } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
import { useLanguage } from "@/components/i18n/language-provider";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const plans = [
  { key: "starter", monthlyPrice: 29, yearlyPrice: 290, highlighted: false },
  { key: "professional", monthlyPrice: 79, yearlyPrice: 790, highlighted: true },
  { key: "enterprise", monthlyPrice: 199, yearlyPrice: 1990, highlighted: false },
];

export function Pricing() {
  const { t } = useLanguage();
  const [isYearly, setIsYearly] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // GSAP entrance animation
  useGSAP(() => {
    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            delay: i * 0.15,
            ease: "power4.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Highlighted card pulsing glow
        if (i === 1) {
          gsap.to(card, {
            boxShadow: "0 25px 60px rgba(79, 70, 229, 0.25)",
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="relative py-20 sm:py-28 lg:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-surface via-primary-50/20 to-surface dark:via-primary-900/10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-primary-300/10 to-accent-300/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge={t("pricing.badge")}
          title={t("pricing.title")}
          description={t("pricing.description")}
        />

        {/* Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center justify-center mt-10 mb-12 sm:mb-16"
        >
          <div className="flex items-center gap-3 bg-surface-tertiary/60 rounded-full p-1 border border-border/40">
            <button
              onClick={() => setIsYearly(false)}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-full transition-all duration-200",
                !isYearly
                  ? "bg-surface text-text-primary shadow-sm border border-border/40"
                  : "text-text-secondary hover:text-text-primary"
              )}
            >
              {t("pricing.monthly")}
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-full transition-all duration-200",
                isYearly
                  ? "bg-surface text-text-primary shadow-sm border border-border/40"
                  : "text-text-secondary hover:text-text-primary"
              )}
            >
              {t("pricing.annually")}
              <span className="mx-1.5 text-xs text-emerald-600 font-semibold">{t("pricing.save20")}</span>
            </button>
          </div>
        </motion.div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {plans.map((plan, index) => (
            <PricingCard
              key={plan.key}
              plan={plan}
              isYearly={isYearly}
              ref={(el) => { cardsRef.current[index] = el; }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface PricingCardProps {
  plan: typeof plans[0];
  isYearly: boolean;
}

const PricingCard = forwardRef<HTMLDivElement, PricingCardProps>(function PricingCard({ plan, isYearly }, forwardedRef) {
  const { t, tArr } = useLanguage();
  const name = t(`pricing.plans.${plan.key}.name`);
  const description = t(`pricing.plans.${plan.key}.description`);
  const features = tArr(`pricing.plans.${plan.key}.features`);
  const cardRef = useRef<HTMLDivElement>(null);

  // Merge refs
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Forward the ref
    if (typeof forwardedRef === "function") {
      forwardedRef(card);
    } else if (forwardedRef) {
      (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = card;
    }
  }, [forwardedRef]);

  // 3D Tilt effect with GSAP
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const ctx = gsap.context(() => {
      const handleMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        gsap.to(card, {
          rotationY: x * 12,
          rotationX: y * -10,
          transformPerspective: 1000,
          duration: 0.4,
          ease: "power2.out",
        });
      };

      const handleLeave = () => {
        gsap.to(card, {
          rotationY: 0,
          rotationX: 0,
          duration: 0.6,
          ease: "power3.out",
        });
      };

      card.addEventListener("mousemove", handleMove);
      card.addEventListener("mouseleave", handleLeave);

      return () => {
        card.removeEventListener("mousemove", handleMove);
        card.removeEventListener("mouseleave", handleLeave);
      };
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={cardRef}
      className={cn(
        "relative rounded-2xl border p-6 sm:p-8 flex flex-col transition-all duration-300",
        plan.highlighted
          ? "bg-gradient-to-b from-primary-600 to-primary-700 border-primary-500 text-white shadow-2xl shadow-primary-500/20 scale-[1.02] md:scale-105"
          : "bg-surface border-border/50 hover:shadow-xl hover:shadow-primary-500/5"
      )}
      style={{ transformStyle: "preserve-3d" }}
    >
      {plan.highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <span className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-sm px-3.5 py-1 text-xs font-medium text-white border border-white/20">
            {t("pricing.mostPopular")}
          </span>
        </div>
      )}

      <div className="mb-6" style={{ transform: "translateZ(30px)" }}>
        <h3 className={cn(
          "text-lg font-semibold mb-1",
          plan.highlighted ? "text-white" : "text-text-primary"
        )}>
          {name}
        </h3>
        <p className={cn(
          "text-sm",
          plan.highlighted ? "text-primary-100" : "text-text-secondary"
        )}>
          {description}
        </p>
      </div>

      <div className="mb-6" style={{ transform: "translateZ(40px)" }}>
        <div className="flex items-baseline gap-1">
          <span className={cn(
            "text-4xl sm:text-5xl font-bold tracking-tight",
            plan.highlighted ? "text-white" : "text-text-primary"
          )}>
            ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
          </span>
          <span className={cn(
            "text-sm font-medium",
            plan.highlighted ? "text-primary-200" : "text-text-tertiary"
          )}>
            /{isYearly ? t("pricing.perYear") : t("pricing.perMonth")}
          </span>
        </div>
      </div>

      <div style={{ transform: "translateZ(20px)" }}>
        <Button
          variant={plan.highlighted ? "secondary" : "primary"}
          size="lg"
          className={cn(
            "w-full mb-8",
            plan.highlighted && "bg-white text-primary-700 hover:bg-primary-50 shadow-lg"
          )}
        >
          {t("common.getStarted")}
          <ArrowRight className="h-4 w-4 rtl:rotate-180" />
        </Button>
      </div>

      <ul className="space-y-3 flex-1" style={{ transform: "translateZ(15px)" }}>
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <Check className={cn(
              "w-4 h-4 mt-0.5 flex-shrink-0",
              plan.highlighted ? "text-emerald-300" : "text-emerald-500"
            )} />
            <span className={cn(
              "text-sm",
              plan.highlighted ? "text-primary-100" : "text-text-secondary"
            )}>
              {feature}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
});
