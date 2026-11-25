import Image from "next/image";
import * as motion from "motion/react-client";
import PrizeDrawPhoto from "./PrizeDrawPhoto";
import ReceiptTimeline from "./ReceiptTimeline";
import GroceryStoryMedia from "./GroceryStoryMedia";
import { ArrowRight, BedDouble, BusFront, CalendarClock, ChevronRight, Gift, Luggage, Plane, UserRoundCheck } from "lucide-react";
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
  { title: "Online einkaufen", detail: "Was ein Gutschein nach Abzug der Versandkosten bringt.", image: onlineArt, prop: voucher, href: "#online-einkauf", action: "Gutscheinbeispiel ansehen" },
  { title: "Im Supermarkt", detail: "Welche Ersparnis auf dem Kassenbon ankommt.", image: marketArt, prop: tomato, href: "#einkauf", action: "Sparbeispiel ansehen" },
  { title: "Auf Reisen", detail: "Welche Kosten zum Flugpreis dazukommen.", image: tripArt, prop: suitcase, href: "#kurztrip", action: "Reisekosten vergleichen" },
];

const topicsHeading = "Wo möchten Sie sparen?";

export function StoryOverview() {
  return (
    <section className="section topics-section" id="vorteile" aria-labelledby="themen">
      <div className="wrap">
        <h2 id="themen">
          <span className="sr-only">{topicsHeading}</span>
          <motion.span
            aria-hidden="true"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            {topicsHeading.split(" ").map((word, index, words) => {
              const offset = words.slice(0, index).reduce((length, previous) => length + previous.length, 0);

              return (
                <span key={word}>
                  {index > 0 && " "}
                  <span className="inline-block">
                    {Array.from(word, (letter, letterIndex) => (
                      <motion.span
                        key={letterIndex}
                        className="inline-block motion-reduce:opacity-100! motion-reduce:filter-none!"
                        variants={{
                          hidden: { opacity: 0, filter: "blur(6px)" },
                          visible: {
                            opacity: 1,
                            filter: "blur(0px)",
                            transition: { duration: 0.42, delay: (offset + letterIndex) * 0.045, ease: "easeOut" },
                          },
                        }}
                      >
                        {letter}
                      </motion.span>
                    ))}
                  </span>
                </span>
              );
            })}
          </motion.span>
        </h2>
        <div className="topic-grid">
          {topics.map((topic, index) => (
            <motion.a
              key={topic.href}
              className="topic-card motion-reduce:opacity-100! motion-reduce:transform-none!"
              href={topic.href}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="topic-art" aria-hidden="true">
                <Image src={topic.image} alt="" unoptimized />
                <Image className="topic-prop" src={topic.prop} alt="" unoptimized />
              </span>
              <div className="topic-copy">
                <h3>{topic.title}</h3>
                <p>{topic.detail}</p>
                <span className="topic-action" aria-hidden="true">
                  {topic.action}<ArrowRight size={22} />
                </span>
              </div>
            </motion.a>
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
      <GroceryStoryMedia>
        <StoryPhoto photo={groceries} mobile={groceriesMobile} alt="Zwei Menschen wählen in der Obstabteilung eines Supermarkts Äpfel aus." />
      </GroceryStoryMedia>
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
        <ReceiptTimeline />
      </div>
      <figure className="receipt-photo">
        <StoryPhoto photo={receipt} mobile={receiptMobile} alt="Eine Käuferin fotografiert ihren Kassenbon mit dem Smartphone." />
        <span className="receipt-scan-screen" aria-hidden="true"><span /></span>
      </figure>
    </motion.section>
  );
}

const drawQuestions = [
  [UserRoundCheck, "Wer darf mitmachen?", "Achten Sie auf Mindestalter, Wohnort und eine mögliche Mitgliedschaft."],
  [Gift, "Was umfasst der Gewinn?", "Bei einer verlosten Reise können etwa Anreise oder Verpflegung extra kosten."],
  [CalendarClock, "Wann fällt die Entscheidung?", "Suchen Sie nach Teilnahmeschluss, Auslosung und dem Weg, auf dem Gewinner benachrichtigt werden."],
] as const;

export function PrizeDrawGuide() {
  return (
    <section id="gewinnspiele" aria-labelledby="los-titel" className="section draw-guide">
      <div className="wrap draw-layout">
        <PrizeDrawPhoto>
          <StoryPhoto photo={draw} mobile={drawMobile} alt="Eine Frau zieht bei einer Verlosung ein gefaltetes Los aus einer Glasschale." />
        </PrizeDrawPhoto>
        <div className="draw-copy">
          <h2 id="los-titel">Was steckt im Lostopf?</h2>
          <p>Bei einem Gewinnspiel lohnt sich ein Blick ins Kleingedruckte. Diese drei Fragen helfen bei der Entscheidung.</p>
          <dl className="draw-questions">
            {drawQuestions.map(([Icon, question, answer], index) => (
              <motion.div
                className="draw-question motion-reduce:opacity-100! motion-reduce:transform-none!"
                key={question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
              >
                <dt><Icon aria-hidden="true" />{question}</dt>
                <dd>{answer}</dd>
              </motion.div>
            ))}
          </dl>
          <a className="button draw-details" href="#fragen">Mehr Details erfahren <ChevronRight size={18} aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  );
}
