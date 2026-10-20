import { HeadlessLink } from "@/src/headless";
import { Container } from "@/src/components/primitives/Container";
import { Text } from "@/src/components/primitives/Text";
import type { MenuItem } from "@/src/lib/wp/menus";
import { siteFooterStyles } from "./base";

export interface SiteFooterProps {
  items: MenuItem[];
}

function FooterMenuGroup({ item }: { item: MenuItem }) {
  const styles = siteFooterStyles();
  const links = item.children.length > 0 ? item.children : [item];

  return (
    <div className={styles.menuGroup()}>
      {item.children.length > 0 ? (
        <Text level="c2" className={styles.label()}>{item.title}</Text>
      ) : null}
      <ul className={styles.menuList()}>
        {links.map((link) => (
          <li key={link.id}>
            <HeadlessLink.Root className={styles.link()} href={link.url}>
              {link.title}
            </HeadlessLink.Root>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter({ items }: SiteFooterProps) {
  const styles = siteFooterStyles();
  return (
    <footer className={styles.root()}>
      <Container>
        <div className={styles.grid()}>
          <div className={styles.brand()}>
            <img className={styles.logo()} src="/bws-logo-dark.svg" alt="BWS Architecture" width="269" height="85" />
            <Text level="p3" className={styles.statement()}>
              Cabinet d&apos;architecture à Rabat. Une pratique sobre, précise et attentive aux usages, à la lumière et
              à la durée.
            </Text>
          </div>
          <div className={styles.contact()}>
            <Text level="c2" className={styles.label()}>Coordonnées</Text>
            <Text as="address" level="p3" className={styles.address()}>
              12 Pl. Sefrou<br />Rabat 10000, Maroc
            </Text>
            <HeadlessLink.Root className={styles.link()} href="tel:+212537705220">
              +212 5 37 70 52 20
            </HeadlessLink.Root>
          </div>
          <nav className={styles.nav()} aria-label="Navigation de pied de page">
            {items.map((item) => <FooterMenuGroup key={item.id} item={item} />)}
          </nav>
        </div>
        <Text as="div" level="c2" className={styles.legal()}>
          <span>© {new Date().getFullYear()} BWS Architecture</span>
          <span>Rabat · Maroc</span>
        </Text>
      </Container>
    </footer>
  );
}
