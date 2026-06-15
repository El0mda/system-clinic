"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Building2,
  UserPlus,
  Calendar,
  BarChart3,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { useT } from "@/components/i18n/language-provider";

gsap.registerPlugin(ScrollTrigger);

const stepItems = [
  { icon: Building2, key: "register", number: "01", gradient: "from-primary-500 to-indigo-500" },
  { icon: UserPlus, key: "addPatients", number: "02", gradient: "from-emerald-500 to-teal-500" },
  { icon: Calendar, key: "manageAppointments", number: "03", gradient: "from-amber-500 to-orange-500" },
  { icon: BarChart3, key: "trackRevenue", number: "04", gradient: "from-violet-500 to-purple-500" },
];

export function HowItWorks() {
  const t = useT();
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  const numbersRef = useRef<(HTMLDivElement | null)[]>([]);
  const linesRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    const steps = stepsRef.current.filter(Boolean) as HTMLDivElement[];
    const numbers = numbersRef.current.filter(Boolean) as HTMLDivElement[];
    const lines = linesRef.current.filter(Boolean) as HTMLDivElement[];

    if (!steps.length) return;

    const ctx = gsap.context(() => {
      // Timeline line grow
      if (timelineRef.current) {
        gsap.fromTo(
          timelineRef.current,
          { scaleY: 0, transformOrigin: "top center" },
          {
            scaleY: 1,
            duration: 2,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              end: "bottom 30%",
              scrub: 1.5,
            },
          }
        );
      }

      // Animate numbers and steps
      numbers.forEach((num, i) => {
        gsap.fromTo(
          num,
          { scale: 0, opacity: 0, rotation: -180 },
          {
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: 0.8,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: steps[i],
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Pulsing glow
        gsap.to(num, {
          boxShadow: "0 0 30px rgba(99,102,241,0.3)",
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.3,
        });
      });

      // Animate connecting lines
      lines.forEach((line, i) => {
        gsap.fromTo(
          line,
          { scaleY: 0, transformOrigin: "top center" },
          {
            scaleY: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: steps[i],
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Step content and icon reveal
      steps.forEach((step, i) => {
        const icon = step.querySelector(".step-icon");
        const content = step.querySelector(".step-content");

        if (icon) {
          gsap.fromTo(
            icon,
            { x: -40, opacity: 0, scale: 0.5 },
            {
              x: 0,
              opacity: 1,
              scale: 1,
              duration: 0.8,
              ease: "power4.out",
              scrollTrigger: {
                trigger: step,
                start: "top 82%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        if (content) {
          gsap.fromTo(
            content,
            { x: i % 2 === 0 ? 40 : -40, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power4.out",
              scrollTrigger: {
                trigger: step,
                start: "top 82%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-28 lg:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-primary-50/20 via-white to-white pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge={t("howItWorks.badge")}
          title={t("howItWorks.title")}
          description={t("howItWorks.description")}
        />

        <div className="mt-16 sm:mt-20 relative">
          {/* Timeline line */}
          <div
            ref={timelineRef}
            className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-300 via-accent-300 to-primary-300 -translate-x-1/2 origin-top"
          />

          <div className="space-y-12 sm:space-y-16 lg:space-y-24">
            {stepItems.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;
              const title = t(`howItWorks.steps.${step.key}.title`);
              const description = t(`howItWorks.steps.${step.key}.description`);

              return (
                <div
                  key={step.key}
                  ref={(el) => { stepsRef.current[index] = el; }}
                  className={`relative flex flex-col ${
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  } items-center gap-6 sm:gap-8 lg:gap-16`}
                >
                  {/* Content */}
                  <div
                    className={`step-content flex-1 ${
                      isEven ? "lg:text-right lg:pr-16" : "lg:text-left lg:pl-16"
                    }`}
                  >
                    <div
                      className={`max-w-md ${
                        isEven ? "lg:ml-auto" : "lg:mr-auto"
                      }`}
                    >
                      <h3 className="text-xl sm:text-2xl font-semibold text-text-primary mb-3">
                        {title}
                      </h3>
                      <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                        {description}
                      </p>
                    </div>
                  </div>

                  {/* Center icon */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 z-10 flex-col items-center">
                    <div
                      ref={(el) => { numbersRef.current[index] = el; }}
                      className={`step-icon w-14 h-14 rounded-full bg-gradient-to-br ${step.gradient} shadow-lg shadow-primary-500/20 flex items-center justify-center text-white font-bold text-lg`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    {/* Connecting line */}
                    {index < stepItems.length - 1 && (
                      <div
                        ref={(el) => { linesRef.current[index] = el; }}
                        className="w-0.5 h-16 bg-gradient-to-b from-primary-200 to-accent-200 origin-top"
                      />
                    )}
                  </div>

                  {/* Step number - desktop */}
                  <div
                    className={`hidden lg:flex flex-1 items-center ${
                      isEven ? "lg:pl-16" : "lg:pr-16 justify-end"
                    }`}
                  >
                    <span
                      className={`text-7xl font-bold bg-gradient-to-br ${step.gradient} bg-clip-text text-transparent select-none`}
                    >
                      {step.number}
                    </span>
                  </div>

                  {/* Mobile layout */}
                  <div className="lg:hidden flex items-center gap-4 w-full">
                    <div
                      ref={(el) => { numbersRef.current[index] = el; }}
                      className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg`}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-3xl font-bold text-primary-100">
                      {step.number}
                    </span>
                    {index < stepItems.length - 1 && (
                      <div className="flex-1 h-px bg-gradient-to-r from-primary-200 to-accent-200" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
