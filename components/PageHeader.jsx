import { motion } from "framer-motion";

import { fadeIn } from "../variants";

/**
 * Consistent top-of-page intro: eyebrow label, the page's single H1, and a lead.
 * `title` may contain JSX (e.g. <span className="em">…</span>).
 */
const PageHeader = ({ eyebrow, title, children, align = "left", aside }) => {
  const centered = align === "center";

  return (
    <header
      className={`flex flex-col gap-8 pb-12 pt-32 sm:pb-16 sm:pt-40 lg:flex-row lg:items-end lg:justify-between ${
        centered ? "items-center text-center lg:flex-col lg:items-center" : ""
      }`}
    >
      <div className={centered ? "mx-auto max-w-3xl" : "max-w-3xl"}>
        <motion.p
          variants={fadeIn("up", 0.05)}
          initial="hidden"
          animate="show"
          className="eyebrow"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          variants={fadeIn("up", 0.12)}
          initial="hidden"
          animate="show"
          className="h2 mt-5"
        >
          {title}
        </motion.h1>
        {children ? (
          <motion.div
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            animate="show"
            className={`mt-6 max-w-2xl text-base sm:text-lg [&_p]:text-inherit text-zinc-400 ${
              centered ? "mx-auto" : ""
            }`}
          >
            {children}
          </motion.div>
        ) : null}
      </div>
      {aside ? (
        <motion.div
          variants={fadeIn("up", 0.25)}
          initial="hidden"
          animate="show"
          className="shrink-0"
        >
          {aside}
        </motion.div>
      ) : null}
    </header>
  );
};

export default PageHeader;
