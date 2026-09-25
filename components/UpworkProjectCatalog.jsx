import { motion } from "framer-motion";
import Image from "next/image";
import { HiArrowUpRight, HiOutlineClock } from "react-icons/hi2";

import {
  upworkCatalogIntro,
  upworkCatalogItems,
} from "../data/upworkCatalog";
import { fadeIn } from "../variants";

const UpworkProjectCatalog = () => {
  return (
    <section className="my-24" aria-labelledby="upwork-catalog-heading">
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow">Fixed-price packages</p>
          <h2 id="upwork-catalog-heading" className="h3 mt-4">
            Project <span className="em">catalog</span>
          </h2>
        </div>
        <p className="max-w-md text-[15px]">{upworkCatalogIntro}</p>
      </div>

      <ul className="grid gap-4 md:grid-cols-3">
        {upworkCatalogItems.map((item, i) => (
          <motion.li
            key={item.href}
            variants={fadeIn("up", 0.05 * i)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            <article className="card card-hover group flex h-full flex-col overflow-hidden p-2">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[1.1rem] bg-ink-800">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  quality={78}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
                <span className="absolute left-3 top-3 rounded-full bg-ink-950/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                  {item.priceLabel}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-4 pt-5">
                <h3 className="text-base font-semibold leading-snug text-white">
                  {item.title}
                </h3>
                {item.description ? (
                  <p className="mt-2 text-sm">{item.description}</p>
                ) : null}

                <div className="mt-auto flex items-center justify-between gap-3 pt-6">
                  <span className="inline-flex items-center gap-1.5 text-xs text-zinc-400">
                    <HiOutlineClock className="text-base" aria-hidden />
                    {item.deliveryLabel}
                  </span>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1 text-sm font-medium text-white transition-colors hover:text-accent"
                  >
                    View on Upwork
                    <HiArrowUpRight aria-hidden />
                  </a>
                </div>
              </div>
            </article>
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default UpworkProjectCatalog;
