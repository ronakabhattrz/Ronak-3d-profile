import { motion } from "framer-motion";
import { useState } from "react";
import CountUp from "react-countup";
import { FaCss3, FaHtml5, FaJs, FaReact } from "react-icons/fa";
import {
  SiAmazonaws,
  SiDocker,
  SiGraphql,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiRedis,
  SiRubyonrails,
  SiTypescript,
  SiVuedotjs,
} from "react-icons/si";

import Avatar from "../../components/Avatar";
import Circles from "../../components/Circles";
import { fadeIn } from "../../variants";

export const aboutData = [
  {
    title: "skills",
    info: [
      {
        title: "Rails, JS & frontend",
        icons: [
          { Icon: SiRubyonrails, name: "Ruby on Rails" },
          { Icon: FaJs, name: "JavaScript" },
          { Icon: FaReact, name: "React" },
          { Icon: SiVuedotjs, name: "Vue.js" },
          { Icon: SiNodedotjs, name: "Node.js" },
          { Icon: SiTypescript, name: "TypeScript" },
          { Icon: FaHtml5, name: "HTML5" },
          { Icon: FaCss3, name: "CSS3" },
          { Icon: SiPython, name: "Python" },
        ],
      },
      {
        title: "Data, APIs & DevOps",
        icons: [
          { Icon: SiPostgresql, name: "PostgreSQL" },
          { Icon: SiRedis, name: "Redis" },
          { Icon: SiGraphql, name: "GraphQL" },
          { Icon: SiDocker, name: "Docker" },
          { Icon: SiAmazonaws, name: "Amazon AWS" },
        ],
      },
    ],
  },
  {
    title: "certifications",
    info: [
      {
        title: "Upwork — Top Rated Plus Developer",
        stage: "Freelance excellence",
      },
      {
        title: "Ruby on Rails — professional certification",
        stage: "Backend specialization",
      },
      {
        title: "NCC (National Cadet Corps)",
        stage: "India",
      },
      {
        title: "Emmersion English Speaking — C1",
        stage: "Professional proficiency",
      },
    ],
  },
  {
    title: "experience",
    info: [
      {
        title: "Full-stack Developer — Crowdlinker",
        stage:
          "Nov 2025 - Present · Toronto, ON — Rails, React, Node, Python, APIs & testing",
      },
      {
        title: "Lead Software Developer — All Pro IFM",
        stage: "Nov 2022 - Oct 2025 · Remote (USA)",
      },
      {
        title: "Ruby Developer — Bulletproof (Cyber Security)",
        stage: "Jan 2022 - Nov 2022 · UK (remote)",
      },
      {
        title: "Senior Engineer / Team Lead — Crest Data Systems",
        stage:
          "May 2021 - Jan 2022 · Ahmedabad — Python, React, scalable web apps",
      },
      {
        title: "Senior Software Engineer — MainStreet (Hoist)",
        stage: "Aug 2020 - Apr 2021 · Remote (USA) — Rails & JavaScript",
      },
      {
        title: "Software Engineer — Upwork (Autoservicehaarlem)",
        stage:
          "Sep 2017 - Jul 2020 · Remote — Rails, JavaScript, multiple domains",
      },
    ],
  },
  {
    title: "credentials",
    info: [
      {
        title:
          "B.Tech Computer Engineering — Sal Institute of Technology & Engineering Research (GTU)",
        stage: "2014 - 2017",
      },
      {
        title: "Diploma, Computer Science — Shree Swaminarayan Gurukul College",
        stage: "2009 - 2013",
      },
      {
        title: "Secondary — Diwan Ballubhai School, Ahmedabad",
        stage: "1999 - 2009",
      },
    ],
  },
];

const stats = [
  { end: 69, label: "Projects done" },
  { end: 65, label: "Happy clients" },
  { end: 8, label: "Years experience" },
  { end: 5, label: "Certifications" },
];

