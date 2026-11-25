"use client";

import { useId, useState, type CSSProperties } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Coins, Percent } from "lucide-react";
import styles from "./SavingsCalculator.module.css";

const rates = [3, 5] as const;
const minSpending = 500;
const maxSpending = 5000;
const euros = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export default function SavingsCalculator() {
  const id = useId();
  const reducedMotion = useReducedMotion();
  const [spending, setSpending] = useState(2000);
  const [rate, setRate] = useState<(typeof rates)[number]>(3);
  const annualCashback = spending * rate * 12 / 100;
  const spendingProgress = (spending - minSpending) / (maxSpending - minSpending) * 100;
  const thumbOffset = 22 - spendingProgress * 0.44;
  const trackStyle = {
    "--spending-position": `calc(${spendingProgress}% + (${thumbOffset}px))`,
    "--spending-track": "linear-gradient(to right, #0b2f1d var(--spending-position), #e8e4d2 var(--spending-position))",
  } as CSSProperties;

  return (
    <section className="pt-3 pb-16 text-[#0B2F1D]" aria-labelledby={`${id}-title`}>
      <motion.div
        className="wrap mx-auto max-w-[912px] rounded-[22px] bg-[#F8F7E9] px-5 py-8 shadow-[0_10px_24px_#0b2f1d1f] sm:p-11 motion-reduce:transform-none! motion-reduce:opacity-100!"
        initial={reducedMotion ? false : { opacity: 0, y: 20 }}
        animate={reducedMotion ? { opacity: 1, y: 0 } : undefined}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: reducedMotion ? 0 : 0.45, ease: "easeOut" }}
      >
        <h2 id={`${id}-title`} className="text-center text-[clamp(1.9rem,4vw,3rem)]!">Dein Sparpotenzial</h2>

        <div className="mt-8 grid gap-8 md:grid-cols-2 md:items-center">
          <div className="grid min-w-0 gap-6 font-semibold">
            <div>
              <label className="block pb-10" htmlFor={`${id}-spending`}>Monatliche Ausgaben</label>
              <div className={styles.slider} style={trackStyle}>
                <span className={styles.bubble} aria-hidden="true">{euros.format(spending)}</span>
                <input
                  id={`${id}-spending`}
                  type="range"
                  min={minSpending}
                  max={maxSpending}
                  step={50}
                  value={spending}
                  aria-valuetext={euros.format(spending)}
                  onChange={event => setSpending(event.currentTarget.valueAsNumber)}
                />
              </div>
              <div className="flex justify-between gap-2 text-sm text-[#536557]" aria-hidden="true">
                <span>{euros.format(minSpending)}</span>
                <span>{euros.format(maxSpending)}</span>
              </div>
            </div>

            <fieldset>
              <legend>Cashback-Satz im Beispiel</legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {rates.map(option => (
                  <label key={option} className="relative cursor-pointer">
                    <input
                      className="peer sr-only"
                      type="radio"
                      name={`${id}-rate`}
                      value={option}
                      checked={rate === option}
                      onChange={() => setRate(option)}
                    />
                    <span className="grid min-h-11 min-w-16 place-items-center rounded-lg border border-[#A6B5A0] bg-white px-3 peer-checked:border-[#0B2F1D] peer-checked:bg-[#ADD266] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-[#0B2F1D] motion-safe:transition-colors">
                      {option} %
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>

          <div className="relative isolate min-w-0 overflow-hidden rounded-2xl bg-[#0B2F1D] px-3 py-9 text-center text-white">
            <Percent className="pointer-events-none absolute -right-4 -top-4 -z-10 size-24 rounded-full border-2 p-4 text-lime-100/10" aria-hidden="true" />
            <Percent className="pointer-events-none absolute -bottom-5 -left-3 -z-10 size-20 rounded-full border-2 p-3 text-lime-100/10" aria-hidden="true" />
            <Coins className="pointer-events-none absolute top-5 left-5 -z-10 size-8 text-lime-100/10" aria-hidden="true" />
            <span id={`${id}-result`} className="font-medium">Beispielhaftes Cashback pro Jahr</span>
            <output
              aria-labelledby={`${id}-result`}
              htmlFor={`${id}-spending`}
              className="mt-2 block text-5xl font-bold text-[#ADD266] tabular-nums"
            >
              <motion.span
                key={annualCashback}
                className="inline-block motion-reduce:transform-none! motion-reduce:opacity-100!"
                initial={reducedMotion ? false : { opacity: 0.65, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.2, ease: "easeOut" }}
              >
                {euros.format(annualCashback)}
              </motion.span>
            </output>
          </div>
        </div>

        <p className="mx-auto! mt-8! max-w-2xl! text-center text-sm text-[#536557]!">
          Nur ein Rechenbeispiel. Dies ist kein SparKanone-Versprechen. Tatsächliche Raten und Bedingungen müssen verifiziert werden.
        </p>
      </motion.div>
    </section>
  );
}
