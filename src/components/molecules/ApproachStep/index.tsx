import type { ClientIconToken } from "@/src/lib/iconRegistry";
import { m, useReducedMotion } from "motion/react";
import { Heading } from "@/src/components/primitives/Heading";
import { Icon } from "@/src/components/primitives/Icon";
import { Text } from "@/src/components/primitives/Text";
import { responsiveImageAttributes } from "@/src/lib/image";
import { approachStepStyles } from "./base";

export type ApproachStepProps = any & {
  index: number;
  fallbackIcon: ClientIconToken;
  active?: boolean;
};

export function ApproachStep({ icon, image, label, title, description, fallbackIcon, active = true }: ApproachStepProps) {
  const reduceMotion = useReducedMotion();
  const styles = approachStepStyles();
  const resolvedIcon = (icon || fallbackIcon) as ClientIconToken;

  return (
    <m.article
      className={styles.root()}
      role="listitem"
      animate={{ opacity: active ? 1 : 0.28 }}
      whileHover={reduceMotion ? undefined : { opacity: 1 }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
    >
      <figure className={styles.media()}>
        {image?.url ? (
          <m.img
            className={styles.image()}
            {...responsiveImageAttributes(image.url, { sizes: "(max-width: 1024px) 88vw, 50vw" })}
            alt={image.alt || title?.content || ""}
            loading="lazy"
            whileHover={reduceMotion ? undefined : { scale: 1.025 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          />
        ) : <span className={styles.imageFallback()} aria-hidden="true" />}
        <span className={styles.imageShade()} aria-hidden="true" />
        <span className={styles.icon()} aria-hidden="true"><Icon name={resolvedIcon} size="md" /></span>
      </figure>
      <div className={styles.content()}>
        <Text {...label} level={label?.level || "c2"} className={styles.index()} />
        <Heading as="h3" level="t4" {...title} className={styles.title()} />
        <Text {...description} className={styles.description()} />
      </div>
    </m.article>
  );
}
