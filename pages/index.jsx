import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { HiArrowDownTray, HiArrowRight } from "react-icons/hi2";

import Avatar from "../components/Avatar";
import Socials from "../components/Socials";
import Stats from "../components/Stats";
import { stackTicker } from "../data/profile";
import { siteMeta } from "../lib/site";
import { fadeIn } from "../variants";

const ParticlesContainer = dynamic(
  () => import("../components/ParticlesContainer"),
  { ssr: false }
);

const highlights = [
  {
    title: "Backend that scales",
    text: "Rails architecture, APIs and data models built to stay maintainable as the product grows.",
  },
  {
    title: "Front-ends people enjoy",
    text: "React, Vue and Next.js interfaces that are fast, accessible and pleasant to use.",
  },
  {
    title: "Upgrades without drama",
    text: "Rails version upgrades, refactors and CI/CD, with every existing feature still working afterwards.",
  },
];

const Home = () => {
  return (
    <>
      <section className="relative">
        {/* Particle field — desktop only, sits behind the hero */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden opacity-70 xl:block [mask-image:radial-gradient(ellipse_at_70%_40%,#000_20%,transparent_70%)]"
        >
          <ParticlesContainer />
        </div>

        <div className="container relative grid max-w-content items-center gap-14 pb-16 pt-32 sm:pt-40 lg:min-h-[100svh] lg:grid-cols-[1.3fr_0.7fr] lg:gap-10 lg:py-28">
          <div className="text-center lg:text-left">
            <motion.div
              variants={fadeIn("up", 0.05)}
              initial="hidden"
              animate="show"
              className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] py-1.5 pl-2.5 pr-4 text-xs font-medium text-zinc-300 backdrop-blur"
            >
              <span className="h-2 w-2 animate-pulse-dot rounded-full bg-emerald-400" />
              Open to new opportunities
            </motion.div>

            <motion.h1
              variants={fadeIn("up", 0.12)}
              initial="hidden"
              animate="show"
              className="h1 mt-7"
            >
              Ruby on Rails &amp; JS <br className="hidden sm:block" />
              full-stack <span className="em">that ships.</span>
            </motion.h1>

            <motion.div
              variants={fadeIn("up", 0.2)}
              initial="hidden"
              animate="show"
              className="mx-auto mt-7 max-w-xl space-y-4 text-base sm:text-lg lg:mx-0"
            >
              <p>
                I&apos;m Ronak Bhatt, a full-stack developer with{" "}
                <strong className="font-medium text-white">8+ years</strong> of
                Ruby, Rails, React, Vue and Node. I build scalable web apps, tune
                performance, and keep backend architecture maintainable.
              </p>
              <p className="hidden sm:block">
                I enjoy complex problems, smoother development processes, and
                reliable delivery for growing products.
              </p>
            </motion.div>

            <motion.div
              variants={fadeIn("up", 0.28)}
              initial="hidden"
              animate="show"
              className="mt-9 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
            >
              <Link href="/work" className="btn-primary group">
                View my work
                <HiArrowRight
                  aria-hidden
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
              <a
                href={siteMeta.resumeUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="btn-ghost"
              >
                <HiArrowDownTray aria-hidden />
                Resume
              </a>
            </motion.div>

            <motion.div
              variants={fadeIn("up", 0.34)}
              initial="hidden"
              animate="show"
              className="mt-10 flex justify-center lg:justify-start"
            >
              <Socials />
            </motion.div>
          </div>

          <motion.div
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            animate="show"
            className="px-6 sm:px-10 lg:px-0"
          >
            <Avatar priority />
          </motion.div>
        </div>
      </section>

      {/* Tech ticker */}
      <section aria-label="Tech stack" className="relative border-y border-white/[0.06] bg-ink-900/60 py-5">
        <div className="mask-x overflow-hidden">
          <ul className="flex w-max animate-marquee gap-10 pr-10 hover:[animation-play-state:paused]">
            {[...stackTicker, ...stackTicker].map((tech, i) => (
              <li
                key={`${tech}-${i}`}
                aria-hidden={i >= stackTicker.length}
                className="flex items-center gap-10 whitespace-nowrap font-mono text-sm uppercase tracking-[0.16em] text-zinc-400"
              >
                {tech}
                <span className="h-1 w-1 rounded-full bg-accent/70" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container max-w-content py-20 sm:py-28">
        <div className="mb-10 flex flex-col gap-4 sm:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">What I bring</p>
            <h2 className="h3 mt-4 max-w-xl sm:text-4xl">
              Clean code, modern tooling, <span className="em">reliable delivery.</span>
            </h2>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-300 transition-colors hover:text-white"
          >
            All services <HiArrowRight aria-hidden />
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {highlights.map((h, i) => (
            <motion.article
              key={h.title}
              variants={fadeIn("up", 0.05 * i)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="card card-hover p-7"
            >
              <span className="font-mono text-xs text-accent">0{i + 1}</span>
              <h3 className="mt-6 text-lg font-semibold text-white">{h.title}</h3>
              <p className="mt-2 text-[15px]">{h.text}</p>
            </motion.article>
          ))}
        </div>

        <Stats className="mt-4" />
      </section>
    </>
  );
};

export default Home;
