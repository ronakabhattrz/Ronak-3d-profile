import Image from "next/image";
import { motion } from "framer-motion";
import { HiArrowUpRight } from "react-icons/hi2";

import Bulb from "../../components/Bulb";
import Circles from "../../components/Circles";
import { getMediumPosts } from "../../lib/mediumFeed";
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
    <>
      <div className="relative z-0 min-h-full bg-primary/30 py-32 sm:py-36">
        <Circles />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <header className="text-center xl:text-left mb-10 sm:mb-12">
            <motion.h1
              variants={fadeIn("up", 0.2)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="h2 mb-4"
            >
              Blog <span className="text-accent">.</span>
            </motion.h1>
            <motion.p
              variants={fadeIn("up", 0.35)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="text-sm sm:text-base text-white/65 leading-relaxed max-w-xl mx-auto xl:mx-0 mb-6"
            >
              Posts from my Medium. Open any card to read the full article
              (comments and claps stay on Medium).
            </motion.p>
            <motion.div
              variants={fadeIn("up", 0.4)}
              initial="hidden"
              animate="show"
              exit="hidden"
            >
              <a
                href={siteMeta.mediumUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
              >
                @ronakabhattrz on Medium
                <HiArrowUpRight className="text-base" aria-hidden />
              </a>
            </motion.div>
          </header>

          <motion.h2
            variants={fadeIn("up", 0.42)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="text-center xl:text-left text-lg sm:text-xl font-semibold text-white/90 mb-6 sm:mb-8"
          >
            Latest 10 articles from Medium
          </motion.h2>

          <motion.div
            variants={fadeIn("up", 0.45)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="flex flex-col gap-4 sm:gap-5"
          >
            {posts.length === 0 ? (
              <p className="text-center xl:text-left text-white/60 text-sm py-8 rounded-2xl border border-white/10 bg-white/[0.03] px-6">
                Couldn&apos;t load posts right now. Visit{" "}
                <a
                  href={siteMeta.mediumUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-accent hover:underline"
                >
                  Medium
                </a>{" "}
                directly.
              </p>
            ) : (
              posts.map((post) => (
                <article
                  key={post.link}
                  className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] p-4 sm:p-5 shadow-lg shadow-black/20 ring-1 ring-white/5 transition-all duration-300 hover:border-accent/30"
                >
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
                    <a
                      href={post.link}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="relative block w-full sm:w-44 md:w-52 shrink-0 aspect-[16/10] sm:aspect-[4/3] rounded-xl overflow-hidden bg-black/35 outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f] group/thumb"
                    >
                      {post.image ? (
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          unoptimized
                          sizes="(max-width: 640px) 100vw, 208px"
                          className="object-cover transition-transform duration-500 group-hover/thumb:scale-[1.04]"
                        />
                      ) : (
                        <div
                          className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-white/[0.08] to-white/[0.02] text-[11px] font-medium uppercase tracking-wider text-white/35"
                          aria-hidden
                        >
                          No preview
                        </div>
                      )}
                    </a>

                    <div className="flex min-w-0 flex-1 flex-col gap-3">
                      {formatDate(post.pubDate) ? (
                        <time
                          dateTime={post.pubDate}
                          className="text-xs uppercase tracking-widest text-white/45"
                        >
                          {formatDate(post.pubDate)}
                        </time>
                      ) : null}
                      <h2 className="text-lg sm:text-xl font-semibold text-white leading-snug">
                        <a
                          href={post.link}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="hover:text-accent transition-colors"
                        >
                          {post.title}
                        </a>
                      </h2>
                      {post.snippet ? (
                        <p className="text-sm text-white/60 leading-relaxed line-clamp-3 sm:line-clamp-4">
                          {post.snippet}
                        </p>
                      ) : null}
                      <div className="mt-auto pt-1">
                        <a
                          href={post.link}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
                        >
                          Read on Medium
                          <HiArrowUpRight className="text-base" aria-hidden />
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              ))
            )}
          </motion.div>
        </div>
        <Bulb />
      </div>
    </>
  );
};

export default Blog;
