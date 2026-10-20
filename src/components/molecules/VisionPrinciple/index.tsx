import type { HeadingData } from "@/src/components/primitives/Heading";
import type { TextData } from "@/src/components/primitives/Text";
import { Heading } from "@/src/components/primitives/Heading";
import { Text } from "@/src/components/primitives/Text";
import { visionPrincipleStyles } from "./base";

export interface VisionPrincipleProps { label?: TextData; title?: HeadingData; description?: TextData; index: number }
export function VisionPrinciple({ label, title, description, index }: VisionPrincipleProps) {
  const styles = visionPrincipleStyles();
  return <article className={styles.root()}>
    <Text as="span" level="c2" className={styles.index()}>{String(index + 1).padStart(2, "0")}</Text>
    <div className={styles.copy()}>
      <Text level="c2" {...label} className={styles.label()} />
      <Heading as="h3" level="t4" {...title} className={styles.title()} />
      <Text level="p2" {...description} className={styles.description()} />
    </div>
  </article>;
}
