import { HeadlessLink } from "@/src/headless";
import { ActionLink } from "@/src/components/primitives/ActionLink";
import { Container } from "@/src/components/primitives/Container";
import type { MenuItem } from "@/src/lib/wp/menus";
import { siteHeaderStyles } from "./base";

export interface SiteHeaderProps {
  items: MenuItem[];
}

function DesktopMenuItem({ item }: { item: MenuItem }) {
  const styles = siteHeaderStyles();

  if (item.children.length === 0) {
    return (
      <li>
        <HeadlessLink.Root className={styles.navLink()} href={item.url}>
          {item.title}
        </HeadlessLink.Root>
      </li>
    );
  }

  return (
    <li className={styles.dropdownItem()} data-dropdown>
      <div className={styles.dropdown()}>
        <button
          className={styles.dropdownTrigger()}
          type="button"
          aria-expanded="false"
          aria-haspopup="true"
          data-dropdown-trigger
        >
          {item.title}
          <span className={styles.chevron()} aria-hidden="true" />
        </button>
        <div className={styles.dropdownPanel()} data-dropdown-panel>
          <ul className={styles.dropdownList()}>
            {item.children.map((child, index) => (
              <li key={child.id}>
                <HeadlessLink.Root className={styles.dropdownLink()} href={child.url}>
                  <span className={styles.dropdownIndex()}>{String(index + 1).padStart(2, "0")}</span>
                  <span>{child.title}</span>
                  <span className={styles.dropdownArrow()} aria-hidden="true">↗</span>
                </HeadlessLink.Root>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
}

function MobileMenuItem({ item }: { item: MenuItem }) {
  const styles = siteHeaderStyles();

  if (item.children.length === 0) {
    return (
      <li>
        <HeadlessLink.Root className={styles.mobileLink()} href={item.url}>
          {item.title}
        </HeadlessLink.Root>
      </li>
    );
  }

  return (
    <li>
      <details className={styles.mobileGroup()}>
        <summary className={styles.mobileGroupTrigger()}>
          {item.title}
          <span className={styles.mobilePlus()} aria-hidden="true" />
        </summary>
        <ul className={styles.mobileSubmenu()}>
          {item.children.map((child) => (
            <li key={child.id}>
              <HeadlessLink.Root className={styles.mobileSublink()} href={child.url}>
                {child.title}
              </HeadlessLink.Root>
            </li>
          ))}
        </ul>
      </details>
    </li>
  );
}

export function SiteHeader({ items }: SiteHeaderProps) {
  const styles = siteHeaderStyles();

  return (
    <header className={styles.root()}>
      <Container className={styles.inner()}>
        <HeadlessLink.Root className={styles.brand()} href="/" aria-label="BWS Architecture — Accueil">
          <img className={styles.logo()} src="/bws-logo.svg" alt="" width="269" height="85" />
        </HeadlessLink.Root>

        <nav className={styles.nav()} aria-label="Navigation principale">
          <ul className={styles.navList()}>
            {items.map((item) => <DesktopMenuItem key={item.id} item={item} />)}
          </ul>
        </nav>

        <div className={styles.actions()}>
          <ActionLink
            link={{ title: "Appeler", url: "tel:+212537705220", target: "_self" }}
            appearance="primary"
            size="compact"
          />
        </div>

        <details className={styles.mobileMenu()}>
          <summary className={styles.mobileToggle()}>
            <span className={styles.mobileToggleLabel()}>Menu</span>
            <span className={styles.menuIcon()} aria-hidden="true" />
          </summary>
          <div className={styles.mobilePanel()}>
            <nav aria-label="Navigation mobile">
              <ul className={styles.mobileList()}>
                {items.map((item) => <MobileMenuItem key={item.id} item={item} />)}
              </ul>
            </nav>
            <div className={styles.mobileAction()}>
              <ActionLink
                link={{ title: "Appeler le cabinet", url: "tel:+212537705220", target: "_self" }}
                appearance="primary"
                size="default"
              />
            </div>
          </div>
        </details>
      </Container>
    </header>
  );
}
