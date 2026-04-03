import { motion } from "framer-motion";

import ParticlesContainer from "../components/ParticlesContainer";
import ProjectsBtn from "../components/ProjectsBtn";
import Avatar from "../components/Avatar";

import { fadeIn } from "../variants";

const Home = () => {
  return (
    <div className="relative min-h-full overflow-hidden bg-primary">
      {/* Full-bleed red atmosphere (one layer — avoids a separate “box” panel) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary via-[#1a1018] to-[#3a141c]"
      />
      {/* Explosion art + network glow — mobile/tablet only; desktop uses the xl hero strip */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 max-xl:block xl:hidden bg-explosion bg-cover bg-[center_30%] bg-no-repeat opacity-[0.28] mix-blend-color-dodge"
      />
      <div className="relative z-10 min-h-full w-full">
        <div className="container mx-auto flex min-h-[calc(100dvh-5.5rem)] max-xl:min-h-[calc(100dvh-10.5rem)] flex-col justify-center gap-6 px-4 py-8 text-center sm:gap-8 sm:px-6 sm:py-10 xl:gap-8 xl:py-12 xl:text-left">
          {/* title */}
          <motion.h1
            variants={fadeIn("down", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="h1"
          >
            Ruby on Rails &amp; JS <br />
            <span className="text-accent">Full-stack</span> that ships
          </motion.h1>

          {/* subtitle */}
          <motion.div
            variants={fadeIn("down", 0.3)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="mx-auto max-w-md space-y-4 text-[17px] leading-relaxed text-white/65 sm:text-[18px] xl:mx-0 xl:max-w-xl"
          >
            <p>
              I&apos;m Ronak Bhatt — a Ruby on Rails and JavaScript full-stack
              developer with <strong className="font-medium text-white/80">9+ years</strong>{" "}
              in the stack. I focus on clean, efficient code and ship features with
              Ruby, Rails, React, Vue, and Node, and I help teams adopt modern
              workflows.
            </p>
            <p>
              I specialize in scalable web apps, performance tuning, and
              maintainable backend architecture. I enjoy complex problems,
              smoother development processes, and reliable delivery for growing
              products.
            </p>
            <p>
              Clean code and modern tooling matter to me; I keep exploring tech
              that helps ship faster and better
              {"."}
            </p>
          </motion.div>

          {/* avatar — tablet only (md–xl); hidden on phones; xl+ uses large art panel */}
          <motion.div
            variants={fadeIn("up", 0.35)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="relative z-10 hidden justify-center md:flex xl:hidden"
          >
            <Avatar />
          </motion.div>

          {/* projects link — centered with balanced space (mobile); desktop in flow */}
          <motion.div
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="flex w-full justify-center py-8 max-xl:py-10 xl:hidden"
          >
            <ProjectsBtn />
          </motion.div>
          <motion.div
            variants={fadeIn("down", 0.4)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="hidden xl:flex xl:justify-start"
          >
            <ProjectsBtn />
          </motion.div>
        </div>
      </div>
      {/* Desktop-only hero art + particles (off on small screens — avoids canvas blocking taps) */}
      <div className="pointer-events-none absolute bottom-0 right-0 hidden h-full w-[1280px] xl:block">
        {/* bg img */}
        <div
          role="img"
          className="bg-none xl:bg-explosion xl:bg-cover xl:bg-right xl:bg-no-repeat w-full h-full absolute mix-blend-color-dodge translate-z-0"
          aria-hidden
        />

        {/* particles */}
        <ParticlesContainer />

        {/* avatar — desktop hero only */}
        <motion.div
          variants={fadeIn("up", 0.5)}
          initial="hidden"
          animate="show"
          exit="hidden"
          transition={{ duration: 1, ease: "easeInOut" }}
          className="hidden xl:flex w-full h-full max-w-[737px] max-h-[678px] absolute bottom-0 right-[8%] items-end"
        >
          <Avatar />
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
