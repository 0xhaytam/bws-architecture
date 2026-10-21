import { m } from "motion/react";
import { HeadlessLink } from "@/src/headless";
import { resolveActionLink } from "@/src/components/primitives/ActionLink";
import { Heading } from "@/src/components/primitives/Heading";
import { Icon } from "@/src/components/primitives/Icon";
import { Text } from "@/src/components/primitives/Text";
import { responsiveImageAttributes } from "@/src/lib/image";
import { expertiseItemStyles } from "./base";

export type ExpertiseItemProps = any & {
  index: number;
  active?: boolean;
  onActivate?: () => void;
};

export function ExpertiseItem({ title, description, image, destination, index, active = false, onActivate }: ExpertiseItemProps) {
  const styles = expertiseItemStyles({ active });
  const link = resolveActionLink(destination);
  const content = (
    <>
      {active ? <m.span layoutId="expertise-active-line" className={styles.indicator()} transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }} aria-hidden="true" /> : null}
      <Text as="span" level="c2" className={styles.index()}>{String(index + 1).padStart(2, "0")}</Text>
      <div className={styles.copy()}>
        <Heading as="h3" level="t4" {...title} className={styles.title()} />
        <Text {...description} className={styles.description()} />
      </div>
      <span className={styles.mark()} aria-hidden="true"><Icon name="ArrowUpRight" size="md" /></span>
      {image?.url ? <div className={styles.mobileMedia()}><img className={styles.image()} {...responsiveImageAttributes(image.url, { sizes: "100vw" })} alt={image.alt || ""} loading="lazy" /></div> : null}
    </>
  );
  return link?.url ? (
    <HeadlessLink.Root href={link.url} target={link.target || undefined} className={styles.root()} onPointerEnter={onActivate} onFocus={onActivate}>{content}</HeadlessLink.Root>
  ) : (
    <article className={styles.root()} onPointerEnter={onActivate}>{content}</article>
  );
}