const About = () => {
  const [index, setIndex] = useState(0);

  return (
    <div className="min-h-full overflow-x-hidden bg-primary/30">
      <Circles />

      <motion.div
        variants={fadeIn("right", 0.2)}
        initial="hidden"
        animate="show"
        exit="hidden"
        className="hidden xl:flex absolute bottom-0 -left-[320px] pointer-events-none select-none"
        aria-hidden
      >
        <Avatar />
      </motion.div>

      <div className="container mx-auto max-w-7xl px-4 pt-28 pb-20 sm:px-6 sm:pt-24 sm:pb-28 lg:px-8 xl:pt-28 xl:pb-32">
        <div className="flex flex-col xl:flex-row xl:items-start gap-10 xl:gap-14 xl:justify-between">
          {/* Left: intro */}
          <div className="flex-1 min-w-0 xl:max-w-[52%] text-center xl:text-left">
            <motion.div
              variants={fadeIn("right", 0.15)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="mb-3 inline-flex xl:block rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-accent"
            >
              Web Development Expert 🚀
            </motion.div>

            <motion.h1
              variants={fadeIn("right", 0.2)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="h2 mb-6 xl:mb-8"
            >
              About <span className="text-accent">me</span>
            </motion.h1>

            <div className="mx-auto xl:mx-0 max-w-xl xl:max-w-none space-y-5 text-[15px] sm:text-base leading-relaxed">
              <motion.p
                className="text-white/80 font-light"
                variants={fadeIn("right", 0.35)}
                initial="hidden"
                animate="show"
                exit="hidden"
              >
                Hello! I am a highly experienced Ruby on Rails / JS full-stack
                developer with a strong focus on writing clean and efficient
                code. With 8+ years of experience, I bring a wealth of
                expertise to the table. If you are searching for an expert who
                perfectly matches my skill set, look no further. I am here to
                provide comprehensive solutions tailored to your specific
                workflow needs and to help you integrate them with the latest
                technologies to boost your business productivity.
              </motion.p>
              <motion.p
                className="text-white/80 font-light"
                variants={fadeIn("right", 0.4)}
                initial="hidden"
                animate="show"
                exit="hidden"
              >
                I am a full stack developer with skills in Ruby, Ruby on Rails,
                JavaScript, ReactJS, VueJS, and NodeJS; I build web features and
                relevant products for businesses. Over 8+ years of full-stack work, I have
                acquired teamwork, problem-solving, and exceptional communication
                skills from coding with full-stack development colleagues around
                the world.
              </motion.p>
              <motion.p
                className="text-white/80 font-light"
                variants={fadeIn("right", 0.45)}
                initial="hidden"
                animate="show"
                exit="hidden"
              >
                As a creative developer, I am motivated by the rigorous, logical
                thought processes combining software development with imagination
                and expression. Additionally, I have extensive experience in
                upgrading RoR in an existing application; testing and ensuring
                all existing functions work after the upgrade. My ability to
                review and understand existing code, and propose refactoring and
                CI/CD, enables me to accept any challenge; and I thrive on
                contributing to strong team chemistry.
              </motion.p>
              <motion.p
                className="text-white/80 font-light"
                variants={fadeIn("right", 0.5)}
                initial="hidden"
                animate="show"
                exit="hidden"
              >
                I am eager to explore exciting full-stack development
                opportunities in startups as well as established companies that
                think I am a good match for current roles. Please reach out if you
                are seeking a passionate and capable web dev team member.
              </motion.p>
            </div>

            <motion.div
              variants={fadeIn("right", 0.55)}
              initial="hidden"
              animate="show"
              className="mt-10 xl:mt-12 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent p-5 sm:p-6"
            >
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="text-center xl:text-left"
                  >
                    <div className="text-3xl sm:text-4xl xl:text-[2.5rem] font-extrabold text-accent tabular-nums leading-none mb-2">
                      <CountUp start={0} end={s.end} duration={2.5} enableScrollSpy scrollSpyOnce />
                    </div>
                    <div className="text-[10px] sm:text-xs uppercase tracking-wider text-white/45 leading-snug max-w-[9rem] mx-auto xl:mx-0">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: tabs + content card */}
          <motion.div
            variants={fadeIn("left", 0.35)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="w-full xl:w-[min(100%,440px)] xl:flex-shrink-0 flex flex-col gap-4"
          >
            <div
              className="flex flex-wrap justify-center xl:justify-start gap-2"
              role="tablist"
              aria-label="About sections"
            >
              {aboutData.map((item, itemI) => (
                <button
                  key={item.title}
                  type="button"
                  role="tab"
                  aria-selected={index === itemI}
                  className={`rounded-full px-3.5 py-2 text-xs sm:text-sm font-medium capitalize transition-all duration-300 border ${
                    index === itemI
                      ? "border-accent bg-accent/15 text-accent shadow-[0_0_20px_rgba(241,48,36,0.15)]"
                      : "border-white/15 bg-white/[0.04] text-white/65 hover:border-white/25 hover:text-white/90"
                  }`}
                  onClick={() => setIndex(itemI)}
                >
                  {item.title}
                </button>
              ))}
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm shadow-[0_8px_40px_rgba(0,0,0,0.25)] flex flex-col min-h-[280px] max-h-[min(520px,calc(100vh-12rem))] xl:max-h-[min(580px,calc(100vh-10rem))]">
              <div className="px-4 sm:px-5 py-3 border-b border-white/10 shrink-0">
                <h3 className="text-sm font-semibold text-white/90 capitalize tracking-wide">
                  {aboutData[index].title}
                </h3>
              </div>
              <div className="about-scroll overflow-y-auto overflow-x-hidden p-4 sm:p-5 flex-1 min-h-0">
                <ul className="space-y-0 divide-y divide-white/10">
                  {aboutData[index].info.map((item, itemI) => (
                    <li
                      key={itemI}
                      className="py-4 first:pt-0 last:pb-0 text-center xl:text-left"
                    >
                      {item.icons ? (
                        <>
                          <p className="text-sm font-medium text-white/90 mb-3">
                            {item.title}
                          </p>
                          <div className="flex flex-wrap justify-center xl:justify-start gap-3">
                            {item.icons.map(({ Icon, name }, iconI) => (
                              <span
                                key={iconI}
                                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-xl text-white hover:border-accent/40 hover:text-accent transition-colors"
                                title={name}
                                aria-label={name}
                              >
                                <Icon aria-hidden />
                              </span>
                            ))}
                          </div>
                        </>
                      ) : (
                        <>
                          <p className="text-sm font-medium text-white/90 leading-snug mb-1.5">
                            {item.title}
                          </p>
                          <p className="text-xs sm:text-sm text-white/50 leading-relaxed">
                            {item.stage}
                          </p>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

    </div>
  );
};

export default About;
