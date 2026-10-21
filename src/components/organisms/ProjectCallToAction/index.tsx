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
import { projectCallToActionStyles } from "./base";

export interface ProjectCallToActionProps { kicker?: TextData; headline?: HeadingData; description?: TextData; actions?: ActionLinkData[]; image?: MediaData; imageCaption?: TextData }
export function ProjectCallToAction({ kicker, headline, description, actions, image, imageCaption }: ProjectCallToActionProps) {
  const titleId=useId(); const styles=projectCallToActionStyles(); const links=validActions(actions);
  return <section id="projet" className={styles.root()} aria-labelledby={headline?.content ? titleId : undefined}><Container><Reveal className={styles.header()}><Text level="c2" {...kicker} className={styles.kicker()} /><Heading as="h2" level="t2" {...headline} id={titleId} className={styles.headline()} /></Reveal><div className={styles.composition()}>{image?.url?<Reveal className={styles.media()}><img className={styles.image()} {...responsiveImageAttributes(image.url, { sizes: "(max-width: 1024px) 100vw, 60vw", originalWidth: image.width })} alt={image.alt || headline?.content || ""} loading="lazy" /><span className={styles.signal()} aria-hidden="true" /><Text level="c2" {...imageCaption} className={styles.caption()} /></Reveal>:null}<Reveal className={styles.panel()} delay={0.08}><Text level="p1" {...description} className={styles.description()} />{links.length?<div className={styles.actions()}>{links.map((action,index)=><ActionLink key={action.link?.url ?? index} {...action} appearance={action.intent === "secondary" ? "inverse" : "primary"} size="wide" />)}</div>:null}</Reveal></div></Container></section>;
}
