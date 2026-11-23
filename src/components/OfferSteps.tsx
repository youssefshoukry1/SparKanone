"use client";

import { useEffect, useRef } from "react";
import { steps } from "../content/home";

export default function OfferSteps() {
  const list = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const root = list.current;
    if (!root || !("IntersectionObserver" in window)) return;
    const mobile = matchMedia("(max-width: 700px)");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const rows = Array.from(root.children);
    const seen = new Set<Element>();
    let observer: IntersectionObserver;

    function watch() {
      observer?.disconnect();
      const pending = rows.filter(row => !seen.has(row));
      if (reduced.matches) {
        pending.forEach(row => { seen.add(row); row.removeAttribute("data-waiting"); });
        return;
      }
      pending.forEach(row => row.setAttribute("data-waiting", ""));
      observer = new IntersectionObserver(entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const visible = entry.target === root ? pending : [entry.target];
          for (const row of visible) {
            seen.add(row);
            row.removeAttribute("data-waiting");
          }
          observer.unobserve(entry.target);
        }
      }, { threshold: 0.12 });
      if (mobile.matches) pending.forEach(row => observer.observe(row));
      else if (pending.length && root) observer.observe(root);
    }
    watch();
    mobile.addEventListener("change", watch);
    reduced.addEventListener("change", watch);
    return () => {
      observer?.disconnect();
      mobile.removeEventListener("change", watch);
      reduced.removeEventListener("change", watch);
      rows.forEach(row => row.removeAttribute("data-waiting"));
    };
  }, []);

  return <ol ref={list} className="steps">
    {steps.map(item => <li key={item.title}>
      <div className="step-body"><h3>{item.title}</h3><p>{item.text}</p></div>
    </li>)}
  </ol>;
}
