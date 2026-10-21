import { useId } from "react";
import type { ActionLinkData } from "@/src/components/primitives/ActionLink";
import type { HeadingData } from "@/src/components/primitives/Heading";
import type { TextData } from "@/src/components/primitives/Text";
import type { MediaData } from "@/src/components/contentTypes";
import { ActionLink, validActions } from "@/src/components/primitives/ActionLink";
import { Container } from "@/src/components/primitives/Container";
import { Heading } from "@/src/components/primitives/Heading";
import { Reveal } from "@/src/components/primitives/Reveal";
import { Text } from "@/src/components/primitives/Text";
import { responsiveImageAttributes } from "@/src/lib/image";
import { agencyHeroStyles } from "./base";

export interface AgencyHeroProps { kicker?: TextData; headline?: HeadingData; description?: TextData; actions?: ActionLinkData[]; primaryImage?: MediaData; detailImage?: MediaData; imageCaption?: TextData }
export function AgencyHero({ kicker, headline, description, actions, primaryImage, detailImage, imageCaption }: AgencyHeroProps) {
  const titleId = useId(); const styles = agencyHeroStyles(); const links = validActions(actions);
  return <section className={styles.root()} aria-labelledby={headline?.content ? titleId : undefined}><Container>
    <Reveal className={styles.header()} repeat={false}><div className={styles.meta()}><Text level="c2" {...kicker} className={styles.kicker()} /><Text as="span" level="c2" className={styles.location()}>Rabat · Maroc</Text></div>
      <Heading as="h1" level="t1" {...headline} id={titleId} className={styles.headline()} />
      <div className={styles.summary()}><Text level="p1" {...description} className={styles.description()} />{links.length ? <div className={styles.actions()}>{links.map((action,index)=><ActionLink key={action.link?.url ?? index} {...action} appearance={action.intent === "secondary" ? "secondary" : "primary"} size="wide" />)}</div>:null}</div>
    </Reveal>
    {primaryImage?.url || detailImage?.url ? <div className={styles.mediaGrid()}>{primaryImage?.url ? <Reveal className={styles.primaryMedia()} repeat={false}><img className={styles.primaryImage()} {...responsiveImageAttributes(primaryImage.url, { sizes: "(max-width: 1024px) 100vw, 70vw", originalWidth: primaryImage.width, defaultWidth: 1600 })} alt={primaryImage.alt || headline?.content || ""} width={primaryImage.width || 1600} height={primaryImage.height || 1100} loading="eager" fetchPriority="high" /><span className={styles.signal()} aria-hidden="true" /><Text level="c2" {...imageCaption} className={styles.caption()} /></Reveal>:null}{detailImage?.url ? <Reveal className={styles.detailMedia()} delay={0.1} repeat={false}><img className={styles.detailImage()} {...responsiveImageAttributes(detailImage.url, { sizes: "(max-width: 1024px) 50vw, 30vw", originalWidth: detailImage.width })} alt={detailImage.alt || "Détail architectural"} width={detailImage.width || 900} height={detailImage.height || 1100} loading="lazy" /><Text as="span" level="c2" className={styles.detailLabel()}>BWS / Le cabinet</Text></Reveal>:null}</div>:null}
  </Container></section>;
}
