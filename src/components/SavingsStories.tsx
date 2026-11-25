import Image from "next/image";
import * as motion from "motion/react-client";
import { BedDouble, BusFront, Luggage, Plane } from "lucide-react";
import groceries from "../images/groceries.webp";
import groceriesMobile from "../images/groceries-mobile.webp";
import onlineArt from "../images/topic-online.webp";
import marketArt from "../images/topic-market.webp";
import tripArt from "../images/topic-plane.webp";
import voucher from "../images/topic-voucher.webp";
import tomato from "../images/topic-tomato.webp";
import suitcase from "../images/topic-suitcase.webp";
import travelMobile from "../images/travel-mobile.webp";
import receipt from "../images/receipt.webp";
import receiptMobile from "../images/receipt-mobile.webp";
import draw from "../images/draw.webp";
import drawMobile from "../images/draw-mobile.webp";
import type { StaticImageData } from "next/image";

function StoryPhoto({ photo, mobile, alt }: { photo: StaticImageData; mobile: StaticImageData; alt: string }) {
  return (
    <picture>
      <source media="(max-width: 700px)" srcSet={mobile.src} />
      <Image src={photo} alt={alt} unoptimized />
    </picture>
  );
}

const topics = [
  { title: "Online einkaufen", detail: "Was ein Gutschein nach Abzug der Versandkosten bringt.", image: onlineArt, prop: voucher, href: "#online-einkauf" },
  { title: "Im Supermarkt", detail: "Welche Ersparnis auf dem Kassenbon ankommt.", image: marketArt, prop: tomato, href: "#einkauf" },
  { title: "Auf Reisen", detail: "Welche Kosten zum Flugpreis dazukommen.", image: tripArt, prop: suitcase, href: "#kurztrip" },
];

