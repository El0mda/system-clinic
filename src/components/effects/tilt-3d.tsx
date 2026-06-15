"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";

interface Tilt3DProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  perspective?: number;
  scale?: number;
  speed?: number;
  glare?: boolean;
  shine?: boolean;
}

export function Tilt3D({
  children,
  className,
  maxTilt = 15,
  perspective = 1200,
  scale = 1.02,
  speed = 400,
  glare = true,
  shine = true,
}: Tilt3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const handleMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        const tiltX = (y - 0.5) * -maxTilt;
        const tiltY = (x - 0.5) * maxTilt;

        gsap.to(el, {
          rotationX: tiltX,
          rotationY: tiltY,
          scale: scale,
          duration: speed / 1000,
          ease: "power2.out",
          transformPerspective: perspective,
        });

        // Glare effect
        if (glare && glareRef.current) {
          const glareX = x * 100;
          const glareY = y * 100;
          gsap.to(glareRef.current, {
            background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.15), transparent 60%)`,
            duration: speed / 1000,
            ease: "power2.out",
          });
        }

        // Shine effect
        if (shine && shineRef.current) {
          const angle = Math.atan2(y - 0.5, x - 0.5) * (180 / Math.PI);
          gsap.to(shineRef.current, {
            background: `linear-gradient(${angle}deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0) 100%)`,
            duration: speed / 1000,
            ease: "power2.out",
          });
        }
      };

      const handleLeave = () => {
        gsap.to(el, {
          rotationX: 0,
          rotationY: 0,
          scale: 1,
          duration: 0.6,
          ease: "power3.out",
        });

        if (glareRef.current) {
          gsap.to(glareRef.current, {
            background: "transparent",
            duration: 0.6,
            ease: "power3.out",
          });
        }

        if (shineRef.current) {
          gsap.to(shineRef.current, {
            background: "transparent",
            duration: 0.6,
            ease: "power3.out",
          });
        }
      };

      el.addEventListener("mousemove", handleMove);
      el.addEventListener("mouseleave", handleLeave);

      return () => {
        el.removeEventListener("mousemove", handleMove);
        el.removeEventListener("mouseleave", handleLeave);
      };
    });

    return () => ctx.revert();
  }, [maxTilt, perspective, scale, speed, glare, shine]);

  return (
    <div
      ref={ref}
      className={`relative ${className ?? ""}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
      {glare && (
        <div
          ref={glareRef}
          className="absolute inset-0 rounded-[inherit] pointer-events-none"
          style={{ mixBlendMode: "overlay" }}
        />
      )}
      {shine && (
        <div
          ref={shineRef}
          className="absolute inset-0 rounded-[inherit] pointer-events-none"
        />
      )}
    </div>
  );
}
