import Image from "next/image";
import { motion } from "framer-motion";
import { HiArrowUpRight } from "react-icons/hi2";

import { fadeIn } from "../variants";

/**
 * Thumbnails: add files under /public/projects/ (see path per item).
 */
const portfolioItems = [
  {
    title: "All Pro IFM",
    path: "/projects/all-pro-ifm.jpg",
    link: "https://allproifm.com/",
  },
  {
    title: "Jager Lodge",
    path: "/projects/jager-lodge.png",
    link: "https://jagerlodge.at/",
  },
  {
    title: "Bulletproof Cyber Security",
    path: "/projects/bulletproof.png",
    link: "https://www.bulletproof.co.uk/",
  },
  {
    title: "NSoJ",
    path: "/projects/nsoj.png",
    link: "https://www.nsoj.in/",
  },
  {
    title: "Pit Stop USA",
    path: "/projects/pit-stop-usa.jpg",
    link: "https://pitstopusa.com/",
  },
  {
    title: "Nav Eco",
    path: "/projects/nav-eco.png",
    link: "https://www.nav-eco.fr/en",
  },
  {
    title: "Auto Service Haarlem",
    path: "/projects/auto-service-haarlem.jpg",
    link: "https://autoservicehaarlem.nl/",
  },
];

const hostOf = (url) => new URL(url).hostname.replace(/^www\./, "");

/**
 * Large-screen tile width on a 6-column grid: the first two are wide (3 cols),
 * the rest sit three to a row (2 cols), and any leftover tiles in the last row
 * stretch so the grid has no gaps.
 */
const isWide = (i, total) => {
  if (i < 2) return true;
  const leftover = (total - 2) % 3;
  return leftover === 2 && i >= total - 2;
};
const spanClass = (i, total) => {
  if (isWide(i, total)) return "lg:col-span-3";
  if ((total - 2) % 3 === 1 && i === total - 1) return "lg:col-span-6";
  return "lg:col-span-2";
};

const WorkSlider = () => {
  return (
    <ul className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-6">
      {portfolioItems.map((item, i) => (
        <motion.li
          key={item.title}
          variants={fadeIn("up", 0.04 * (i % 3))}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className={spanClass(i, portfolioItems.length)}
        >
          <a
            href={item.link}
            target="_blank"
            rel="noreferrer noopener"
            className="card group block overflow-hidden p-2 transition-colors duration-300 hover:border-white/[0.16]"
          >
            <div
              className={`relative w-full overflow-hidden rounded-[1.1rem] bg-ink-800 ${
                isWide(i, portfolioItems.length)
                  ? "aspect-[16/10]"
                  : spanClass(i, portfolioItems.length) === "lg:col-span-6"
                    ? "aspect-[4/3] lg:aspect-[21/9]"
                    : "aspect-[4/3]"
              }`}
            >
              <Image
                src={item.path}
                alt={`${item.title} website`}
                fill
                quality={78}
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                sizes={
                  isWide(i, portfolioItems.length)
                    ? "(max-width: 640px) 100vw, (max-width: 960px) 50vw, 600px"
                    : "(max-width: 640px) 100vw, (max-width: 960px) 50vw, 400px"
                }
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
            </div>
            <div className="flex items-center justify-between gap-3 px-3 pb-2 pt-4">
              <div className="min-w-0">
                <h3 className="truncate text-base font-semibold text-white">
                  {item.title}
                </h3>
                <p className="truncate font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-400">
                  {hostOf(item.link)}
                </p>
              </div>
              <span
                aria-hidden
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-zinc-400 transition-all duration-300 group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-white"
              >
                <HiArrowUpRight />
              </span>
            </div>
          </a>
        </motion.li>
      ))}
    </ul>
  );
};

export default WorkSlider;
