"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ParticleField } from "@/components/effects/particle-field";
import { Tilt3D } from "@/components/effects/tilt-3d";
import { Scene3D } from "@/components/effects/scene-3d";
import { DepthLayer } from "@/components/effects/card-3d";
import { useT } from "@/components/i18n/language-provider";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const t = useT();
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);
  const float1Ref = useRef<HTMLDivElement>(null);
  const float2Ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    if (badgeRef.current) {
      tl.from(badgeRef.current, {
        y: 30, opacity: 0, scale: 0.9, duration: 0.8,
      });
    }

    if (textRef.current) {
      const words = textRef.current.querySelectorAll(".hero-word");
      tl.from(words, {
        y: 80, opacity: 0, rotationX: -90,
        transformOrigin: "50% 50% -50px",
        duration: 0.9, stagger: 0.12, ease: "back.out(1.7)",
      }, "-=0.3");
    }

    if (ctaRef.current) {
      tl.from(ctaRef.current.children, {
        y: 40, opacity: 0, scale: 0.95,
        duration: 0.7, stagger: 0.15, ease: "back.out(1.4)",
      }, "-=0.3");
    }

    if (dashboardRef.current) {
      tl.from(dashboardRef.current, {
        x: 80, y: 40, opacity: 0, rotationY: 15, rotationX: 5,
        duration: 1.2, ease: "power4.out",
      }, "-=0.8");
    }

    if (float1Ref.current) {
      tl.from(float1Ref.current, {
        scale: 0, opacity: 0, rotation: 180, duration: 0.8, ease: "back.out(2)",
      }, "-=0.4");
    }

    if (float2Ref.current) {
      tl.from(float2Ref.current, {
        scale: 0, opacity: 0, rotation: -180, duration: 0.8, ease: "back.out(2)",
      }, "-=0.3");
    }
  }, []);

  // Floating elements
  useEffect(() => {
    if (!float1Ref.current || !float2Ref.current) return;
    const ctx = gsap.context(() => {
      gsap.to(float1Ref.current, { y: -20, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(float2Ref.current, { y: 15, duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1 });
    });
    return () => ctx.revert();
  }, []);

  const headline = t("hero.headline");
  const words = headline.split(" ");
  const lastIndex = words.length - 1;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
      style={{ perspective: "1200px" }}
    >
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-50/60 via-surface to-surface dark:from-primary-900/20 dark:via-surface dark:to-surface pointer-events-none" />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -200]) }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-primary-300/20 to-transparent rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]) }}
        className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-accent-300/15 to-transparent rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -150]) }}
        className="absolute bottom-1/4 left-0 w-[300px] h-[300px] bg-gradient-to-tr from-primary-400/10 to-transparent rounded-full blur-3xl pointer-events-none"
      />

      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      <ParticleField />
      <Scene3D />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-32 w-full" style={{ transformStyle: "preserve-3d" }}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <motion.div style={{ y, opacity, scale }}>
            <div ref={badgeRef}>
              <Badge variant="primary" className="mb-6">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary-500 mx-1.5 animate-pulse" />
                {t("hero.badge")}
              </Badge>
            </div>

            <h1
              ref={textRef}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight text-text-primary leading-[1.08]"
              style={{ perspective: "1200px" }}
            >
              {words.map((word, i) => (
                <span key={i} className="hero-word inline-block mx-[0.15em]" style={{ transformStyle: "preserve-3d" }}>
                  {i === lastIndex ? (
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-primary-500 to-accent-500">
                      {word}
                    </span>
                  ) : (
                    word
                  )}
                </span>
              ))}
            </h1>

            {/* Depth layer subtitle */}
            <DepthLayer depth={0.5}>
              <p className="mt-5 sm:mt-6 text-base sm:text-lg lg:text-xl text-text-secondary leading-relaxed max-w-lg">
                {t("hero.subtitle")}
              </p>
            </DepthLayer>

            <div ref={ctaRef} className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <DepthLayer depth={0.8}>
                <Button variant="primary" size="lg" className="relative overflow-hidden group">
                  <span className="relative z-10 flex items-center gap-2">
                    {t("common.getStartedFree")}
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform rtl:rotate-180" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
              </DepthLayer>
              <DepthLayer depth={0.6}>
                <Button variant="outline" size="lg" className="group">
                  <Play className="h-4 w-4 group-hover:scale-110 transition-transform rtl:rotate-180" />
                  {t("common.watchDemo")}
                </Button>
              </DepthLayer>
            </div>

            <DepthLayer depth={0.3}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.4 }}
                className="mt-8 flex items-center gap-6 text-sm text-text-tertiary"
              >
                <span className="flex items-center gap-1.5">
                  <span className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-6 h-6 rounded-full border-2 border-surface bg-gradient-to-br from-primary-300 to-accent-300"
                      />
                    ))}
                  </span>
                </span>
                <span>
                  <strong className="text-text-primary">2,000+</strong> {t("hero.clinicsOnboarded")}
                </span>
              </motion.div>
            </DepthLayer>
          </motion.div>

          {/* Right - Dashboard with 3D Tilt */}
          <div className="relative hidden lg:block" style={{ perspective: "1200px" }}>
            <div ref={dashboardRef}>
              <Tilt3D maxTilt={12} perspective={1200} scale={1.03} glare={true} shine={true}>
                <div className="relative rounded-2xl border border-border/60 bg-surface shadow-2xl shadow-primary-500/10 overflow-hidden">
                  <div className="flex items-center gap-2 px-5 py-3 border-b border-border/30 bg-surface-secondary/50">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    </div>
                    <div className="flex-1 flex justify-center">
                      <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-surface-tertiary/50 text-xs text-text-tertiary">
                        <span>app.healtherp.com</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 space-y-4">
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { label: t("dashboardHome.kpis.totalPatients"), value: "2,847", change: "+12%", up: true },
                        { label: t("nav.appointments"), value: "156", change: "+8%", up: true },
                        { label: t("dashboardHome.revenue"), value: "$48.2K", change: "+23%", up: true },
                      ].map((kpi) => (
                        <div key={kpi.label} className="rounded-xl bg-surface-secondary/70 p-3.5 border border-border/30 hover:shadow-md transition-shadow">
                          <p className="text-xs text-text-tertiary mb-1">{kpi.label}</p>
                          <p className="text-lg font-semibold text-text-primary">{kpi.value}</p>
                          <span className={`text-xs font-medium ${kpi.up ? "text-emerald-600" : "text-red-500"}`}>
                            {kpi.change}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="rounded-xl border border-border/30 bg-surface p-3.5">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-xs font-semibold text-text-primary">{t("hero.todaysSchedule")}</h4>
                        <span className="text-xs text-primary-600 font-medium">{t("common.viewAll")}</span>
                      </div>
                      <div className="space-y-2.5">
                        {[
                          { name: "Sarah Johnson", time: "09:00 AM", type: "Check-up", status: "Confirmed", initials: "SJ" },
                          { name: "Michael Chen", time: "10:30 AM", type: "Cleaning", status: "In Progress", initials: "MC" },
                          { name: "Emily Rodriguez", time: "11:45 AM", type: "Consultation", status: "Confirmed", initials: "ER" },
                        ].map((appt) => (
                          <div key={appt.name} className="flex items-center justify-between py-1.5 group cursor-pointer">
                            <div className="flex items-center gap-2.5">
                              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-200 to-accent-200 flex items-center justify-center text-xs font-medium text-primary-700 group-hover:scale-110 transition-transform">
                                {appt.initials}
                              </div>
                              <div>
                                <p className="text-sm font-medium text-text-primary">{appt.name}</p>
                                <p className="text-xs text-text-tertiary">{appt.type}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-xs font-medium text-text-primary">{appt.time}</p>
                              <span className={`text-xs font-medium ${
                                appt.status === "Confirmed" ? "text-emerald-600" : "text-primary-600"
                              }`}>
                                {t(`enums.status.${appt.status}`, appt.status)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-6 -left-6 -right-6 h-32 bg-gradient-to-t from-primary-500/10 to-transparent blur-2xl rounded-full pointer-events-none" />
              </Tilt3D>
            </div>

            <div
              ref={float1Ref}
              className="absolute -top-4 -right-4 w-16 h-16 rounded-2xl bg-surface border border-border/60 shadow-lg flex items-center justify-center"
            >
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-emerald-400 mb-0.5" />
                <span className="text-[8px] font-semibold text-text-primary">98%</span>
                <span className="text-[6px] text-text-tertiary">{t("hero.uptime")}</span>
              </div>
            </div>

            <div
              ref={float2Ref}
              className="absolute -bottom-2 -left-8 w-14 h-14 rounded-xl bg-surface border border-border/60 shadow-lg flex items-center justify-center"
            >
              <div className="text-center">
                <div className="flex items-center gap-0.5 justify-center mb-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} className="w-2 h-2 fill-amber-400" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-[7px] text-text-tertiary">4.9/5.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
