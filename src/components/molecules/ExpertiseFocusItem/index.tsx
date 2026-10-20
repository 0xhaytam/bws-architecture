import type { HeadingData } from "@/src/components/primitives/Heading";
import type { TextData } from "@/src/components/primitives/Text";
import type { MediaData } from "@/src/components/contentTypes";
import { Heading } from "@/src/components/primitives/Heading";
import { Text } from "@/src/components/primitives/Text";
import { expertiseFocusItemStyles } from "./base";

export interface ExpertiseFocusItemProps {
  label?: TextData;
  title: HeadingData;
  description: TextData;
  image?: MediaData;
  index: number;
  reverse?: boolean;
}

export function ExpertiseFocusItem({ label, title, description, image, index, reverse = false }: ExpertiseFocusItemProps) {
  const styles = expertiseFocusItemStyles({ reverse });
  return (
    <article className={styles.root()}>
      <div className={styles.media()}>
        {image?.url ? <img className={styles.image()} src={image.url} alt={image.alt || title?.content || ""} loading="lazy" /> : <span className={styles.imageFallback()} aria-hidden="true" />}
        <Text as="span" level="c2" className={styles.imageIndex()}>{String(index + 1).padStart(2, "0")}</Text>
      </div>
      <div className={styles.content()}>
        <div className={styles.meta()}>
          <Text as="span" level="c2" className={styles.index()}>{String(index + 1).padStart(2, "0")}</Text>
          {label ? <Text {...label} level={label.level || "c2"} className={styles.label()} /> : null}
        </div>
        <Heading as="h3" level="t4" {...title} className={styles.title()} />
        <Text {...description} className={styles.description()} />
      </div>
    </article>
  );
}