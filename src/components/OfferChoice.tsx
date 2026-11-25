"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, ChevronRight, Star, TicketPercent } from "lucide-react";
import offerArtwork from "../images/image.png";
import styles from "./OfferChoice.module.css";

const offers = [
  {
    id: "discount",
    icon: Star,
    label: "10 € Sofortrabatt",
    detail: "Gilt für diese Tasche.",
    today: "50 €",
    result: "Wenn Sie nur die Tasche kaufen möchten, sparen Sie mit diesem Angebot sofort 10 €.",
  },
  {
    id: "voucher",
    icon: TicketPercent,
    label: "15 € Gutschein",
    detail: "Gilt für Ihre nächste Bestellung.",
    today: "60 €",
    result: "Der Gutschein kann sich lohnen, wenn Sie ohnehin eine weitere Bestellung planen und die Gutscheinbedingungen erfüllen. Ohne weiteren Einkauf bleibt es bei 60 € für die Tasche.",
  },
] as const;

export default function OfferChoice() {
  const [selected, setSelected] = useState<(typeof offers)[number]>();

  return (
    <section id="angebotswahl" className={styles.section} aria-labelledby="offer-choice-title">
      <div className={`wrap ${styles.panel}`}>
        <div className={styles.intro}>
          <div>
            <h2 id="offer-choice-title">Welches <br />Angebot würden <br />Sie wählen?</h2>
            <p>Die Tasche kostet regulär 60 €. Wählen Sie eines der beiden Beispielangebote.</p>
          </div>
          <Image className={styles.artwork} src={offerArtwork} alt="" sizes="(max-width: 700px) 85vw, 45vw" />
        </div>

        <div className={styles.offers} role="group" aria-label="Beispielangebote">
          {offers.map(offer => {
            const active = selected?.id === offer.id;
            const Icon = offer.icon;

            return (
              <button
                key={offer.id}
                type="button"
                className={styles.offer}
                aria-pressed={active}
                aria-controls="offer-choice-result"
                onClick={() => setSelected(offer)}
              >
                <span className={styles.icon}><Icon size={23} aria-hidden="true" /></span>
                <span className={styles.label}>{offer.label}</span>
                <span className={styles.detail}>{offer.detail}</span>
                <span className={styles.price}>
                  <span>Heute zahlen</span> <strong>{offer.today}</strong>
                </span>
                <span className={styles.select} aria-hidden="true">
                  {active ? <><Check size={16} /> Ausgewählt</> : <>Angebot auswählen <ChevronRight size={16} /></>}
                </span>
              </button>
            );
          })}
        </div>

        <div id="offer-choice-result" aria-live="polite" aria-atomic="true">
          {selected && (
            <p className={styles.result} key={selected.id}>
              <strong>{selected.label}</strong>
              {selected.result}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
