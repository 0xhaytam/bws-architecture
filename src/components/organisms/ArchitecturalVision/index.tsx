import { useId } from "react";
import type { HeadingData } from "@/src/components/primitives/Heading";
import type { TextData } from "@/src/components/primitives/Text";
import type { MediaData } from "@/src/components/contentTypes";
import type { VisionPrincipleProps } from "@/src/components/molecules/VisionPrinciple";
import { VisionPrinciple } from "@/src/components/molecules/VisionPrinciple";
import { SectionHeader } from "@/src/components/molecules/SectionHeader";
import { Container } from "@/src/components/primitives/Container";
import { Reveal } from "@/src/components/primitives/Reveal";
import { Text } from "@/src/components/primitives/Text";
import { responsiveImageAttributes } from "@/src/lib/image";
import { architecturalVisionStyles } from "./base";

export interface ArchitecturalVisionProps {
  kicker?: TextData;
  headline?: HeadingData;
  introduction?: TextData;
  image?: MediaData;
  imageCaption?: TextData;
  principles?: Array<Omit<VisionPrincipleProps, "index">>;
}

export function ArchitecturalVision({ kicker, headline, introduction, image, imageCaption, principles }: ArchitecturalVisionProps) {
  const titleId = useId();
  const styles = architecturalVisionStyles();

  return (
    <section className={styles.root()} aria-labelledby={titleId}>
      <span className={styles.linework()} aria-hidden="true" />
      <Container className={styles.inner()}>
        <Reveal>
          <SectionHeader label={kicker} heading={headline} introduction={introduction} id={titleId} />
        </Reveal>
        <div className={styles.layout()}>
          <Reveal className={styles.media()}>
            {image?.url ? <img className={styles.image()} {...responsiveImageAttributes(image.url, { sizes: "(max-width: 768px) 100vw, 50vw", originalWidth: image.width })} alt={image.alt || headline?.content || ""} loading="lazy" /> : null}
            <span className={styles.imageRule()} aria-hidden="true" />
            {imageCaption ? <Text {...imageCaption} level={imageCaption.level || "c2"} className={styles.caption()} /> : null}
          </Reveal>
          <div className={styles.list()}>
            {(principles || []).map((principle, index) => (
              <Reveal key={(principle.title?.content || "principle") + index} className={styles.item()} delay={index * 0.05}>
                <VisionPrinciple {...principle} index={index} />
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
