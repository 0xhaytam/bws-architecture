import { useId } from "react";
import type { ActionLinkData } from "@/src/components/primitives/ActionLink";
import type { HeadingData } from "@/src/components/primitives/Heading";
import type { TextData } from "@/src/components/primitives/Text";
import { ActionLink } from "@/src/components/primitives/ActionLink";
import { SectionHeader } from "@/src/components/molecules/SectionHeader";
import { Container } from "@/src/components/primitives/Container";
import { Reveal } from "@/src/components/primitives/Reveal";
import { Text } from "@/src/components/primitives/Text";
import { contactLocationStyles } from "./base";

export interface ContactLocationProps {
  kicker?: TextData;
  headline: HeadingData;
  introduction?: TextData;
  mapEmbedUrl: string;
  address: TextData;
  serviceNote: TextData;
  directionsAction: ActionLinkData;
}

export function ContactLocation({ kicker, headline, introduction, mapEmbedUrl, address, serviceNote, directionsAction }: ContactLocationProps) {
  const titleId = useId();
  const styles = contactLocationStyles();

  return (
    <section className={styles.root()} aria-labelledby={titleId}>
      <Container>
        <Reveal>
          <SectionHeader label={kicker} heading={headline} introduction={introduction} id={titleId} />
        </Reveal>
        <div className={styles.layout()}>
          <Reveal className={styles.map()}>
            <iframe
              className={styles.frame()}
              src={mapEmbedUrl}
              title="Localisation de BWS Architecture à Rabat"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </Reveal>
          <Reveal className={styles.panel()} delay={0.08}>
            <Text as="span" level="c2" className={styles.panelLabel()}>BWS / Rabat</Text>
            <Text {...address} className={styles.address()} />
            <div className={styles.service()}>
              <Text as="span" level="c2" className={styles.serviceLabel()}>Zone d’intervention</Text>
              <Text {...serviceNote} className={styles.serviceNote()} />
            </div>
            <ActionLink {...directionsAction} appearance="inverse" size="wide" className={styles.action()} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
