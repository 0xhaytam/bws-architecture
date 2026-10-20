import { useId } from "react";
import type { HeadingData } from "@/src/components/primitives/Heading";
import type { TextData } from "@/src/components/primitives/Text";
import type { MediaData } from "@/src/components/contentTypes";
import { SectionHeader } from "@/src/components/molecules/SectionHeader";
import { Container } from "@/src/components/primitives/Container";
import { Reveal } from "@/src/components/primitives/Reveal";
import { Text } from "@/src/components/primitives/Text";
import { agencyProfileStyles } from "./base";

export interface AgencyProfileProps {
  kicker?: TextData;
  headline?: HeadingData;
  lead?: TextData;
  paragraphs?: Array<{ text?: TextData }>;
  image?: MediaData;
  imageCaption?: TextData;
}

export function AgencyProfile({ kicker, headline, lead, paragraphs, image, imageCaption }: AgencyProfileProps) {
  const titleId = useId();
  const styles = agencyProfileStyles();

  return (
    <section className={styles.root()} aria-labelledby={titleId}>
      <Container>
        <Reveal>
          <SectionHeader label={kicker} heading={headline} id={titleId} />
        </Reveal>
        <div className={styles.copyGrid()}>
          <Reveal className={styles.leadWrap()}>
            <Text level="p1" {...lead} className={styles.lead()} />
          </Reveal>
          <Reveal className={styles.paragraphs()} delay={0.08}>
            {(paragraphs || []).map((paragraph, index) => <Text key={index} {...paragraph.text} />)}
          </Reveal>
        </div>
        <Reveal className={styles.media()}>
          {image?.url ? <img className={styles.image()} src={image.url} alt={image.alt || "Cabinet d’architecture BWS"} loading="lazy" /> : null}
          <span className={styles.frame()} aria-hidden="true" />
          {imageCaption ? <Text {...imageCaption} level={imageCaption.level || "c2"} className={styles.caption()} /> : null}
        </Reveal>
      </Container>
    </section>
  );
}
