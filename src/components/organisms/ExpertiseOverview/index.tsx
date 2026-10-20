import { useState } from "react";
import { AnimatePresence, LazyMotion, domAnimation, m, useReducedMotion } from "motion/react";
import { ExpertiseItem } from "@/src/components/molecules/ExpertiseItem";
import { SectionHeader } from "@/src/components/molecules/SectionHeader";
import { Container } from "@/src/components/primitives/Container";
import { Reveal } from "@/src/components/primitives/Reveal";
import { Text } from "@/src/components/primitives/Text";
import { expertiseOverviewStyles } from "./base";

export type ExpertiseOverviewProps = any;

export function ExpertiseOverview({ kicker, headline, introduction, items }: ExpertiseOverviewProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const styles = expertiseOverviewStyles();
  const visibleItems = items || [];
  const activeItem = visibleItems[activeIndex] || visibleItems[0];
  return (
    <section id="expertises" className={styles.root()} aria-labelledby="expertise-title">
      <Container>
        <Reveal><SectionHeader label={kicker} heading={headline} introduction={introduction} id="expertise-title" /></Reveal>
        <LazyMotion features={domAnimation}>
          <div className={styles.layout()}>
            <figure className={styles.preview()} data-reveal suppressHydrationWarning>
              <div className={styles.previewMedia()}>
                <AnimatePresence initial={false} mode="popLayout">
                  {activeItem?.image?.url ? (
                    <m.img
                      key={`${activeIndex}-${activeItem.image.url}`}
                      className={styles.previewImage()}
                      src={activeItem.image.url}
                      alt={activeItem.image.alt || ""}
                      loading="lazy"
                      initial={false}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={reduceMotion ? undefined : { opacity: 0, scale: 0.985 }}
                      transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
                    />
                  ) : null}
                </AnimatePresence>
                <span className={styles.previewShade()} aria-hidden="true" />
                {activeItem?.title?.content ? (
                  <figcaption className={styles.previewCaption()}>
                    <Text as="span" level="c2" className={styles.previewCount()}>{String(activeIndex + 1).padStart(2, "0")} / {String(visibleItems.length).padStart(2, "0")}</Text>
                    <Text as="span" level="c1" className={styles.previewTitle()}>{activeItem.title.content}</Text>
                  </figcaption>
                ) : null}
              </div>
            </figure>
            <div className={styles.list()}>
              {visibleItems.map((item, index) => (
                <div key={`${item.title?.content || "expertise"}-${index}`} data-reveal data-reveal-axis="x" data-reveal-delay={index * 55} suppressHydrationWarning>
                  <ExpertiseItem {...item} index={index} active={activeIndex === index} onActivate={() => setActiveIndex(index)} />
                </div>
              ))}
            </div>
          </div>
        </LazyMotion>
      </Container>
    </section>
  );
}
