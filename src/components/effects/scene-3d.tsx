"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Scene3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Create geometric shapes
      const shapes: HTMLDivElement[] = [];
      const geometries = [
        { type: "cube", size: 30, color: "from-primary-400/20 to-accent-400/20" },
        { type: "sphere", size: 40, color: "from-primary-300/15 to-accent-300/15" },
        { type: "cube", size: 20, color: "from-accent-400/20 to-primary-400/20" },
        { type: "sphere", size: 25, color: "from-primary-200/15 to-accent-200/15" },
        { type: "cube", size: 35, color: "from-accent-300/10 to-primary-300/10" },
      ];

      geometries.forEach((geo) => {
        const shape = document.createElement("div");
        const isCube = geo.type === "cube";
        shape.className = `absolute ${isCube ? "rounded-xl" : "rounded-full"} bg-gradient-to-br ${geo.color} border border-white/10 backdrop-blur-sm`;
        shape.style.cssText = `
          width: ${geo.size}px;
          height: ${geo.size}px;
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          transform-style: preserve-3d;
        `;
        container.appendChild(shape);
        shapes.push(shape);

        // 3D floating animation
        gsap.to(shape, {
          y: `random(-30, 30)`,
          x: `random(-20, 20)`,
          rotationX: `random(-180, 180)`,
          rotationY: `random(-180, 180)`,
          rotationZ: `random(-180, 180)`,
          duration: 6 + Math.random() * 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: Math.random() * 2,
        });

        // Mouse parallax
        const handleMouse = (e: MouseEvent) => {
          const x = (e.clientX / window.innerWidth - 0.5) * 2;
          const y = (e.clientY / window.innerHeight - 0.5) * 2;
          gsap.to(shape, {
            x: x * 40,
            y: y * 30,
            rotationX: y * 20,
            rotationY: x * 20,
            duration: 2,
            ease: "power2.out",
          });
        };

        window.addEventListener("mousemove", handleMouse);

        return () => {
          window.removeEventListener("mousemove", handleMouse);
        };
      });

      // Initial floating animation for container
      gsap.to(container, {
        rotationY: 5,
        rotationX: -3,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
    />
  );
}
