import type { ActionLinkData } from "@/src/components/primitives/ActionLink";
import type { HeadingData } from "@/src/components/primitives/Heading";
import type { TextData } from "@/src/components/primitives/Text";
import type { ClientIconToken } from "@/src/lib/iconRegistry";
import { HeadlessLink } from "@/src/headless";
import { resolveActionLink } from "@/src/components/primitives/ActionLink";
import { Heading } from "@/src/components/primitives/Heading";
import { Icon } from "@/src/components/primitives/Icon";
import { Text } from "@/src/components/primitives/Text";
import { contactChannelStyles } from "./base";

export interface ContactChannelProps {
  icon?: string;
  fallbackIcon: ClientIconToken;
  title?: HeadingData;
  details?: TextData;
  destination?: ActionLinkData;
}

export function ContactChannel({ icon, fallbackIcon, title, details, destination }: ContactChannelProps) {
  const styles = contactChannelStyles();
  const resolvedIcon = (icon || fallbackIcon) as ClientIconToken;
  const content = <Text {...details} className={styles.details()} />;
  const link = resolveActionLink(destination);

  return (
    <article className={styles.root()}>
      <span className={styles.icon()} aria-hidden="true"><Icon name={resolvedIcon} size="md" /></span>
      <div className={styles.copy()}>
        <Heading as="h3" level="t5" {...title} className={styles.title()} />
        {link?.url ? <HeadlessLink.Root href={link.url} target={link.target || undefined} className={styles.link()}>{content}</HeadlessLink.Root> : content}
      </div>
    </article>
  );
}
