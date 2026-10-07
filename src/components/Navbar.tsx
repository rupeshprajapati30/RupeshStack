"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Download, Menu, X } from "lucide-react";
import type { NavItem } from "@/types/portfolio";
import { cn } from "@/lib/utils";
import { isUsableLink } from "@/lib/portfolio";

interface NavbarProps {
  shortName: string;
  name: string;
  items: NavItem[];
  resumeUrl: string;
  resumeLabel: string;
  openMenuLabel: string;
  closeMenuLabel: string;
}

export function Navbar({
  shortName,
  name,
  items,
  resumeUrl,
  resumeLabel,
  openMenuLabel,
  closeMenuLabel,
}: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(items[0]?.href ?? "");
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Glass background once the page is scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the link of the section currently in the middle of the viewport.
  useEffect(() => {
    const sections = items
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  const closeMenu = useCallback((restoreFocus = false) => {
    setOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  }, []);

  // Escape closes the mobile menu; desktop resize resets it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu(true);
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onResize = () => desktop.matches && closeMenu();
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    menuRef.current?.querySelector<HTMLElement>("a")?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [open, closeMenu]);

  const showResume = isUsableLink(resumeUrl);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open
          ? "border-b border-border/70 bg-background/75 shadow-[0_10px_30px_-20px_var(--color-primary)] backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <nav aria-label="Primary" className="container-page flex h-18 items-center justify-between gap-6">
        <a href="#home" className="group flex items-center gap-3 rounded-xl" aria-label={`${name} — home`}>
          <span className="grid size-10 place-items-center rounded-xl bg-linear-to-br from-primary to-secondary font-mono text-sm font-bold text-background shadow-[0_0_24px_-6px_var(--color-primary)] transition-transform group-hover:rotate-6">
            {shortName}
          </span>
          <span className="hidden font-semibold tracking-tight text-text sm:inline">{name}</span>
        </a>

        <ul className="hidden items-center gap-7 text-sm font-medium lg:flex">
          {items.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="nav-link" aria-current={active === item.href ? "true" : undefined}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          {showResume ? (
            <a href={resumeUrl} download className="btn btn-ghost hidden min-h-10 px-4 py-2 text-sm sm:inline-flex">
              <Download aria-hidden="true" className="size-4" />
              {resumeLabel}
            </a>
          ) : null}
          <button
            ref={toggleRef}
            type="button"
            className="grid size-11 place-items-center rounded-xl border border-border bg-surface/70 text-text transition hover:border-primary/60 hover:text-primary lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? closeMenuLabel : openMenuLabel}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        ref={menuRef}
        hidden={!open}
        className="border-t border-border/70 bg-background/95 backdrop-blur-xl lg:hidden"
      >
        <ul className="container-page flex flex-col gap-1 py-4">
          {items.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => closeMenu()}
                aria-current={active === item.href ? "true" : undefined}
                className={cn(
                  "flex min-h-12 items-center rounded-xl px-4 text-base font-medium transition",
                  active === item.href
                    ? "bg-primary/10 text-primary"
                    : "text-muted hover:bg-surface hover:text-text",
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
          {showResume ? (
            <li className="pt-2 sm:hidden">
              <a href={resumeUrl} download className="btn btn-ghost w-full">
                <Download aria-hidden="true" className="size-4" />
                {resumeLabel}
              </a>
            </li>
          ) : null}
        </ul>
      </div>
    </header>
  );
}
