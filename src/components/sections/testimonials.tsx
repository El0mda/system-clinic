"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { useT } from "@/components/i18n/language-provider";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  { name: "Dr. Sarah Mitchell", key: "t1", avatar: "SM", rating: 5, gradient: "from-primary-500 to-indigo-500" },
  { name: "James Rodriguez", key: "t2", avatar: "JR", rating: 5, gradient: "from-emerald-500 to-teal-500" },
  { name: "Dr. Lisa Chen", key: "t3", avatar: "LC", rating: 5, gradient: "from-amber-500 to-orange-500" },
  { name: "Dr. Michael Park", key: "t4", avatar: "MP", rating: 5, gradient: "from-violet-500 to-purple-500" },
  { name: "Anna Williams", key: "t5", avatar: "AW", rating: 5, gradient: "from-rose-500 to-pink-500" },
];

export function Testimonials() {
  const t = useT();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  // GSAP section entrance
  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".testimonial-card",
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: section,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 200 : -200,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -200 : 200,
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-28 lg:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-surface via-surface-secondary/30 to-surface pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge={t("testimonials.badge")}
          title={t("testimonials.title")}
          description={t("testimonials.description")}
        />

        <div className="mt-12 sm:mt-16 max-w-3xl mx-auto testimonial-card">
          <div className="relative">
            <div className="min-h-[300px] sm:min-h-[260px] flex items-center">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={current}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
                  className="w-full"
                >
                  <div className="text-center relative">
                    {/* Quote icon */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-primary-200/40">
                      <Quote className="w-12 h-12" />
                    </div>

                    {/* Stars */}
                    <div className="flex items-center justify-center gap-1 mb-6">
                      {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                        <motion.svg
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                          className="w-5 h-5 fill-amber-400 text-amber-400"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </motion.svg>
                      ))}
                    </div>

                    <blockquote ref={quoteRef} className="text-lg sm:text-xl lg:text-2xl text-text-primary font-medium leading-relaxed mb-8 px-4">
                      &ldquo;{t(`testimonials.items.${testimonials[current].key}.content`)}&rdquo;
                    </blockquote>

                    {/* Avatar + info */}
                    <div className="flex items-center justify-center gap-3">
                      <motion.div
                        key={current + "-avatar"}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonials[current].gradient} flex items-center justify-center text-base font-semibold text-white shadow-lg`}
                      >
                        {testimonials[current].avatar}
                      </motion.div>
                      <div className="text-left">
                        <p className="text-sm font-semibold text-text-primary">
                          {testimonials[current].name}
                        </p>
                        <p className="text-xs text-text-tertiary">
                          {t(`testimonials.items.${testimonials[current].key}.role`)}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prev}
                className="flex items-center justify-center w-10 h-10 rounded-full border border-border/50 bg-surface hover:bg-surface-secondary hover:border-primary-200 transition-all text-text-secondary hover:text-text-primary shadow-sm"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDirection(i > current ? 1 : -1);
                      setCurrent(i);
                    }}
                    className={`h-2 rounded-full transition-all duration-500 ${
                      i === current
                        ? "bg-primary-500 w-8"
                        : "bg-border hover:bg-primary-200 w-2"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="flex items-center justify-center w-10 h-10 rounded-full border border-border/50 bg-surface hover:bg-surface-secondary hover:border-primary-200 transition-all text-text-secondary hover:text-text-primary shadow-sm"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
