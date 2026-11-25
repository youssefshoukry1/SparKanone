import { CalendarClock, ListChecks, ShoppingCart } from "lucide-react";
import * as motion from "motion/react-client";
import { steps } from "../content/home";

const icons = [ShoppingCart, ListChecks, CalendarClock];
const viewport = { once: true, amount: 0.25 };
const ease = [0.22, 1, 0.36, 1] as const;

export default function OfferSteps() {
  return (
    <div className="offer-timeline">
      <motion.div
        className="offer-timeline-line motion-reduce:transform-none!"
        aria-hidden="true"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={viewport}
        transition={{ duration: 1.05, ease: "easeInOut" }}
      />
      <ol className="offer-timeline-list" role="list">
        {steps.map((step, index) => {
          const Icon = icons[index];
          return (
            <motion.li
              className="offer-timeline-step motion-reduce:opacity-100! motion-reduce:transform-none!"
              key={step.title}
              initial={{ opacity: 0, y: -14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.46, delay: index * 0.22, ease }}
            >
              <span className="offer-step-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <div className="offer-step-card">
                <span className="offer-step-icon"><Icon aria-hidden="true" /></span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </div>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}
