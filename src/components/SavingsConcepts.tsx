"use client";

import { BadgePercent, Wallet, Ticket } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { concepts } from "../content/home";

const icons = [BadgePercent, Wallet, Ticket];
const viewport = { once: true, amount: 0.5 };
const cardOffsets = ["60%", "0%", "-60%"];

export default function SavingsConcepts() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="section tint" aria-labelledby="savings-concepts-title">
      <div className="wrap">
        <motion.h2
          id="savings-concepts-title"
          className="motion-reduce:opacity-100!"
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={reducedMotion ? { opacity: 1 } : undefined}
          whileInView={reducedMotion ? undefined : { opacity: 1 }}
          viewport={viewport}
          transition={{ duration: reducedMotion ? 0 : 0.55, ease: "easeOut" }}
        >
          Drei Arten zu sparen
        </motion.h2>
        <p>Diese Begriffe begegnen Ihnen beim Vergleich von Angeboten.</p>
        <div className="cards savings-concept-cards">
          {concepts.map((item, index) => {
            const Icon = icons[index];
            return (
              <motion.article
                key={item.title}
                className="savings-concept-card motion-reduce:transform-none! motion-reduce:opacity-100!"
                initial={reducedMotion ? false : { x: cardOffsets[index], y: 12, opacity: 0 }}
                animate={reducedMotion ? { x: "0%", y: 0, opacity: 1 } : undefined}
                whileInView={reducedMotion ? undefined : { x: "0%", y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: reducedMotion ? 0 : 0.7, delay: index === 1 ? 0 : 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.div
                  className="card-icon motion-reduce:transform-none!"
                  aria-hidden="true"
                  whileInView={reducedMotion ? undefined : { rotate: [0, -13, 11, -6, 3, 0] }}
                  viewport={viewport}
                  transition={{ duration: 0.8, delay: index * 0.1, ease: "easeInOut" }}
                >
                  <Icon size="100%" />
                </motion.div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
