"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";

interface DepthLayerProps {
  children: ReactNode;
  depth?: number;
  className?: string;
}

export function DepthLayer({ children, depth = 1, className }: DepthLayerProps) {
  return (
    <div
      className={className}
      style={{
        transform: `translateZ(${depth * 40}px)`,
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </div>
  );
}

interface Card3DProps {
  children: ReactNode;
  className?: string;
  layers?: number;
  style?: React.CSSProperties;
}

export function Card3D({ children, className, style }: Card3DProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const handleMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        gsap.to(el, {
          rotationY: x * 20,
          rotationX: y * -15,
          duration: 0.5,
          ease: "power2.out",
          transformPerspective: 1200,
        });

        // Animate child layers with different depths
        const layerEls = el.querySelectorAll("[data-depth]");
        layerEls.forEach((layer) => {
          const depth = parseFloat(layer.getAttribute("data-depth") || "1");
          gsap.to(layer, {
            x: x * depth * 20,
            y: y * depth * -15,
            duration: 0.5,
            ease: "power2.out",
          });
        });
      };

      const handleLeave = () => {
        gsap.to(el, {
          rotationY: 0,
          rotationX: 0,
          duration: 0.6,
          ease: "power3.out",
        });

        el.querySelectorAll("[data-depth]").forEach((layer) => {
          gsap.to(layer, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          });
        });
      };

      el.addEventListener("mousemove", handleMove);
      el.addEventListener("mouseleave", handleLeave);

      return () => {
        el.removeEventListener("mousemove", handleMove);
        el.removeEventListener("mouseleave", handleLeave);
      };
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{ ...style, transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}
