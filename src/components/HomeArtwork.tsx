import { BadgePercent, Banknote, Coins } from "lucide-react";
import Image from "next/image";
import logo from "../images/sparkanone.webp";

export function HeroLogo() {
  return (
    <div className="hero-art">
      <Image className="hero-logo" src={logo} alt="SparKanone.de" priority unoptimized />
      <div className="hero-tokens" aria-hidden="true">
        <Banknote className="hero-token token-note" />
        <Coins className="hero-token token-coins" />
        <BadgePercent className="hero-token token-discount" />
      </div>
    </div>
  );
}
