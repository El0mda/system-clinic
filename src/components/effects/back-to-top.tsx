"use client";

import { useCallback, useEffect, useRef } from "react";
import { ArrowUp } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function BackToTop() {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const btn = ref.current;
    if (!btn) return;

    gsap.set(btn, { opacity: 0, scale: 0.8, pointerEvents: "none" });

    ScrollTrigger.create({
      trigger: document.body,
      start: "top -200px",
      onEnter: () => gsap.to(btn, { opacity: 1, scale: 1, pointerEvents: "auto", duration: 0.3, ease: "power2.out" }),
      onLeaveBack: () => gsap.to(btn, { opacity: 0, scale: 0.8, pointerEvents: "none", duration: 0.3, ease: "power2.out" }),
    });
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <button
      ref={ref}
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-accent-500 text-white shadow-xl shadow-primary-500/30 hover:shadow-2xl hover:shadow-primary-500/40 transition-shadow"
      aria-label="Back to top"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
