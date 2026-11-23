"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { BadgePercent, ChevronDown, CircleHelp, Compass, ListOrdered, Menu, X } from "lucide-react";
import { navigation } from "../../content/home";
import Brand from "../../components/Brand";

function RollingLabel({ label }: { label: string }) {
  return <span className="nav-label"><span>{label}</span><span aria-hidden="true">{label}</span></span>;
}

const compactIcons = { "/#ueberblick": Compass, "/#ablauf": ListOrdered, "/#fragen": CircleHelp };

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [topics, setTopics] = useState(false);
  const [compact, setCompact] = useState(false);
  const header = useRef<HTMLElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const topicTrigger = useRef<HTMLButtonElement>(null);
  function close() { setOpen(false); setTopics(false); }
  useEffect(() => {
    let previous = window.scrollY;
    function scroll() {
      const current = Math.max(0, window.scrollY);
      if (current <= 80) setCompact(false);
      else if (Math.abs(current - previous) < 6) return;
      else setCompact(current > previous);
      previous = current;
    }
    window.addEventListener("scroll", scroll, { passive: true });
    const outside = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) close();
    };
    const small = matchMedia("(max-width: 820px)");
    document.addEventListener("pointerdown", outside);
    small.addEventListener("change", close);
    return () => {
      window.removeEventListener("scroll", scroll);
      document.removeEventListener("pointerdown", outside);
      small.removeEventListener("change", close);
    };
  }, []);
  return <header ref={header} className="header" data-compact={compact} onBlur={event => {
    if (!event.currentTarget.contains(event.relatedTarget)) close();
  }} onKeyDown={event => {
    if (event.key !== "Escape") return;
    if (topics) { setTopics(false); topicTrigger.current?.focus(); }
    else if (open) { close(); trigger.current?.focus(); }
  }}>
    <div className="menu-scrim" data-open={open} aria-hidden="true" onClick={() => { close(); trigger.current?.focus(); }} />
    <div className="wrap navrow">
      <Brand />
      <button className="menu" ref={trigger} aria-expanded={open} aria-controls="navigation" onClick={() => { setOpen(!open); setTopics(false); }}>
        {open ? <X /> : <Menu />} Menü
      </button>
      <nav className={open ? "navigation expanded" : "navigation"} id="navigation" aria-label="Hauptnavigation">
        {navigation.map(link => {
          const Icon = compactIcons[link.href as keyof typeof compactIcons];
          return link.href === "/#vorteile" ? (
          <div className="nav-group" key={link.href}>
            <button ref={topicTrigger} aria-label={link.label} title={link.label} aria-expanded={topics} aria-controls="nav-topics" onClick={() => setTopics(!topics)}>
              <BadgePercent className="compact-icon" size={19} aria-hidden="true" />
              <RollingLabel label={link.label} /><ChevronDown size={15} aria-hidden="true" />
            </button>
            <div id="nav-topics" hidden={!topics}>
              <Link href="/#online-einkauf" onClick={close}>Online einkaufen</Link>
              <Link href="/#einkauf" onClick={close}>Im Supermarkt</Link>
              <Link href="/#kurztrip" onClick={close}>Auf Reisen</Link>
            </div>
          </div>
        ) : <Link key={link.href} href={link.href} aria-label={link.label} title={link.label} onClick={close}>
          {Icon && <Icon className="compact-icon" size={19} aria-hidden="true" />}
          <RollingLabel label={link.label} /></Link>;
        })}
        <Link className="nav-cta" href="/#vorteile" onClick={close}>Sparbeispiele ansehen</Link>
      </nav>
    </div>
  </header>;
}
