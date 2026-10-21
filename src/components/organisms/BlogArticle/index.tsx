import { Container } from "@/src/components/primitives/Container";
import { Heading } from "@/src/components/primitives/Heading";
import type { RuntimePost } from "@/src/lib/wp/posts";
import { responsiveImageAttributes } from "@/src/lib/image";
import { blogArticleStyles } from "./base";

export interface BlogArticleProps { post: RuntimePost }

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

export function BlogArticle({ post }: BlogArticleProps) {
  const styles = blogArticleStyles();
  return (
    <article className={styles.root()}>
      <Container>
        <header className={styles.header()}>
          <a className={styles.back()} href="/blog">← Tous les articles</a>
          <div className={styles.titleWrap()}>
            <Heading as="h1" level="t1" className={styles.title()}>{post.title}</Heading>
            <time className={styles.date()} dateTime={post.date}>{dateFormatter.format(new Date(post.date))}</time>
          </div>
        </header>
        {post.featuredImage?.url ? (
          <figure className={styles.media()}>
            <img
              className={styles.image()}
              {...responsiveImageAttributes(post.featuredImage.url, {
                sizes: "(max-width: 1280px) 100vw, 1200px",
                originalWidth: post.featuredImage.width,
              })}
              alt={post.featuredImage.alt}
              width={post.featuredImage.width}
              height={post.featuredImage.height}
            />
          </figure>
        ) : null}
        <div className={styles.content()} dangerouslySetInnerHTML={{ __html: post.content }} />
      </Container>
    </article>
  );
}
