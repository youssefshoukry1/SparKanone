"use client";

import { useId, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

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

  return (
    <section className="pt-3 pb-16 text-[#0B2F1D]" aria-labelledby={`${id}-title`}>
      <motion.div
        className="wrap mx-auto max-w-5xl rounded-2xl bg-[#F8F7E9] px-5 py-8 shadow-[0_12px_32px_rgba(11,47,29,0.08)] sm:p-12 motion-reduce:transform-none! motion-reduce:opacity-100!"
        initial={reducedMotion ? false : { opacity: 0, y: 20 }}
        animate={reducedMotion ? { opacity: 1, y: 0 } : undefined}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: reducedMotion ? 0 : 0.45, ease: "easeOut" }}
      >
        <h2 id={`${id}-title`} className="text-center">Dein Sparpotenzial</h2>

        <div className="mt-8 grid gap-8 md:grid-cols-2 md:items-center">
          <div className="grid min-w-0 gap-6 font-semibold">
            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <label htmlFor={`${id}-spending`}>Monatliche Ausgaben</label>
                <span className="tabular-nums" aria-hidden="true">{euros.format(spending)}</span>
              </div>
              <input
                className="my-1 block h-11 w-full cursor-pointer appearance-none bg-transparent [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-[#ADD266] [&::-webkit-slider-thumb]:-mt-2 [&::-webkit-slider-thumb]:size-6 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#0B2F1D] [&::-moz-range-track]:h-2 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-[#ADD266] [&::-moz-range-thumb]:size-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-[#0B2F1D]"
                id={`${id}-spending`}
                type="range"
                min={minSpending}
                max={maxSpending}
                step={50}
                value={spending}
                aria-valuetext={euros.format(spending)}
                onChange={event => setSpending(event.currentTarget.valueAsNumber)}
              />
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
                    <span className="grid min-h-11 min-w-16 place-items-center rounded-lg border border-[#A6B5A0] px-3 peer-checked:border-[#0B2F1D] peer-checked:bg-[#ADD266] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-[#0B2F1D] motion-safe:transition-colors">
                      {option} %
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>

          <div className="min-w-0 rounded-2xl bg-[#EAF2D6] px-3 py-8 text-center">
            <span id={`${id}-result`} className="font-semibold">Beispielhaftes Cashback pro Jahr</span>
            <output
              aria-labelledby={`${id}-result`}
              htmlFor={`${id}-spending`}
              className="mt-2 block text-5xl font-bold text-[#0B2F1D] tabular-nums"
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
