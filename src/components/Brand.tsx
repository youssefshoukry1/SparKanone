import Image from "next/image";
import Link from "next/link";
import logo from "../images/sparkanone-small.webp";

export default function Brand() {
  return (
    <Link className="brand" href="/" aria-label="SparKanone.de – Startseite">
      <Image src={logo} alt="SparKanone.de" unoptimized />
    </Link>
  );
}
