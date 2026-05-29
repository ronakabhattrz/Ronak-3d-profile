import { motion } from "framer-motion";

import Bulb from "../../components/Bulb";
import Circles from "../../components/Circles";
import UpworkProjectCatalog from "../../components/UpworkProjectCatalog";
import WorkSlider from "../../components/WorkSlider";
import { fadeIn } from "../../variants";

const Work = () => {
  return (
    <div className="work-page-scroll relative z-0 min-h-full overflow-x-hidden bg-primary/30">
      <Circles />
      <div className="container mx-auto px-4 pt-32 pb-28 sm:px-6 sm:pt-24 sm:pb-32 lg:px-8 xl:pt-28 xl:pb-36">
        <header className="mx-auto mb-10 max-w-3xl text-center sm:mb-12 xl:mx-0 xl:text-left">
          <motion.h1
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="h2 mb-3 sm:mb-4"
          >
            Selected <span className="text-accent">work</span>
          </motion.h1>
          <motion.p
            variants={fadeIn("up", 0.35)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="text-sm sm:text-base leading-relaxed text-white/65"
          >
            Start with the Upwork project catalog for predefined packages, then
            browse major sites and products I&apos;ve shipped.
          </motion.p>
        </header>

        <div className="mx-auto max-w-5xl xl:mx-0 xl:max-w-none">
          <UpworkProjectCatalog isFirst />
        </div>

        <motion.div
          variants={fadeIn("up", 0.45)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="mx-auto mt-16 w-full max-w-5xl border-t border-white/10 pt-12 sm:mt-20 sm:pt-14 xl:mx-0 xl:mt-24 xl:max-w-none"
        >
          <h2 className="mb-6 text-center text-xl font-semibold sm:mb-8 sm:text-2xl xl:text-left">
            Major <span className="text-accent">projects</span>
          </h2>
          <WorkSlider />
        </motion.div>
      </div>
      <Bulb />
    </div>
  );
};

export default Work;
