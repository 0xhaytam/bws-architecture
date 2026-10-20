import type { HeadingData } from "@/src/components/primitives/Heading";
import type { TextData } from "@/src/components/primitives/Text";
import type { MediaData } from "@/src/components/contentTypes";
import { Container } from "@/src/components/primitives/Container";
import { Heading } from "@/src/components/primitives/Heading";
import { Reveal } from "@/src/components/primitives/Reveal";
import { Text } from "@/src/components/primitives/Text";
import { expertiseIntroductionStyles } from "./base";

export interface ExpertiseIntroductionProps {
  kicker?: TextData;
  headline?: HeadingData;
  lead?: TextData;
  paragraphs?: Array<{ text: TextData }>;
  image?: MediaData;
  imageCaption?: TextData;
}

export function ExpertiseIntroduction({ kicker, headline, lead, paragraphs, image, imageCaption }: ExpertiseIntroductionProps) {
  const styles = expertiseIntroductionStyles();
  return (
    <section className={styles.root()} aria-labelledby="expertise-introduction-title">
      <Container>
        <Reveal className={styles.headingRow()}>
          {kicker ? <Text {...kicker} level={kicker.level || "c2"} className={styles.kicker()} /> : <span />}
          <Heading as="h2" level="t2" {...headline} id="expertise-introduction-title" className={styles.headline()} />
        </Reveal>
        <div className={styles.layout()}>
          <Reveal className={styles.leadColumn()}>
            <Text level="p1" {...lead} className={styles.lead()} />
            <div className={styles.paragraphs()}>
              {(paragraphs || []).map((paragraph, index) => <Text key={index} {...paragraph.text} />)}
            </div>
          </Reveal>
          <Reveal className={styles.media()} delay={0.08}>
            {image?.url ? <img className={styles.image()} src={image.url} alt={image.alt || "Détail architectural"} loading="lazy" /> : <span className={styles.imageFallback()} aria-hidden="true" />}
            {imageCaption ? <Text {...imageCaption} level={imageCaption.level || "c2"} className={styles.caption()} /> : null}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}