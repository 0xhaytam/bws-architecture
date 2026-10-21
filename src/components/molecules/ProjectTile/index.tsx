import { useRef } from "react";
import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Heading } from "@/src/components/primitives/Heading";
import { Text } from "@/src/components/primitives/Text";
import { responsiveImageAttributes } from "@/src/lib/image";
import { projectTileStyles } from "./base";

export type ProjectTileProps = any & {
  index: number;
  format?: "landscape" | "portrait" | "square";
  priority?: boolean;
};

export function ProjectTile({ title, category, description, image, index, format = "landscape", priority }: ProjectTileProps) {
  const rootRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: rootRef, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  if (!image?.url) return null;
  const styles = projectTileStyles({ format });
  return (
    <article
      ref={rootRef}
      className={styles.root()}
      data-reveal
      suppressHydrationWarning
    >
      <div
        className={styles.media()}
        data-reveal-media
      >
        <m.img className={styles.image()} style={reduceMotion ? undefined : { y: imageY }} {...responsiveImageAttributes(image.url, { sizes: "(max-width: 768px) 100vw, 50vw" })} alt={image.alt || `${title?.content || "Projet"} — ${category?.content || "Architecture"}`} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} />
        <span className={styles.imageIndex()} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <div className={styles.meta()}>
        <Text as="span" level="c2" className={styles.index()}>{String(index + 1).padStart(2, "0")}</Text>
        <div className={styles.identity()}>
          <Heading as="h3" level="t4" {...title} className={styles.title()} />
          <Text level="c1" {...category} className={styles.category()} />
        </div>
        {description ? <Text {...description} className={styles.description()} /> : null}
      </div>
      <span
        className={styles.rule()}
        data-reveal-rule
        aria-hidden="true"
      />
    </article>
  );
}
