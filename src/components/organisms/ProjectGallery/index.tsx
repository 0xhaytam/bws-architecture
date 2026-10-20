import { LazyMotion, domAnimation } from "motion/react";
import { ProjectTile } from "@/src/components/molecules/ProjectTile";
import { SectionHeader } from "@/src/components/molecules/SectionHeader";
import { Container } from "@/src/components/primitives/Container";
import { Reveal } from "@/src/components/primitives/Reveal";
import { projectGalleryItemStyles, projectGalleryStyles } from "./base";

export type ProjectGalleryProps = any;

const projectPresentation = [
  { placement: "lead", format: "landscape" },
  { placement: "counter", format: "portrait" },
  { placement: "compact", format: "square" },
  { placement: "wide", format: "landscape" },
  { placement: "portrait", format: "portrait" },
  { placement: "finale", format: "landscape" },
] as const;

export function ProjectGallery({ kicker, headline, introduction, projects }: ProjectGalleryProps) {
  const styles = projectGalleryStyles();
  const visibleProjects = (projects || []).filter((project) => project.image?.url);
  return (
    <section className={styles.root()} aria-labelledby="projects-title">
      <Container>
        <Reveal><SectionHeader label={kicker} heading={headline} introduction={introduction} id="projects-title" /></Reveal>
        <LazyMotion features={domAnimation}>
          <div className={styles.grid()}>
            {visibleProjects.map((project, index) => {
              const presentation = projectPresentation[index % projectPresentation.length];
              return (
                <div key={`${project.title?.content || "project"}-${index}`} className={projectGalleryItemStyles({ placement: presentation.placement })}>
                  <ProjectTile {...project} index={index} format={presentation.format} priority={index === 0} />
                </div>
              );
            })}
          </div>
        </LazyMotion>
      </Container>
    </section>
  );
}
