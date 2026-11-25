"use client";

import { useRef, type ReactNode } from "react";
import { ShoppingBasket } from "lucide-react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "motion/react";

export default function GroceryStoryMedia({ children }: { children: ReactNode }) {
  const frame = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const inView = useInView(frame);
  const { scrollYProgress } = useScroll({ target: frame, offset: ["start end", "end start"] });
  const clipPath = useTransform(scrollYProgress, [0, 0.45], [
    "inset(5% 5% 5% 5% round 24px)",
    "inset(0% 0% 0% 0% round 0px)",
  ]);
  const scale = useTransform(scrollYProgress, [0, 0.45], [0.97, 1.05]);
  const y = useTransform(scrollYProgress, [0, 1], [-5, 5]);

  return (
    <div ref={frame} className="grocery-media" data-visible={inView}>
      <motion.div className="grocery-media-clip" style={reducedMotion ? undefined : { clipPath }}>
        <motion.div className="grocery-media-image" style={reducedMotion ? undefined : { scale, y }}>
          {children}
        </motion.div>
      </motion.div>
      <motion.div
        className="grocery-tag-entry motion-reduce:transform-none! motion-reduce:opacity-100!"
        initial={reducedMotion ? false : { x: 48, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 180, damping: 17 }}
      >
        <div className="grocery-tag">
          <ShoppingBasket size={22} aria-hidden="true" />
          <div><small>Rechenbeispiel</small><strong>12,50 € gespart</strong></div>
        </div>
      </motion.div>
    </div>
  );
}
