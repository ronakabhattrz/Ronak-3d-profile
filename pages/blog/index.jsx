import Image from "next/image";
import { motion } from "framer-motion";
import { HiArrowUpRight } from "react-icons/hi2";

import JsonLd from "../../components/JsonLd";
import PageHeader from "../../components/PageHeader";
import { getMediumPosts } from "../../lib/mediumFeed";
import { blogJsonLd, breadcrumbJsonLd } from "../../lib/schema";
import { siteMeta } from "../../lib/site";
import { fadeIn } from "../../variants";

export async function getStaticProps() {
  const posts = await getMediumPosts();
  return {
    props: { posts },
    revalidate: 3600,
  };
}

function formatDate(isoOrRfc) {
  if (!isoOrRfc) return "";
  const d = new Date(isoOrRfc);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const Blog = ({ posts }) => {
  return (
    <div className="container max-w-content">
      <JsonLd
        id="blog"
        data={[breadcrumbJsonLd("/blog", "Blog"), blogJsonLd(posts)]}
      />
      <PageHeader
        eyebrow="Writing"
        title={
          <>
            Notes from <span className="em">the codebase.</span>
          </>
        }
        aside={
          <a
            href={siteMeta.mediumUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="btn-ghost"
          >
            @ronakabhattrz on Medium
            <HiArrowUpRight aria-hidden />
          </a>
        }
      >
        <p>
          The latest articles from my Medium. Open any card to read the full
          post (comments and claps stay on Medium).
        </p>
      </PageHeader>

      <h2 className="sr-only">Latest articles from Medium</h2>

      {posts.length === 0 ? (
        <p className="card mb-24 px-6 py-10 text-center text-sm">
          Couldn&apos;t load posts right now. Visit{" "}
          <a
            href={siteMeta.mediumUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="text-white underline decoration-accent/60 underline-offset-4"
          >
            Medium
          </a>{" "}
          directly.
        </p>
      ) : (
        <ul className="mb-24 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => {
            const featured = i === 0;
            return (
              <motion.li
                key={post.link}
                variants={fadeIn("up", 0.04 * (i % 3))}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                className={featured ? "md:col-span-2 lg:col-span-3" : ""}
              >
                <article
                  className={`card card-hover group relative flex h-full flex-col overflow-hidden p-2 ${
                    featured ? "lg:flex-row" : ""
                  }`}
                >
                  <div
                    className={`relative shrink-0 overflow-hidden rounded-[1.1rem] bg-ink-800 ${
                      featured ? "aspect-[16/9] lg:aspect-auto lg:w-[55%]" : "aspect-[16/9]"
                    }`}
                  >
                    {post.image ? (
                      <Image
                        src={post.image}
                        alt=""
                        fill
                        unoptimized
                        sizes={featured ? "(max-width: 960px) 100vw, 640px" : "(max-width: 768px) 100vw, 400px"}
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      />
                    ) : (
                      <div
                        aria-hidden
                        className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(241,48,36,0.25),transparent_60%)] font-serif text-4xl italic text-white/30"
                      >
                        Medium
                      </div>
                    )}
                  </div>

                  <div className={`flex flex-1 flex-col p-4 ${featured ? "lg:p-10" : "pt-5"}`}>
                    <div className="flex items-center gap-3">
                      {featured ? (
                        <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-[11px] font-medium text-accent">
                          Latest
                        </span>
                      ) : null}
                      {formatDate(post.pubDate) ? (
                        <time
                          dateTime={post.pubDate}
                          className="font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-400"
                        >
                          {formatDate(post.pubDate)}
                        </time>
                      ) : null}
                    </div>
                    <h3
                      className={`mt-3 font-semibold leading-snug text-white ${
                        featured ? "text-2xl sm:text-3xl" : "text-lg"
                      }`}
                    >
                      <a
                        href={post.link}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="after:absolute after:inset-0 after:rounded-3xl"
                      >
                        {post.title}
                      </a>
                    </h3>
                    {post.snippet ? (
                      <p
                        className={`mt-3 text-sm ${
                          featured ? "line-clamp-4 sm:text-base" : "line-clamp-3"
                        }`}
                      >
                        {post.snippet}
                      </p>
                    ) : null}
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-zinc-300 transition-colors group-hover:text-accent">
                      Read on Medium
                      <HiArrowUpRight aria-hidden />
                    </span>
                  </div>
                </article>
              </motion.li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Blog;
