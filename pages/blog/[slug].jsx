import Link from "next/link";
import { HiArrowLeft, HiArrowRight, HiArrowUpRight } from "react-icons/hi2";

import BookCallButton from "../../components/BookCallButton";
import JsonLd from "../../components/JsonLd";
import { getMediumPosts } from "../../lib/mediumFeed";
import { breadcrumbJsonLd, personRef } from "../../lib/schema";
import { ogImageFor } from "../../lib/seo";
import { SITE_URL } from "../../lib/site";

export async function getStaticPaths() {
  const posts = await getMediumPosts();
  return {
    paths: posts.map((p) => ({ params: { slug: p.slug } })),
    // New Medium posts get a page on first visit, then are cached
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const posts = await getMediumPosts({ withHtml: true, throwOnError: true });
  const index = posts.findIndex((p) => p.slug === params.slug);
  if (index === -1) return { notFound: true, revalidate: 3600 };

  const post = posts[index];
  const more = posts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3)
    .map(({ slug, title, pubDate, minutes }) => ({ slug, title, pubDate, minutes }));
  const url = `${SITE_URL}/blog/${post.slug}`;
  const description =
    post.snippet.length > 158 ? `${post.snippet.slice(0, 155).trim()}…` : post.snippet;

  return {
    props: {
      post,
      more,
      seo: {
        title: `${post.title} | Ronak Bhatt`,
        description,
        canonical: url,
        ogImage: ogImageFor(post.title, "Article"),
        ogImageAlt: post.title,
        type: "article",
      },
    },
    revalidate: 3600,
  };
}

const formatDate = (value) => {
  const d = new Date(value);
  return Number.isNaN(d.getTime())
    ? ""
    : d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
};

const BlogPost = ({ post, more }) => {
  const url = `${SITE_URL}/blog/${post.slug}`;
  const published = post.pubDate ? new Date(post.pubDate).toISOString() : undefined;

  return (
    <div className="container max-w-content">
      <JsonLd
        id={`post-${post.slug}`}
        data={[
          breadcrumbJsonLd(`/blog/${post.slug}`, post.title, { path: "/blog", name: "Blog" }),
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            url,
            mainEntityOfPage: url,
            ...(published ? { datePublished: published } : {}),
            ...(post.image ? { image: post.image } : {}),
            keywords: post.tags.join(", "),
            author: personRef,
            publisher: personRef,
          },
        ]}
      />

      <article className="mx-auto max-w-[720px] pb-24 pt-32 sm:pt-40">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
        >
          <HiArrowLeft aria-hidden /> All articles
        </Link>

        <header className="mt-8 animate-fade-up">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-400">
            {published ? <time dateTime={published}>{formatDate(post.pubDate)}</time> : null}
            <span aria-hidden>·</span>
            <span>{post.minutes} min read</span>
          </div>
          <h1 className="mt-4 text-[2rem] font-semibold leading-[1.1] tracking-[-0.03em] text-white sm:text-5xl">
            {post.title}
          </h1>
          {post.tags.length ? (
            <ul className="mt-5 flex flex-wrap gap-1.5">
              {post.tags.map((t) => (
                <li key={t} className="chip text-[11px] text-zinc-400">
                  {t}
                </li>
              ))}
            </ul>
          ) : null}
        </header>

        <div
          className="article mt-10"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        <footer className="mt-14 space-y-6 border-t border-white/[0.07] pt-8">
          <p className="text-sm">
            Also published on{" "}
            <a
              href={post.link}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1 text-white underline decoration-accent/60 underline-offset-4"
            >
              Medium <HiArrowUpRight aria-hidden />
            </a>
            , where you can comment and clap.
          </p>

          <div className="card flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <p className="text-lg font-semibold text-white">Need help with your app?</p>
              <p className="mt-1 text-[15px]">
                I build and upgrade Rails and React apps for teams in Canada, the
                US and Europe.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary shrink-0">
                Start a project
              </Link>
              <BookCallButton />
            </div>
          </div>
        </footer>
      </article>

      {more.length ? (
        <section aria-labelledby="more-heading" className="mx-auto mb-24 max-w-[720px]">
          <h2 id="more-heading" className="eyebrow">
            More articles
          </h2>
          <ul className="mt-5 divide-y divide-white/[0.07] border-y border-white/[0.07]">
            {more.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="group flex items-center justify-between gap-6 py-5"
                >
                  <span className="text-[15px] font-medium text-white group-hover:text-accent">
                    {p.title}
                  </span>
                  <HiArrowRight aria-hidden className="shrink-0 text-zinc-400" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
};

export default BlogPost;
