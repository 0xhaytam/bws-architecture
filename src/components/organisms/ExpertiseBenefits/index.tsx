import type { HeadingData } from "@/src/components/primitives/Heading";
import type { TextData } from "@/src/components/primitives/Text";
import type { ExpertiseBenefitItemProps } from "@/src/components/molecules/ExpertiseBenefitItem";
import { ExpertiseBenefitItem } from "@/src/components/molecules/ExpertiseBenefitItem";
import { SectionHeader } from "@/src/components/molecules/SectionHeader";
import { Container } from "@/src/components/primitives/Container";
import { Reveal } from "@/src/components/primitives/Reveal";
import { expertiseBenefitsStyles } from "./base";

export interface ExpertiseBenefitsProps { kicker?: TextData; headline?: HeadingData; introduction?: TextData; items?: Array<Omit<ExpertiseBenefitItemProps, "index">> }
export function ExpertiseBenefits({ kicker, headline, introduction, items }: ExpertiseBenefitsProps) {
  const styles = expertiseBenefitsStyles();
  return <section className={styles.root()} aria-labelledby={headline?.content ? "expertise-benefits-title" : undefined}><Container>
    <Reveal><SectionHeader label={kicker} heading={headline} introduction={introduction} id="expertise-benefits-title" /></Reveal>
    <div className={styles.items()}>{(items || []).map((item,index)=><Reveal key={`${item.title?.content || "benefit"}-${index}`} delay={(index % 2) * 0.04}><ExpertiseBenefitItem {...item} index={index} /></Reveal>)}</div>
  </Container></section>;
}
