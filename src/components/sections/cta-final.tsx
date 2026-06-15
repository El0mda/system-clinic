"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ParticleField } from "@/components/effects/particle-field";

gsap.registerPlugin(ScrollTrigger);

export function CTAFinal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    const bg = bgRef.current;
    if (!section || !text || !bg) return;

    const ctx = gsap.context(() => {
      // Animated gradient background shift
      gsap.to(bg, {
        backgroundPosition: "100% 50%",
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Text reveal
      const words = text.querySelectorAll(".cta-word");
      gsap.fromTo(
        words,
        { y: 60, opacity: 0, rotationX: -60 },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Floating shimmer lines
      for (let i = 0; i < 3; i++) {
        const line = document.createElement("div");
        line.className = "absolute h-px bg-gradient-to-r from-transparent via-white/20 to-transparent";
        line.style.cssText = `
          left: ${Math.random() * 100}%;
          top: ${20 + Math.random() * 60}%;
          width: ${100 + Math.random() * 200}px;
          transform: rotate(${Math.random() * 30 - 15}deg);
        `;
        section.appendChild(line);

        gsap.fromTo(
          line,
          { x: -300, opacity: 0 },
          {
            x: 800,
            opacity: 1,
            duration: 3 + Math.random() * 2,
            repeat: -1,
            delay: Math.random() * 2,
            ease: "none",
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const headline = "Ready to transform your clinic operations?";
  const words = headline.split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-28 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 bg-[size:200%_200%] bg-[0%_50%]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:64px_64px]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-b from-white/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tl from-accent-500/20 to-transparent rounded-full blur-3xl" />

      {/* Particle field */}
      <ParticleField />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur-sm px-4 py-1.5 text-xs font-medium text-white border border-white/10 mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Start your free trial today
            </span>
          </motion.div>

          {/* GSAP word-by-word */}
          <h2
            ref={textRef}
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold text-white leading-[1.1] tracking-tight"
            style={{ perspective: "800px" }}
          >
            {words.map((word, i) => (
              <span key={i} className="cta-word inline-block mr-[0.25em]">
                {word}
              </span>
            ))}
          </h2>

          <p className="mt-5 sm:mt-6 text-base sm:text-lg text-primary-100/80 max-w-lg mx-auto leading-relaxed">
            Join 2,000+ clinics already using HealthERP. Start your free
            14-day trial — no credit card required.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-primary-700 hover:bg-primary-50 shadow-2xl shadow-primary-900/30 h-13 px-8 text-base relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Started Free
                <ArrowRight className="h-4 w-4" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-primary-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="text-white/80 hover:text-white hover:bg-white/10 border border-white/10 h-13 px-8 text-base"
            >
              Talk to Sales
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 text-xs text-primary-200/60"
          >
            Free 14-day trial &bull; No credit card required &bull; Cancel anytime
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
