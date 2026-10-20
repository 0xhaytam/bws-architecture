import { useId } from "react";
import type { ActionLinkData } from "@/src/components/primitives/ActionLink";
import type { HeadingData } from "@/src/components/primitives/Heading";
import type { TextData } from "@/src/components/primitives/Text";
import { ActionLink } from "@/src/components/primitives/ActionLink";
import { Container } from "@/src/components/primitives/Container";
import { Heading } from "@/src/components/primitives/Heading";
import { Reveal } from "@/src/components/primitives/Reveal";
import { Text } from "@/src/components/primitives/Text";
import { contactReassuranceStyles } from "./base";

export interface ContactReassuranceProps {
  kicker?: TextData;
  headline?: HeadingData;
  description?: TextData;
  points?: Array<{ title?: HeadingData; description?: TextData }>;
  action?: ActionLinkData;
}

export function ContactReassurance({ kicker, headline, description, points, action }: ContactReassuranceProps) {
  const titleId = useId();
  const styles = contactReassuranceStyles();

  return (
    <section className={styles.root()} aria-labelledby={titleId}>
      <Container>
        <Reveal className={styles.header()}>
          {kicker ? <Text {...kicker} level={kicker.level || "c2"} className={styles.kicker()} /> : <span />}
          <Heading as="h2" level="t2" {...headline} id={titleId} className={styles.headline()} />
          <div className={styles.summary()}>
            <Text {...description} className={styles.description()} />
            <ActionLink {...action} appearance="primary" size="wide" className={styles.action()} />
          </div>
        </Reveal>
        <div className={styles.points()}>
          {(points || []).map((point, index) => (
            <Reveal key={(point.title?.content || "point") + index} className={styles.point()} delay={index * 0.05}>
              <Text as="span" level="c2" className={styles.pointIndex()}>{String(index + 1).padStart(2, "0")}</Text>
              <Heading as="h3" level="t4" {...point.title} className={styles.pointTitle()} />
              <Text {...point.description} className={styles.pointDescription()} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
