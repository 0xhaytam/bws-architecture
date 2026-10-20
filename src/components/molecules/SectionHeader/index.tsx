import type { HeadingData } from "@/src/components/primitives/Heading";
import type { TextData } from "@/src/components/primitives/Text";
import { Heading } from "@/src/components/primitives/Heading";
import { Text } from "@/src/components/primitives/Text";
import { sectionHeaderStyles } from "./base";

interface SectionHeaderProps {
  label?: TextData;
  heading?: HeadingData;
  introduction?: TextData;
  id: string;
  tone?: "light" | "dark";
}

export function SectionHeader({ label, heading, introduction, id, tone = "light" }: SectionHeaderProps) {
  const styles = sectionHeaderStyles({ tone });
  return (
    <header className={styles.root()}>
      <Text level="c2" {...label} className={styles.label()} />
      <Heading as="h2" level="t2" {...heading} id={id} className={styles.heading()} />
      <Text level="p2" {...introduction} className={styles.introduction()} />
    </header>
  );
}