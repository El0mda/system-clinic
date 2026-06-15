"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/i18n/language-toggle";
import { useT } from "@/components/i18n/language-provider";
import { cn } from "@/lib/utils";

export function Navbar() {
  const t = useT();
  const featureDropdown = [
    { label: t("navbar.featureDropdown.patientManagement"), href: "#features" },
    { label: t("navbar.featureDropdown.appointments"), href: "#features" },
    { label: t("navbar.featureDropdown.billing"), href: "#features" },
    { label: t("navbar.featureDropdown.analytics"), href: "#features" },
  ];
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // GSAP mobile menu animation
  useEffect(() => {
    if (!mobileMenuRef.current) return;

    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.fromTo(
        mobileMenuRef.current.children,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.06, ease: "power3.out" }
      );
    } else {
      document.body.style.overflow = "";
    }

    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-surface/80 backdrop-blur-xl border-b border-border/50 shadow-sm"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16 sm:h-18">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 shadow-lg group-hover:shadow-xl group-hover:shadow-primary-500/30 transition-shadow">
            <span className="text-white font-bold text-sm">H</span>
          </div>
          <span className="font-semibold text-lg tracking-tight text-text-primary">
            Health<span className="text-primary-600">ERP</span>
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {/* Features with dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors rounded-lg hover:bg-surface-secondary"
            >
              {t("navbar.features")}
              <ChevronDown className={cn(
                "h-3.5 w-3.5 transition-transform duration-200",
                dropdownOpen && "rotate-180"
              )} />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute top-full left-0 mt-1 w-56 rounded-xl border border-border/50 bg-surface shadow-xl shadow-primary-500/5 p-1.5"
                >
                  {featureDropdown.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="block px-3 py-2.5 text-sm text-text-secondary hover:text-text-primary hover:bg-surface-secondary rounded-lg transition-colors"
                    >
                      {item.label}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a
            href="#demo"
            className="px-3 py-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors rounded-lg hover:bg-surface-secondary"
          >
            {t("navbar.demo")}
          </a>
          <a
            href="#pricing"
            className="px-3 py-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors rounded-lg hover:bg-surface-secondary"
          >
            {t("navbar.pricing")}
          </a>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <LanguageToggle />
          <Button variant="ghost" size="sm" onClick={() => router.push("/login")}>
            {t("common.login")}
          </Button>
          <Button variant="primary" size="sm" onClick={() => router.push("/register")}>
            {t("common.getStarted")}
          </Button>
        </div>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-2">
          <LanguageToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-center h-10 w-10 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-secondary transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
            className="md:hidden border-t border-border/50 bg-surface/95 backdrop-blur-xl overflow-hidden"
          >
            <div ref={mobileMenuRef} className="px-4 py-5 space-y-1">
              {[
                { label: t("navbar.features"), href: "#features" },
                { label: t("navbar.demo"), href: "#demo" },
                { label: t("navbar.pricing"), href: "#pricing" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-3 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface-secondary rounded-lg transition-colors"
                >
                  {link.label}
                </a>
              ))}

              <div className="flex flex-col gap-2 pt-4 mt-2 border-t border-border/50">
                <Button variant="ghost" size="md" className="w-full justify-center" onClick={() => router.push("/login")}>
                  {t("common.login")}
                </Button>
                <Button variant="primary" size="md" className="w-full justify-center" onClick={() => router.push("/register")}>
                  {t("common.getStartedFree")}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
