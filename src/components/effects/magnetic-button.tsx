"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  as?: "button" | "a";
  href?: string;
}

export function MagneticButton({
  children,
  className,
  as: Tag = "button",
  href,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement & HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });

      const enter = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) * 0.25;
        const dy = (e.clientY - cy) * 0.25;
        xTo(dx);
        yTo(dy);
      };

      const leave = () => {
        xTo(0);
        yTo(0);
      };

      el.addEventListener("mousemove", enter);
      el.addEventListener("mouseleave", leave);

      return () => {
        el.removeEventListener("mousemove", enter);
        el.removeEventListener("mouseleave", leave);
      };
    });

    return () => ctx.revert();
  }, []);

  const Comp = Tag as React.ElementType;
  return (
    <Comp ref={ref} href={href} className={className}>
      {children}
    </Comp>
  );
}
