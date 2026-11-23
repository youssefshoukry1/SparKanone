import Image from "next/image";
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
    <section className="wrap grocery-story" aria-labelledby="einkauf">
      <StoryPhoto photo={groceries} mobile={groceriesMobile} alt="Zwei Menschen wählen in der Obstabteilung eines Supermarkts Äpfel aus." />
      <div className="grocery-copy">
        <h2 id="einkauf">Was bleibt nach dem Einkauf übrig?</h2>
        <p>Auf dem Kassenbon sehen Sie, welche Rabatte abgezogen wurden. Vergleichen Sie den Betrag mit Ihrem Wochenbudget.</p>
      </div>
    </section>
  );
}

export function ShoppingStory() {
  return (
    <section id="online-einkauf" className="wrap shopping-story" aria-labelledby="voucher-title">
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
    </section>
  );
}

export function TravelStory() {
  return (
    <section className="wrap travel-story" aria-labelledby="kurztrip">
      <header className="trip-heading">
        <Image className="trip-photo" src={travelMobile} width={120} height={120} alt="" unoptimized />
        <div>
          <h2 id="kurztrip">Was kostet der Kurztrip insgesamt?</h2>
          <p>Vergleichen Sie vor der Buchung, was Sie für die ganze Reise bezahlen.</p>
        </div>
      </header>
      <dl className="trip-costs">
        {[
          { Icon: Plane, label: "Flug", text: "Was kosten Hin- und Rückflug zusammen?" },
          { Icon: Luggage, label: "Gepäck", text: "Ist Ihr Koffer im gewählten Tarif enthalten?" },
          { Icon: BusFront, label: "Transfer", text: "Was kosten die Fahrten zum Hotel und zurück?" },
          { Icon: BedDouble, label: "Unterkunft", text: "Wie viel zahlen Sie für alle Nächte inklusive Gebühren?" },
        ].map(({ Icon, label, text }) => (
          <div key={label}><dt><Icon aria-hidden="true" size={22} />{label}</dt><dd>{text}</dd></div>
        ))}
      </dl>
    </section>
  );
}

export function ReceiptGuide() {
  return (
    <section id="kassenbon" aria-labelledby="bon-titel" className="wrap receipt-guide">
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
    </section>
  );
}

export function PrizeDrawGuide() {
  return (
    <section id="gewinnspiele" aria-labelledby="los-titel" className="wrap draw-guide">
      <StoryPhoto photo={draw} mobile={drawMobile} alt="Eine Frau zieht bei einer Verlosung ein gefaltetes Los aus einer Glasschale." />
      <div>
        <h2 id="los-titel">Was steckt im Lostopf?</h2>
        <p>Bei einem Gewinnspiel lohnt sich ein Blick ins Kleingedruckte. Diese drei Fragen helfen bei der Entscheidung.</p>
        <dl className="draw-questions">
          <dt>Wer darf mitmachen?</dt><dd>Achten Sie auf Mindestalter, Wohnort und eine mögliche Mitgliedschaft.</dd>
          <dt>Was umfasst der Gewinn?</dt><dd>Bei einer verlosten Reise können etwa Anreise oder Verpflegung extra kosten.</dd>
          <dt>Wann fällt die Entscheidung?</dt><dd>Suchen Sie nach Teilnahmeschluss, Auslosung und dem Weg, auf dem Gewinner benachrichtigt werden.</dd>
        </dl>
      </div>
    </section>
  );
}
