import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { ClientIconToken } from "@/src/lib/iconRegistry";
import { LazyMotion, domAnimation, m, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { ApproachStep } from "@/src/components/molecules/ApproachStep";
import { SectionHeader } from "@/src/components/molecules/SectionHeader";
import { Container } from "@/src/components/primitives/Container";
import { Reveal } from "@/src/components/primitives/Reveal";
import { architecturalApproachStyles } from "./base";

export type ArchitecturalApproachProps = any;

const fallbackIcons: ClientIconToken[] = ["Compass", "Route", "Sun", "Move3d", "Layers3", "TimerReset"];

export function ArchitecturalApproach({ kicker, headline, introduction, principles }: ArchitecturalApproachProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [travel, setTravel] = useState(0);
  const [activeStart, setActiveStart] = useState(0);
  const reduceMotion = useReducedMotion();
  const visiblePrinciples = principles || [];
  const { scrollYProgress } = useScroll({ target: stageRef, offset: ["start start", "end end"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.35 });
  const horizontalX = useTransform(smoothProgress, [0, 1], [0, -travel]);
  const shouldPin = isDesktop && !reduceMotion && visiblePrinciples.length > 2;
  const styles = architecturalApproachStyles({ interactive: shouldPin });
  const stageStyle = {
    height: shouldPin ? `${100 + Math.max(visiblePrinciples.length - 2, 1) * 36}svh` : undefined,
  } as CSSProperties;

  useMotionValueEvent(smoothProgress, "change", (value) => {
    const maxStart = Math.max(visiblePrinciples.length - 2, 0);
    const nextStart = Math.min(Math.round(value * maxStart), maxStart);
    setActiveStart((current) => current === nextStart ? current : nextStart);
  });

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const measure = () => setTravel(Math.max(track.scrollWidth - viewport.clientWidth, 0));
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(track);
    measure();
    return () => observer.disconnect();
  }, [visiblePrinciples.length]);

  return (
    <section className={styles.root()} aria-labelledby="approach-title">
      <div className={styles.linework()} aria-hidden="true" />
      <LazyMotion features={domAnimation}>
        <div ref={stageRef} className={styles.stage()} style={stageStyle}>
          <div className={styles.sticky()}>
            <Container className={styles.stageInner()}>
              <Reveal className={styles.header()}><SectionHeader label={kicker} heading={headline} introduction={introduction} id="approach-title" /></Reveal>
              <div ref={viewportRef} className={styles.viewport()} aria-label="Étapes de l'approche architecturale">
                <m.div ref={trackRef} className={styles.track()} style={shouldPin ? { x: horizontalX } : undefined} role="list">
                  {visiblePrinciples.map((principle, index) => (
                    <ApproachStep
                      key={`${principle.title?.content || "step"}-${index}`}
                      {...principle}
                      index={index}
                      fallbackIcon={fallbackIcons[index % fallbackIcons.length]}
                      active={!shouldPin || (index >= activeStart && index <= activeStart + 1)}
                    />
                  ))}
                </m.div>
              </div>
            </Container>
          </div>
        </div>
      </LazyMotion>
    </section>
  );
}
