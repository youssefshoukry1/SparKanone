"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Brand from "../../components/Brand";

const links = [
  { href: "/#vorteile", label: "Sparvorteile" },
  { href: "/#gewinnspiele", label: "Gewinnspiele" },
  { href: "/#ablauf", label: "So geht’s" },
  { href: "/#fragen", label: "FAQ" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    function dismissOutside(event: PointerEvent) {
      if (!header.current?.contains(event.target as Node)) setOpen(false);
    }

    function resetMenu() {
      setOpen(false);
    }

    const mobile = window.matchMedia("(max-width: 700px)");
    document.addEventListener("pointerdown", dismissOutside);
    mobile.addEventListener("change", resetMenu);

    return () => {
      document.removeEventListener("pointerdown", dismissOutside);
      mobile.removeEventListener("change", resetMenu);
    };
  }, [open]);

  return (
    <header
      ref={header}
      className="header"
      onBlur={event => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      onKeyDown={event => {
        if (event.key !== "Escape" || !open) return;
        setOpen(false);
        trigger.current?.focus();
      }}
    >
      <div className="wrap navrow">
        <Brand />
        <button
          type="button"
          className="menu"
          ref={trigger}
          aria-controls="navigation"
          aria-expanded={open}
          onClick={() => setOpen(current => !current)}
        >
          {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          Menü
        </button>
        <nav className={open ? "navigation expanded" : "navigation"} id="navigation" aria-label="Hauptnavigation">
          {links.map(link => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
