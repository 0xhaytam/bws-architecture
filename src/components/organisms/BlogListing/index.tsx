import { BlogCard } from "@/src/components/molecules/BlogCard";
import { Container } from "@/src/components/primitives/Container";
import { Heading } from "@/src/components/primitives/Heading";
import { Text } from "@/src/components/primitives/Text";
import type { RuntimePost } from "@/src/lib/wp/posts";
import { blogListingStyles } from "./base";

export interface BlogListingProps {
  posts: RuntimePost[];
  page: number;
  totalItems: number;
  totalPages: number;
}

function pageUrl(page: number): string {
  return page <= 1 ? "/blog" : `/blog/page/${page}`;
}

export function BlogListing({ posts, page, totalItems, totalPages }: BlogListingProps) {
  const styles = blogListingStyles();
  return (
    <section className={styles.root()} aria-labelledby="blog-title">
      <Container>
        <header className={styles.headingGrid()}>
          <Text as="span" level="c2" className={styles.kicker()}>Journal</Text>
          <Heading id="blog-title" as="h1" level="t1" className={styles.heading()}>
            Architecture, usages et matière
          </Heading>
          <Text className={styles.introduction()}>
            Réflexions du cabinet, lectures de projets et repères pour mieux comprendre la conception architecturale.
          </Text>
        </header>
        <p className={styles.count()}>{totalItems} {totalItems > 1 ? "articles" : "article"}</p>
        {posts.length ? (
          <div className={styles.grid()}>
            {posts.map((post, index) => <BlogCard key={post.id} post={post} index={index} />)}
          </div>
        ) : (
          <Text className={styles.empty()}>Aucun article n’est encore publié.</Text>
        )}
        {totalPages > 1 ? (
          <nav className={styles.pagination()} aria-label="Pagination du blog">
            {page > 1 ? <a className={styles.paginationLink()} href={pageUrl(page - 1)}>← Page précédente</a> : <span />}
            <span className={styles.paginationCurrent()}>Page {page} / {totalPages}</span>
            {page < totalPages ? <a className={styles.paginationLink()} href={pageUrl(page + 1)}>Page suivante →</a> : <span />}
          </nav>
        ) : null}
      </Container>
    </section>
  );
}
