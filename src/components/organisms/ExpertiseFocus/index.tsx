import type { HeadingData } from "@/src/components/primitives/Heading";
import type { TextData } from "@/src/components/primitives/Text";
import type { ExpertiseFocusItemProps } from "@/src/components/molecules/ExpertiseFocusItem";
import { ExpertiseFocusItem } from "@/src/components/molecules/ExpertiseFocusItem";
import { SectionHeader } from "@/src/components/molecules/SectionHeader";
import { Container } from "@/src/components/primitives/Container";
import { Reveal } from "@/src/components/primitives/Reveal";
import { expertiseFocusStyles } from "./base";

export interface ExpertiseFocusProps { kicker?: TextData; headline?: HeadingData; introduction?: TextData; items?: Array<Omit<ExpertiseFocusItemProps, "index" | "reverse">> }
export function ExpertiseFocus({ kicker, headline, introduction, items }: ExpertiseFocusProps) {
  const styles = expertiseFocusStyles();
  return <section className={styles.root()} aria-labelledby={headline?.content ? "expertise-focus-title" : undefined}><Container>
    <Reveal><SectionHeader label={kicker} heading={headline} introduction={introduction} id="expertise-focus-title" /></Reveal>
    <div className={styles.items()}>{(items || []).map((item,index)=><Reveal key={`${item.title?.content || "focus"}-${index}`}><ExpertiseFocusItem {...item} index={index} reverse={index % 2 === 1} /></Reveal>)}</div>
  </Container></section>;
}
