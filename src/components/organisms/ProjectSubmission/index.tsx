import { useId } from "react";
import type { HeadingData } from "@/src/components/primitives/Heading";
import type { TextData } from "@/src/components/primitives/Text";
import { ContactForm } from "@/src/components/molecules/ContactForm";
import { SectionHeader } from "@/src/components/molecules/SectionHeader";
import { Container } from "@/src/components/primitives/Container";
import { Reveal } from "@/src/components/primitives/Reveal";
import { Text } from "@/src/components/primitives/Text";
import { projectSubmissionStyles } from "./base";

export interface ProjectSubmissionProps {
  kicker?: TextData;
  headline: HeadingData;
  introduction?: TextData;
  guidance?: TextData;
  submitLabel?: string;
  privacyNote?: TextData;
}

export function ProjectSubmission({ kicker, headline, introduction, guidance, submitLabel, privacyNote }: ProjectSubmissionProps) {
  const titleId = useId();
  const styles = projectSubmissionStyles();

  return (
    <section id="soumettre-projet" className={styles.root()} aria-labelledby={titleId}>
      <Container>
        <Reveal>
          <SectionHeader label={kicker} heading={headline} introduction={introduction} id={titleId} />
        </Reveal>
        <div className={styles.layout()}>
          <Reveal className={styles.aside()}>
            <Text as="span" level="c2" className={styles.asideIndex()}>BWS / Projet</Text>
            {guidance ? <Text {...guidance} className={styles.guidance()} /> : null}
            <Text level="c2" className={styles.requiredNote()}>Les champs marqués d’un astérisque sont obligatoires.</Text>
          </Reveal>
          <Reveal className={styles.formPanel()} delay={0.08}>
            <ContactForm detailed submitLabel={submitLabel || undefined} privacyNote={privacyNote} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
