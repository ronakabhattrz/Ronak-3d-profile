import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineClock } from "react-icons/hi2";

import {
  upworkCatalogIntro,
  upworkCatalogItems,
} from "../data/upworkCatalog";
import { fadeIn } from "../variants";

const UpworkProjectCatalog = ({ isFirst = false }) => {
  return (
    <motion.section
      variants={fadeIn("up", 0.25)}
      initial="hidden"
      animate="show"
      exit="hidden"
      className={
        isFirst
          ? "w-full"
          : "w-full mt-16 border-t border-white/10 pt-12 sm:mt-20 sm:pt-14 xl:mt-24"
      }
      aria-labelledby="upwork-catalog-heading"
    >
      <h3
        id="upwork-catalog-heading"
        className="text-xl sm:text-2xl font-semibold text-center xl:text-left mb-3"
      >
        Project <span className="text-accent">catalog</span>
      </h3>
      <p className="text-sm sm:text-base text-white/65 text-center xl:text-left max-w-2xl mb-8 sm:mb-10">
        {upworkCatalogIntro}
      </p>

      <ul className="flex flex-col gap-5 sm:gap-6 list-none p-0 m-0">
        {upworkCatalogItems.map((item) => (
          <li key={item.href}>
            <article className="group flex flex-col md:flex-row md:items-stretch rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] shadow-lg shadow-black/25 ring-1 ring-white/5 overflow-hidden transition-all duration-300 hover:border-accent/30 hover:shadow-[0_0_32px_rgba(241,48,36,0.08)]">
              <div className="relative w-full md:w-[min(42%,280px)] md:shrink-0 aspect-[16/10] md:aspect-auto md:min-h-[200px] bg-black/30">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  quality={78}
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.02] md:group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 280px"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between gap-4 p-5 sm:p-6 md:py-6 md:pr-6 md:pl-8">
                <div>
                  <h4 className="text-base sm:text-lg font-semibold text-white leading-snug mb-3 pr-1">
                    {item.title}
                  </h4>
                  {item.description ? (
                    <p className="text-sm text-white/60 leading-relaxed max-w-xl">
                      {item.description}
                    </p>
                  ) : null}
                </div>

                <div className="flex flex-wrap items-center gap-3 sm:gap-5">
                  <span className="inline-flex items-center rounded-lg border border-accent/25 bg-accent/10 px-3 py-1.5 text-sm font-medium text-accent">
                    {item.priceLabel}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-sm text-white/55">
                    <HiOutlineClock
                      className="text-lg text-white/40 shrink-0"
                      aria-hidden
                    />
                    {item.deliveryLabel}
                  </span>
                </div>

                <div className="pt-1">
                  <Link
                    href={item.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/[0.06] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:border-accent/40 hover:bg-accent/10 hover:text-accent"
                  >
                    View on Upwork
                  </Link>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </motion.section>
  );
};

export default UpworkProjectCatalog;
