import { motion } from "framer-motion";

import TestimonialSlider from "../../components/TestimonialSlider";
import { upworkProfileUrl } from "../../data/testimonials";
import { fadeIn } from "../../variants";

const Testimonials = () => {
  return (
    <div className="min-h-full bg-primary/30 py-32 text-center">
      <div className="container mx-auto flex min-h-full flex-col justify-center">
        <motion.h2
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="h2 mb-4 xl:mb-2"
        >
          Client{" "}
          <span className="text-accent">testimonials.</span>
        </motion.h2>

        <motion.p
          variants={fadeIn("up", 0.25)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="text-sm text-white/70 mb-8 xl:mb-10 max-w-xl mx-auto"
        >
          More public feedback on{" "}
          <a
            href={upworkProfileUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="text-accent hover:underline"
          >
            Upwork
          </a>
          .
        </motion.p>

        {/* slider */}
        <motion.div
          variants={fadeIn("up", 0.4)}
          initial="hidden"
          animate="show"
          exit="hidden"
        >
          <TestimonialSlider />
        </motion.div>
      </div>
    </div>
  );
};

export default Testimonials;
