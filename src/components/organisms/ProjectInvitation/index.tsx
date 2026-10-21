import type { ClientIconToken } from "@/src/lib/iconRegistry";
import { ContactChannel } from "@/src/components/molecules/ContactChannel";
import { ContactForm } from "@/src/components/molecules/ContactForm";
import { Heading } from "@/src/components/primitives/Heading";
import { Reveal } from "@/src/components/primitives/Reveal";
import { Text } from "@/src/components/primitives/Text";
import { responsiveImageAttributes } from "@/src/lib/image";
import { projectInvitationStyles } from "./base";

export type ProjectInvitationProps = any;
const fallbackIcons: ClientIconToken[] = ["MapPin", "Phone", "Mail", "Clock"];

export function ProjectInvitation({ kicker, headline, description, image, imageCaption, contactItems, submitLabel, privacyNote }: ProjectInvitationProps) {
  const styles = projectInvitationStyles();
  return (
    <section id="projet" className={styles.root()} aria-labelledby="invitation-title">
      <Reveal className={styles.media()}>
        {image?.url ? <img className={styles.image()} {...responsiveImageAttributes(image.url, { sizes: "(max-width: 1024px) 100vw, 50vw" })} alt={image.alt || "Architecture contemporaine à Rabat"} loading="lazy" /> : null}
        <span className={styles.mediaTint()} aria-hidden="true" />
        {imageCaption ? <Text {...imageCaption} level={imageCaption.level || "c2"} className={styles.caption()} /> : null}
        <div className={styles.contactCard()}>
          {(contactItems || []).map((item, index) => (
            <ContactChannel
              key={`${item.title?.content || "contact"}-${index}`}
              {...item}
              fallbackIcon={fallbackIcons[index % fallbackIcons.length]}
            />
          ))}
        </div>
      </Reveal>
      <Reveal className={styles.formPanel()} delay={0.06}>
        <div className={styles.formInner()}>
          {kicker ? <Text {...kicker} level={kicker.level || "c1"} className={styles.kicker()} /> : null}
          <Heading as="h2" level="t2" {...headline} id="invitation-title" className={styles.headline()} />
          <Text {...description} className={styles.description()} />
          <ContactForm submitLabel={submitLabel || undefined} privacyNote={privacyNote || undefined} />
        </div>
      </Reveal>
    </section>
  );
}
