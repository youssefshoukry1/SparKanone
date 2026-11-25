import type { Metadata } from "next";
import "@fontsource-variable/manrope/wght.css";
import "@fontsource-variable/inter/wght.css";
import "./globals.css";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import CursorGlow from "../components/CursorGlow";

export const metadata: Metadata = {
  title: "SparKanone.de – Sparvorteile verstehen",
  description: "Rabatt, Cashback und Gutscheine verständlich erklärt. Erfahren Sie, worauf es beim Vergleichen von Angeboten ankommt.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="de-DE"><body><a className="skip" href="#inhalt">Zum Inhalt springen</a><Navbar />{children}<Footer /><CursorGlow /></body></html>;
}
