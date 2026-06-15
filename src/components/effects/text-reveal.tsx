"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  stagger?: number;
  delay?: number;
}

export function TextReveal({
  children,
  className,
  as: Tag = "h1",
  stagger = 0.03,
  delay = 0,
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;

    const chars = el.querySelectorAll(".char");
    gsap.fromTo(
      chars,
      { y: 60, opacity: 0, rotationX: -90 },
      {
        y: 0,
        opacity: 1,
        rotationX: 0,
        duration: 0.8,
        stagger,
        delay,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, [stagger, delay]);

  const words = children.split(" ");
  const chars = words.map((word, wi) => (
    <span key={wi} className="inline-block whitespace-nowrap">
      {word.split("").map((char, ci) => (
        <span
          key={`${wi}-${ci}`}
          className="char inline-block"
          style={{ perspective: "800px" }}
        >
          {char}
        </span>
      ))}
      {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
    </span>
  ));

  return (
    <div ref={ref}>
      <Tag className={className}>{chars}</Tag>
    </div>
  );
}
