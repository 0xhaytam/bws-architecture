import type { ActionLinkData } from "@/src/components/primitives/ActionLink";
import type { HeadingData } from "@/src/components/primitives/Heading";
import type { TextData } from "@/src/components/primitives/Text";
import type { MediaData } from "@/src/components/contentTypes";
import { ActionLink, validActions } from "@/src/components/primitives/ActionLink";
import { Container } from "@/src/components/primitives/Container";
import { Heading } from "@/src/components/primitives/Heading";
import { Reveal } from "@/src/components/primitives/Reveal";
import { Text } from "@/src/components/primitives/Text";
import { homeHeroStyles } from "./base";

export interface HomeHeroProps { kicker?: TextData; headline?: HeadingData; description?: TextData; actions?: ActionLinkData[]; image?: MediaData; imageCaption?: TextData }

export function HomeHero({ kicker, headline, description, actions, image, imageCaption }: HomeHeroProps) {
  const styles = homeHeroStyles();
  const links = validActions(actions);
  return <section className={styles.root()} aria-labelledby={headline?.content ? "home-hero-title" : undefined}>
    <Container className={styles.grid()}>
      <Reveal className={styles.content()} repeat={false}>
        <Text as="div" level="c2" className={styles.topLine()}><span>BWS / Architecture</span><span>Rabat · MA</span></Text>
        <div className={styles.copy()}>
          <Text level="c1" {...kicker} className={styles.kicker()} />
          <Heading as="h1" level="t1" {...headline} id="home-hero-title" className={styles.headline()} />
          <Text level="p1" {...description} className={styles.description()} />
          {links.length ? <div className={styles.actions()}>{links.map((action, index) => <ActionLink key={`${action.link?.url ?? index}`} {...action} appearance={action.intent === "secondary" ? "secondary" : "primary"} size="wide" />)}</div> : null}
        </div>
      </Reveal>
      {image?.url ? <Reveal className={styles.mediaColumn()} delay={0.08} repeat={false}>
        <span className={styles.signal()} aria-hidden="true" /><div className={styles.media()}>
          <img className={styles.image()} src={image.url} alt={image.alt || "Architecture contemporaine à Rabat"} width="1400" height="1700" loading="eager" fetchPriority="high" />
          <Text level="c2" {...imageCaption} className={styles.caption()} />
        </div>
      </Reveal> : null}
    </Container>
  </section>;
}
