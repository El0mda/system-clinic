"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SectionParallaxBg() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        backgroundPosition: "50% 100%",
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      className="fixed inset-0 pointer-events-none -z-20"
      style={{
        background: `
          radial-gradient(ellipse 80% 60% at 50% -20%, rgba(99,102,241,0.08), transparent),
          radial-gradient(ellipse 60% 50% at 80% 40%, rgba(168,85,247,0.05), transparent),
          radial-gradient(ellipse 50% 40% at 20% 60%, rgba(99,102,241,0.04), transparent)
        `,
        backgroundSize: "100% 200%",
        backgroundPosition: "50% 0%",
      }}
    />
  );
}
