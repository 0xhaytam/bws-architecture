import { useId } from "react";
import type { HeadingData } from "@/src/components/primitives/Heading";
import type { TextData } from "@/src/components/primitives/Text";
import type { ContactChannelProps } from "@/src/components/molecules/ContactChannel";
import type { ClientIconToken } from "@/src/lib/iconRegistry";
import { ContactChannel } from "@/src/components/molecules/ContactChannel";
import { SectionHeader } from "@/src/components/molecules/SectionHeader";
import { Container } from "@/src/components/primitives/Container";
import { Reveal } from "@/src/components/primitives/Reveal";
import { contactDetailsStyles } from "./base";

export interface ContactDetailsProps {
  kicker?: TextData;
  headline?: HeadingData;
  introduction?: TextData;
  items?: Array<Omit<ContactChannelProps, "fallbackIcon">>;
}

const fallbackIcons: ClientIconToken[] = ["Phone", "Mail", "MapPin", "Clock"];

export function ContactDetails({ kicker, headline, introduction, items }: ContactDetailsProps) {
  const titleId = useId();
  const styles = contactDetailsStyles();

  return (
    <section className={styles.root()} aria-labelledby={titleId}>
      <Container>
        <Reveal>
          <SectionHeader label={kicker} heading={headline} introduction={introduction} id={titleId} />
        </Reveal>
        <div className={styles.items()}>
          {(items || []).map((item, index) => (
            <Reveal key={(item.title?.content || "contact") + index} delay={index * 0.04}>
              <ContactChannel {...item} fallbackIcon={fallbackIcons[index % fallbackIcons.length]} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
