"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

export default function PrizeDrawPhoto({ children }: { children: ReactNode }) {
  const frame = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: frame, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-12, 12]);

  return (
    <motion.figure
      ref={frame}
      className="draw-photo"
      initial={reducedMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      <div className="draw-photo-mask">
        <motion.div
          className="draw-photo-reveal motion-reduce:transform-none! motion-reduce:[clip-path:none]!"
          variants={{
            hidden: { clipPath: "inset(100% 0% 0% 0%)", scale: 1.08 },
            visible: { clipPath: "inset(0% 0% 0% 0%)", scale: 1 },
          }}
          transition={{ duration: reducedMotion ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div className="draw-photo-parallax motion-reduce:transform-none!" style={reducedMotion ? undefined : { y }}>
            {children}
          </motion.div>
        </motion.div>
      </div>
    </motion.figure>
  );
}
