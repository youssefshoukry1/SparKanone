import HomeFaq from "../components/HomeFaq";
import { HeroLogo } from "../components/HomeArtwork";
import HeroMotion from "../components/HeroMotion";
import SavingsConcepts from "../components/SavingsConcepts";
import OfferSteps from "../components/OfferSteps";
import SavingsCalculator from "../components/SavingsCalculator";
import { GroceryStory, ShoppingStory, TravelStory, StoryOverview, ReceiptGuide, PrizeDrawGuide } from "../components/SavingsStories";


export default function Home() {
  const explainerVideo = process.env.EXPLAINER_VIDEO_URL;
  return <main id="inhalt">
    <section className="hero">
      <HeroMotion />
      <div className="wrap hero-grid">
        <div><h1>Mehr sparen.<br /><em>Mehr erleben.</em></h1>
          <p>Rabatt, Cashback oder Gutschein? Entdecken Sie, wie sich Sparvorteile unterscheiden und worauf es beim Einkauf ankommt.</p>
          <a className="button" href="#ueberblick">SparKanone kennenlernen</a>
        </div>
        <HeroLogo />
      </div>
    </section>
    <section className="section" id="ueberblick" aria-label="Erklärvideo">
      <video className="wrap explainer-video" src={explainerVideo} controls={Boolean(explainerVideo)} playsInline preload="metadata" />
    </section>
    <StoryOverview />
    <ShoppingStory />
    <GroceryStory />
    <ReceiptGuide />
    <SavingsConcepts />
    <section className="section" id="ablauf"><div className="wrap split"><h2>So prüfen Sie<br />ein Angebot</h2><OfferSteps /></div></section>
    <section className="wrap example"><h2>Warum SparKanone?</h2><p>Wir erklären Sparbegriffe anhand von Alltagssituationen. So können Sie selbst einschätzen, ob sich ein Angebot für Sie lohnt.</p></section>
    <TravelStory />
    <PrizeDrawGuide />
    <HomeFaq />
    <SavingsCalculator />
    <section className="closing"><div className="wrap"><h2>Was steckt hinter<br />dem Sparvorteil?</h2><a className="button" href="#vorteile">Sparvorteile vergleichen</a></div></section>
  </main>;
}
