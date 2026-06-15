"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import gsap from "gsap";
import {
  LayoutDashboard, Users, Calendar, FileText, Briefcase,
  Package, UserCog, Settings, ChevronLeft, ChevronRight,
  Bell, LogOut, Menu, Search,
} from "lucide-react";
import { ThemeToggle } from "@/components/dashboard/theme-toggle";
import { useAuth } from "@/components/dashboard/auth-provider";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Patients", href: "/dashboard/patients", icon: Users },
  { label: "Appointments", href: "/dashboard/appointments", icon: Calendar },
  { label: "Invoices", href: "/dashboard/invoices", icon: FileText },
  { label: "Services", href: "/dashboard/services", icon: Briefcase },
  { label: "Inventory", href: "/dashboard/inventory", icon: Package },
  { label: "Employees", href: "/dashboard/employees", icon: UserCog },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    if (!sidebarRef.current) return;
    gsap.fromTo(
      sidebarRef.current,
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.4, ease: "power3.out" }
    );
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface-secondary">
        <div className="w-8 h-8 border-2 border-primary-300 border-t-primary-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-surface-secondary">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={cn(
          "fixed lg:sticky top-0 left-0 z-50 h-screen flex flex-col bg-surface border-r border-border/50 transition-all duration-300",
          collapsed ? "w-16" : "w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className={cn(
          "flex items-center h-16 px-4 border-b border-border/30",
          collapsed ? "justify-center" : "justify-between"
        )}>
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 shadow-lg shrink-0">
              <span className="text-white font-bold text-sm">H</span>
            </div>
            {!collapsed && (
              <span className="font-semibold text-base tracking-tight text-text-primary">
                Health<span className="text-primary-600">ERP</span>
              </span>
            )}
          </Link>
          {!collapsed && (
            <button onClick={() => setCollapsed(true)} className="hidden lg:flex h-7 w-7 items-center justify-center rounded-md text-text-tertiary hover:text-text-primary hover:bg-surface-secondary transition-colors">
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group",
                  collapsed && "justify-center",
                  active
                    ? "bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300"
                    : "text-text-secondary hover:text-text-primary hover:bg-surface-tertiary/50"
                )}
              >
                <Icon className={cn("h-5 w-5 shrink-0", active && "text-primary-600 dark:text-primary-400")} />
                {!collapsed && <span>{item.label}</span>}
                {active && !collapsed && (
                  <span className="ml-auto w-1.5 h-5 rounded-full bg-primary-500" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Expand button */}
        {collapsed && (
          <div className="p-2 border-t border-border/30">
            <button
              onClick={() => setCollapsed(false)}
              className="flex items-center justify-center w-full h-10 rounded-xl text-text-tertiary hover:text-text-primary hover:bg-surface-secondary transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Logout */}
        <div className={cn("p-3 border-t border-border/30", collapsed && "px-2")}>
          <button
            onClick={() => { logout(); router.push("/"); }}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-text-tertiary hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors w-full",
              collapsed && "justify-center"
            )}
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {!collapsed && <span>Log out</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top header */}
        <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 sm:px-6 bg-surface/80 backdrop-blur-xl border-b border-border/30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden flex items-center justify-center h-9 w-9 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-secondary transition-colors"
            >
              <Menu className="h-5 w-5" />
            </button>
            <button className="hidden sm:flex items-center gap-2 w-64 lg:w-80 px-3 py-2 rounded-lg bg-surface-secondary border border-border text-sm text-text-tertiary hover:border-primary-400 hover:text-text-secondary transition-colors">
              <Search className="h-4 w-4 shrink-0" />
              <span className="truncate">Search patients, appointments...</span>
              <kbd className="ml-auto hidden lg:inline-flex items-center gap-0.5 rounded border border-border bg-surface px-1.5 py-0.5 text-[10px] font-medium text-text-tertiary">
                ⌘K
              </kbd>
            </button>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border/50 bg-surface text-text-secondary hover:text-text-primary transition-colors">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-primary-500 text-[8px] font-bold text-white flex items-center justify-center">3</span>
            </button>
            <div className="flex items-center gap-2.5 pl-2 border-l border-border/30">
              <div className="hidden sm:block text-right">
                <p className="text-xs font-medium text-text-primary">{user.name}</p>
                <p className="text-[10px] text-text-tertiary">{user.role}</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center text-sm font-semibold text-white">
                {user.avatar}
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
