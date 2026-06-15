"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useGsapReveal(
  selector: string,
  options?: {
    from?: gsap.TweenVars;
    to?: gsap.TweenVars;
    stagger?: number;
    trigger?: string;
    start?: string;
    end?: string;
    scrub?: boolean | number;
    markers?: boolean;
    toggleActions?: string;
  }
) {
  const defaults = {
    from: { y: 60, opacity: 0, scale: 0.95 },
    to: { y: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out" },
    stagger: 0.12,
    start: "top 85%",
    toggleActions: "play none none reverse",
  };

  const opts = { ...defaults, ...options };

  useEffect(() => {
    const els = document.querySelectorAll(selector);
    if (!els.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        els,
        opts.from,
        {
          ...opts.to,
          stagger: opts.stagger,
          scrollTrigger: {
            trigger: opts.trigger || els[0].parentElement || els[0],
            start: opts.start,
            toggleActions: opts.toggleActions as string,
          },
        }
      );
    });

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selector]);
}

export function useParallax(selector: string, speed: number = 0.3) {
  useEffect(() => {
    const el = document.querySelector(selector);
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        y: () => (el as HTMLElement).offsetHeight * speed * -1,
        ease: "none",
        scrollTrigger: {
          trigger: el.parentElement || el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, [selector, speed]);
}

export function useCounter(
  selector: string,
  options?: { duration?: number; ease?: string }
) {
  useEffect(() => {
    const els = document.querySelectorAll(selector);
    if (!els.length) return;

    const ctx = gsap.context(() => {
      els.forEach((el) => {
        const target = el as HTMLElement;
        const text = target.innerText;
        const num = parseFloat(text.replace(/[^0-9.]/g, ""));
        if (isNaN(num)) return;

        const prefix = text.replace(/[0-9.,]/g, "");
        const suffix = text.replace(/^[0-9.,]*/, "").replace(prefix, "");
        const isDecimal = text.includes(".");

        target.innerText = prefix + "0" + suffix;

        gsap.to(target, {
          innerText: num,
          duration: options?.duration ?? 2.5,
          ease: options?.ease ?? "power3.out",
          snap: { innerText: isDecimal ? 0.1 : 1 },
          scrollTrigger: {
            trigger: target.parentElement || target,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
          onUpdate: () => {
            const val = parseFloat(target.innerText);
            target.innerText = prefix + (isDecimal ? val.toFixed(1) : Math.round(val).toLocaleString()) + suffix;
          },
        });
      });
    });

    return () => ctx.revert();
  }, [selector, options]);
}