export function StoryOverview() {
  return (
    <section className="section tint" id="vorteile" aria-labelledby="themen">
      <div className="wrap">
        <h2 id="themen">Wo möchten Sie sparen?</h2>
        <div className="topic-grid">
          {topics.map(topic => (
            <a key={topic.href} className="topic-card" href={topic.href}>
              <span className="topic-art" aria-hidden="true">
                <Image src={topic.image} alt="" unoptimized />
                <Image className="topic-prop" src={topic.prop} alt="" unoptimized />
              </span>
              <div><h3>{topic.title}</h3><p>{topic.detail}</p></div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function GroceryStory() {
  return (
    <motion.section
      className="wrap grocery-story motion-reduce:transform-none! motion-reduce:opacity-100!"
      aria-labelledby="einkauf"
      initial={{ x: "-3%", opacity: 0 }}
      whileInView={{ x: "0%", opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
    >
      <StoryPhoto photo={groceries} mobile={groceriesMobile} alt="Zwei Menschen wählen in der Obstabteilung eines Supermarkts Äpfel aus." />
      <div className="grocery-copy">
        <h2 id="einkauf">Was bleibt nach dem Einkauf übrig?</h2>
        <p>Auf dem Kassenbon sehen Sie, welche Rabatte abgezogen wurden. Vergleichen Sie den Betrag mit Ihrem Wochenbudget.</p>
      </div>
    </motion.section>
  );
}

export function ShoppingStory() {
  return (
    <motion.section
      id="online-einkauf"
      className="wrap shopping-story motion-reduce:transform-none! motion-reduce:opacity-100!"
      aria-labelledby="voucher-title"
      initial={{ x: "3%", opacity: 0 }}
      whileInView={{ x: "0%", opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
    >
      <div className="voucher-face">
        <h2 id="voucher-title">Was bleibt vom<br />5‑€‑Gutschein?</h2>
        <p>Die gleiche Tasse kostet im Laden und online 30 €. Beim Onlinekauf fallen 4 € Versand an.</p>
        <div className="voucher-result"><strong>1 €</strong><span>günstiger als<br />im Laden</span></div>
      </div>
      <div className="voucher-stub">
          <h3>Ihr Online-Warenkorb</h3>
          <dl>
            <div><dt>Artikelpreis</dt><dd>30 €</dd></div>
            <div><dt>Gutschein</dt><dd>−5 €</dd></div>
            <div><dt>Versand</dt><dd>+4 €</dd></div>
            <div className="total"><dt>Gesamtpreis</dt><dd>29 €</dd></div>
          </dl>
      </div>
    </motion.section>
  );
}

export function TravelStory() {
  return (
    <motion.section
      className="wrap travel-story motion-reduce:transform-none! motion-reduce:opacity-100!"
      aria-labelledby="kurztrip"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
      }}
    >
      <header className="trip-heading">
        <motion.div
          className="trip-photo motion-reduce:transform-none! motion-reduce:opacity-100!"
          variants={{
            hidden: { opacity: 0, scale: 0.86, rotate: -10 },
            visible: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.6, delay: 0.2, ease: "easeOut" } },
          }}
        >
          <Image src={travelMobile} width={120} height={120} alt="" unoptimized />
        </motion.div>
        <motion.div
          className="motion-reduce:transform-none! motion-reduce:opacity-100!"
          variants={{
            hidden: { opacity: 0, y: 14 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.3, ease: "easeOut" } },
          }}
        >
          <h2 id="kurztrip">Was kostet der Kurztrip insgesamt?</h2>
          <p>Vergleichen Sie vor der Buchung, was Sie für die ganze Reise bezahlen.</p>
        </motion.div>
      </header>
      <dl className="trip-costs">
        {[
          { Icon: Plane, label: "Flug", text: "Was kosten Hin- und Rückflug zusammen?" },
          { Icon: Luggage, label: "Gepäck", text: "Ist Ihr Koffer im gewählten Tarif enthalten?" },
          { Icon: BusFront, label: "Transfer", text: "Was kosten die Fahrten zum Hotel und zurück?" },
          { Icon: BedDouble, label: "Unterkunft", text: "Wie viel zahlen Sie für alle Nächte inklusive Gebühren?" },
        ].map(({ Icon, label, text }, index) => {
          const delay = 0.4 + index * 0.15;
          return (
            <motion.div
              key={label}
              className="trip-item motion-reduce:transform-none! motion-reduce:opacity-100!"
              variants={{
                hidden: { opacity: 0, y: 20, "--trip-swing": "paused" },
                visible: {
                  opacity: 1, y: 0,
                  transition: { duration: 0.5, delay, ease: "easeOut" },
                  transitionEnd: { "--trip-swing": "running" },
                },
              }}
            >
              <motion.span
                className="trip-divider motion-reduce:transform-none!"
                aria-hidden="true"
                variants={{
                  hidden: { scaleX: 0 },
                  visible: { scaleX: 1, transition: { duration: 0.6, delay, ease: "easeOut" } },
                }}
              />
              <dt><span className="trip-icon" aria-hidden="true"><Icon size={22} /></span>{label}</dt>
              <dd>{text}</dd>
            </motion.div>
          );
        })}
      </dl>
    </motion.section>
  );
}

export function ReceiptGuide() {
  return (
    <motion.section
      id="kassenbon"
      aria-labelledby="bon-titel"
      className="wrap receipt-guide motion-reduce:transform-none! motion-reduce:opacity-100!"
      initial={{ x: "3%", opacity: 0 }}
      whileInView={{ x: "0%", opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
    >
      <div>
        <h2 id="bon-titel">Wenn der Kassenbon als Nachweis zählt</h2>
        <p>Manche Cashback-Aktionen verlangen einen Kaufbeleg. Ein Blick in die Aktionsbedingungen vor dem Einkauf erspart Ihnen später die Suche nach dem richtigen Nachweis.</p>
        <ul className="receipt-tips">
          <li><strong>Vor dem Kauf</strong> Prüfen Sie, welche Produkte, Händler und Kaufzeiträume zur Aktion gehören.</li>
          <li><strong>Beim Fotografieren</strong> Legen Sie den Bon flach hin. Händler, Kaufdatum, Artikel und Betrag sollten lesbar sein.</li>
          <li><strong>Vor dem Einreichen</strong> Prüfen Sie Einsendefrist, Dateiformat und Einreichungsweg beim Veranstalter.</li>
        </ul>
      </div>
      <StoryPhoto photo={receipt} mobile={receiptMobile} alt="Eine Käuferin fotografiert ihren Kassenbon mit dem Smartphone." />
    </motion.section>
  );
}

const drawQuestions = [
  ["Wer darf mitmachen?", "Achten Sie auf Mindestalter, Wohnort und eine mögliche Mitgliedschaft."],
  ["Was umfasst der Gewinn?", "Bei einer verlosten Reise können etwa Anreise oder Verpflegung extra kosten."],
  ["Wann fällt die Entscheidung?", "Suchen Sie nach Teilnahmeschluss, Auslosung und dem Weg, auf dem Gewinner benachrichtigt werden."],
] as const;

const drawEase = [0.22, 1, 0.36, 1] as const;

export function PrizeDrawGuide() {
  return (
    <motion.section
      id="gewinnspiele"
      aria-labelledby="los-titel"
      className="wrap draw-guide motion-reduce:transform-none! motion-reduce:opacity-100!"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: drawEase } },
      }}
    >
      <motion.figure
        className="draw-photo motion-reduce:transform-none! motion-reduce:opacity-100!"
        variants={{
          hidden: { opacity: 0, x: -28 },
          visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: drawEase } },
        }}
      >
        <StoryPhoto photo={draw} mobile={drawMobile} alt="Eine Frau zieht bei einer Verlosung ein gefaltetes Los aus einer Glasschale." />
      </motion.figure>
      <div>
        <motion.h2
          id="los-titel"
          className="motion-reduce:transform-none! motion-reduce:opacity-100!"
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2, ease: drawEase } },
          }}
        >
          Was steckt im Lostopf?
        </motion.h2>
        <p>Bei einem Gewinnspiel lohnt sich ein Blick ins Kleingedruckte. Diese drei Fragen helfen bei der Entscheidung.</p>
        <dl className="draw-questions">
          {drawQuestions.map(([question, answer], index) => (
            <motion.div
              key={question}
              className="motion-reduce:transform-none! motion-reduce:opacity-100!"
              variants={{
                hidden: { opacity: 0, x: 18 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.75, delay: 0.35 + index * 0.15, ease: drawEase } },
              }}
            >
              <dt>{question}</dt>
              <dd>{answer}</dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </motion.section>
  );
}
