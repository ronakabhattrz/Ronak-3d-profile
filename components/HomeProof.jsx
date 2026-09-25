import { motion } from "framer-motion";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi2";

import TestimonialCard from "./TestimonialCard";
import { testimonialData } from "../data/testimonials";
import { fadeIn } from "../variants";

/** Named clients with the most specific feedback — shown on Home. */
const FEATURED = ["Pat Russell", "Timothy Franklyn", "Martijn Deinum"];

const HomeProof = () => {
  const featured = FEATURED.map((name) =>
    testimonialData.find((t) => t.name === name)
  ).filter(Boolean);

  return (
    <section aria-labelledby="home-proof-heading" className="pt-24 sm:pt-32">
      <div className="mb-10 flex flex-col gap-4 sm:mb-14 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow">Client feedback</p>
          <h2 id="home-proof-heading" className="h3 mt-4 max-w-xl sm:text-4xl">
            Teams that keep <span className="em">coming back.</span>
          </h2>
        </div>
        <Link
          href="/testimonials"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-300 transition-colors hover:text-white"
        >
          Read all {testimonialData.length} reviews <HiArrowRight aria-hidden />
        </Link>
      </div>

      <ul className="grid gap-4 md:grid-cols-3">
        {featured.map((person, i) => (
          <motion.li
            key={person.name}
            variants={fadeIn("up", 0.05 * i)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="flex"
          >
            <TestimonialCard person={person} className="w-full" />
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default HomeProof;
