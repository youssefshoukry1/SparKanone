"use client";

import { useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";
import { questions } from "../content/home";

export default function HomeFaq() {
  const [open, setOpen] = useState<number | null>(null);
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = section.current;
    if (!element || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
        element.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 340, easing: "ease-out" });
      }
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={section} className="section home-faq" id="fragen" aria-labelledby="faq-title">
      <div className="wrap split">
        <h2 id="faq-title">Häufige Fragen</h2>
        <div>
          {questions.map(({ title, text }, index) => {
            const expanded = open === index;
            const answer = `faq-answer-${index}`;
            return (
              <div className="faq-row" key={title}>
                <h3>
                  <button type="button" aria-expanded={expanded} aria-controls={answer}
                    onClick={() => setOpen(current => current === index ? null : index)}>
                    {title}<span className="faq-mark" aria-hidden="true"><Plus size={16} /></span>
                  </button>
                </h3>
                <div id={answer} className="faq-answer" aria-hidden={!expanded}>
                  <div><p>{text}</p></div>
                </div>
              </div>
            );
          })}
          <a className="link" href="#vorteile">Zu den Sparbeispielen</a>
        </div>
      </div>
    </section>
  );
}
