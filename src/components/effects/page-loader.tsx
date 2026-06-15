"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function PageLoader() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => setLoaded(true),
    });

    // Progress bar fill
    tl.to(barRef.current, {
      width: "100%",
      duration: 1.2,
      ease: "power3.inOut",
    });

    // Text fade
    tl.to(textRef.current, {
      opacity: 0,
      y: -10,
      duration: 0.3,
    }, "-=0.2");

    // Overlay slide up
    tl.to(overlayRef.current, {
      y: "-100%",
      duration: 0.8,
      ease: "power4.inOut",
    });

    // Cleanup
    tl.call(() => {
      if (overlayRef.current) {
        overlayRef.current.style.display = "none";
      }
    });
  }, []);

  if (loaded) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] bg-surface flex flex-col items-center justify-center"
    >
      <div ref={textRef} className="flex flex-col items-center gap-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 shadow-lg">
            <span className="text-white font-bold text-sm">H</span>
          </div>
          <span className="font-semibold text-xl tracking-tight text-text-primary">
            Health<span className="text-primary-600">ERP</span>
          </span>
        </div>

        <div className="w-48 h-[2px] bg-surface-tertiary rounded-full overflow-hidden">
          <div
            ref={barRef}
            className="h-full w-0 rounded-full"
            style={{
              background: "linear-gradient(90deg, #6366f1, #a855f7)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
