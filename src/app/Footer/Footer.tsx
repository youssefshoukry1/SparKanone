import Brand from "../../components/Brand";
import { navigation } from "../../content/home";

export default function Footer() {
  return <footer><div className="wrap footer-row"><Brand /><nav aria-label="Fußnavigation">{navigation.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}</nav></div></footer>;
}
