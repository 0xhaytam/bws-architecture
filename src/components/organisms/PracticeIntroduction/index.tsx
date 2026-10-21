import { SectionHeader } from "@/src/components/molecules/SectionHeader";
import { ActionLink } from "@/src/components/primitives/ActionLink";
import { Container } from "@/src/components/primitives/Container";
import { Reveal } from "@/src/components/primitives/Reveal";
import { Text } from "@/src/components/primitives/Text";
import { responsiveImageAttributes } from "@/src/lib/image";
import { practiceIntroductionStyles } from "./base";

export type PracticeIntroductionProps = any;

export function PracticeIntroduction({ indexLabel, headline, image, imageCaption, paragraphs, agencyAction }: PracticeIntroductionProps) {
  const styles = practiceIntroductionStyles();
  return (
    <section className={styles.root()} aria-labelledby="practice-title">
      <Container>
        <Reveal>
          <SectionHeader label={indexLabel} heading={headline} id="practice-title" />
        </Reveal>
        <div className={styles.layout()}>
          <Reveal className={styles.media()}>
            {image?.url ? <img className={styles.image()} {...responsiveImageAttributes(image.url, { sizes: "(max-width: 768px) 100vw, 50vw" })} alt={image.alt || "Détail architectural du cabinet"} loading="lazy" /> : null}
            {imageCaption ? <Text {...imageCaption} level={imageCaption.level || "c2"} className={styles.caption()} /> : null}
          </Reveal>
          <Reveal className={styles.content()} delay={0.08}>
            <div className={styles.paragraphs()}>
              {(paragraphs || []).map((paragraph, index) => <Text key={index} {...paragraph.text} />)}
            </div>
            {agencyAction ? <ActionLink {...agencyAction} className={styles.action()} /> : null}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
