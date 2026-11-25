"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";

const steps = [
  ["Vor dem Kauf", "Prüfen Sie, welche Produkte, Händler und Kaufzeiträume zur Aktion gehören."],
  ["Beim Fotografieren", "Legen Sie den Bon flach hin. Händler, Kaufdatum, Artikel und Betrag sollten lesbar sein."],
  ["Vor dem Einreichen", "Prüfen Sie Einsendefrist, Dateiformat und Einreichungsweg beim Veranstalter."],
] as const;

export default function ReceiptTimeline() {
  const list = useRef<HTMLOListElement>(null);
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: list, offset: ["start 75%", "end 45%"] });

  useMotionValueEvent(scrollYProgress, "change", progress => {
    if (!reducedMotion) setActive(Math.min(steps.length - 1, Math.floor(progress * steps.length)));
  });

  return (
    <ol ref={list} className="receipt-tips" role="list">
      {steps.map(([title, text], index) => (
        <li key={title} aria-current={!reducedMotion && active === index ? "step" : undefined}>
          {index === 0 && (
            <motion.span className="receipt-timeline-progress" aria-hidden="true" style={{ scaleY: scrollYProgress }} />
          )}
          <strong>{title}</strong>
          {text}
        </li>
      ))}
    </ol>
  );
}
