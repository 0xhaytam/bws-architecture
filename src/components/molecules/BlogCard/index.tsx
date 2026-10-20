import type { RuntimePost } from "@/src/lib/wp/posts";
import { Heading } from "@/src/components/primitives/Heading";
import { Text } from "@/src/components/primitives/Text";
import { blogCardStyles } from "./base";

export interface BlogCardProps {
  post: RuntimePost;
  index: number;
}

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

export function BlogCard({ post, index }: BlogCardProps) {
  const styles = blogCardStyles();
  return (
    <article className={styles.root()} data-reveal data-reveal-delay={index * 60} suppressHydrationWarning>
      <a href={`/blog/${post.slug}`} aria-label={`Lire ${post.title}`}>
        <div className={styles.media()}>
          {post.featuredImage?.url ? (
            <img
              className={styles.image()}
              src={post.featuredImage.url}
              alt={post.featuredImage.alt}
              loading="lazy"
              width={post.featuredImage.width}
              height={post.featuredImage.height}
            />
          ) : (
            <span className={styles.placeholder()} aria-hidden="true" />
          )}
        </div>
        <div className={styles.body()}>
          <div className={styles.meta()}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <time dateTime={post.date}>{dateFormatter.format(new Date(post.date))}</time>
          </div>
          <Heading as="h2" level="t4" className={styles.title()}>{post.title}</Heading>
          <Text level="p2" className={styles.excerpt()} content={post.excerpt} />
          <span className={styles.action()}>
            Lire l’article <span className={styles.mark()} aria-hidden="true">→</span>
          </span>
        </div>
      </a>
    </article>
  );
}
