"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SectionColorTransition() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = document.querySelectorAll("[data-color]");
    if (!sections.length) return;

    const ctx = gsap.context(() => {
      sections.forEach((section) => {
        const color = section.getAttribute("data-color") || "#ffffff";
        ScrollTrigger.create({
          trigger: section,
          start: "top 50%",
          end: "bottom 50%",
          onEnter: () => {
            gsap.to(ref.current, {
              backgroundColor: color,
              duration: 0.8,
              ease: "power2.out",
            });
          },
          onEnterBack: () => {
            gsap.to(ref.current, {
              backgroundColor: color,
              duration: 0.8,
              ease: "power2.out",
            });
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      className="fixed inset-0 pointer-events-none -z-10"
      style={{ backgroundColor: "#ffffff", transition: "background-color 0.8s ease" }}
    />
  );
}
