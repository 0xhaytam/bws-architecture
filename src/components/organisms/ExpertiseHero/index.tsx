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
import { expertiseHeroStyles } from "./base";

export interface ExpertiseHeroProps { kicker?: TextData; headline?: HeadingData; description?: TextData; actions?: ActionLinkData[]; image?: MediaData; imageCaption?: TextData }
export function ExpertiseHero({ kicker, headline, description, actions, image, imageCaption }: ExpertiseHeroProps) {
  const styles=expertiseHeroStyles(); const links=validActions(actions);
  return <section className={styles.root()} aria-labelledby={headline?.content ? "expertise-hero-title" : undefined}><Container>
    <Reveal className={styles.header()} repeat={false}><div className={styles.meta()}><Text level="c2" {...kicker} className={styles.kicker()} /><Text as="span" level="c2" className={styles.coordinate()}>BWS / Expertise</Text></div><Heading as="h1" level="t1" {...headline} id="expertise-hero-title" className={styles.headline()} /><div className={styles.summary()}><Text level="p1" {...description} className={styles.description()} />{links.length?<div className={styles.actions()}>{links.map((action,index)=><ActionLink key={action.link?.url ?? index} {...action} appearance={action.intent === "secondary" ? "secondary" : "primary"} size="wide" />)}</div>:null}</div></Reveal>
    {image?.url?<Reveal className={styles.media()} delay={0.08} repeat={false}><img className={styles.image()} {...responsiveImageAttributes(image.url, { sizes: "100vw", originalWidth: image.width, defaultWidth: 1600 })} alt={image.alt || headline?.content || ""} width={image.width || 1800} height={image.height || 920} loading="eager" fetchPriority="high" /><span className={styles.signal()} aria-hidden="true" /><Text level="c2" {...imageCaption} className={styles.caption()} /></Reveal>:null}
  </Container></section>;
}
