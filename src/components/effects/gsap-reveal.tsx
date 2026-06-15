"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface GsapRevealProps {
  children: React.ReactNode;
  className?: string;
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "scale" | "rotate";
}

const directionMap: Record<string, gsap.TweenVars> = {
  up: { y: 80, opacity: 0 },
  down: { y: -80, opacity: 0 },
  left: { x: 80, opacity: 0 },
  right: { x: -80, opacity: 0 },
  scale: { scale: 0.8, opacity: 0 },
  rotate: { rotation: 15, scale: 0.9, opacity: 0 },
};

export function GsapReveal({
  children,
  className,
  from,
  to,
  delay = 0,
  direction = "up",
}: GsapRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        from ?? directionMap[direction],
        {
          ...(to ?? { y: 0, x: 0, rotation: 0, scale: 1, opacity: 1 }),
          duration: 1.2,
          delay,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => ctx.revert();
  }, [from, to, delay, direction]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
