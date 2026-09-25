import { motion } from "framer-motion";
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
import PageHeader from "../../components/PageHeader";
import Stats from "../../components/Stats";
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

const section = (title) => aboutData.find((s) => s.title === title).info;

const reveal = (delay = 0) => ({
  variants: fadeIn("up", delay),
  initial: "hidden",
  whileInView: "show",
  viewport: { once: true, margin: "-60px" },
});

const About = () => {
  const skills = section("skills");
  const experience = section("experience");
  const certifications = section("certifications");
  const credentials = section("credentials");

  return (
    <div className="container max-w-content">
      <PageHeader
        eyebrow="About me"
        title={
          <>
            Building reliable products, <span className="em">end to end.</span>
          </>
        }
      >
        <p>
          Web development expert with 8+ years across Ruby on Rails and the
          modern JavaScript stack, working with teams in Canada, the US, the UK
          and Europe.
        </p>
      </PageHeader>

      <div className="grid gap-4 lg:grid-cols-12">
        <motion.div {...reveal()} className="card p-7 sm:p-10 lg:col-span-7">
          <div className="space-y-5 text-[15px] sm:text-base">
            <p>
              Hello! I am a highly experienced Ruby on Rails / JS full-stack
              developer with a strong focus on writing clean and efficient code.
              I provide comprehensive solutions tailored to your specific
              workflow needs and help you integrate them with the latest
              technologies to boost your business productivity.
            </p>
            <p>
              I build web features and products for businesses with Ruby, Ruby
              on Rails, JavaScript, ReactJS, VueJS, and NodeJS. Coding with
              full-stack colleagues around the world has sharpened my teamwork,
              problem-solving, and communication.
            </p>
            <p>
              As a creative developer, I am motivated by the rigorous, logical
              thought processes combining software development with imagination
              and expression. I have extensive experience upgrading Rails in
              existing applications, testing and ensuring all existing functions
              work after the upgrade. Reviewing and understanding existing code,
              and proposing refactoring and CI/CD, lets me take on any challenge,
              and I thrive on contributing to strong team chemistry.
            </p>
            <p>
              I am eager to explore full-stack opportunities in startups as well
              as established companies. Please reach out if you are seeking a
              passionate and capable web dev team member.
            </p>
          </div>
        </motion.div>

        <motion.div {...reveal(0.08)} className="lg:col-span-5">
          <Avatar showChips={false} className="max-w-none" />
        </motion.div>
      </div>

      <Stats className="mt-4" />

      {/* Experience */}
      <section aria-labelledby="experience-heading" className="mt-24 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="eyebrow">Career</p>
          <h2 id="experience-heading" className="h3 mt-4">
            Experience
          </h2>
          <p className="mt-3 max-w-sm text-[15px]">
            From freelance Rails work to leading teams, remote and on-site.
          </p>
        </div>
        <ol className="relative lg:col-span-8">
          <span
            aria-hidden
            className="absolute bottom-3 left-[7px] top-3 w-px bg-gradient-to-b from-accent/60 via-white/10 to-transparent"
          />
          {experience.map((job, i) => {
            const [role, company] = job.title.split(" — ");
            const [when, ...rest] = job.stage.split(" · ");
            return (
              <motion.li
                key={job.title}
                {...reveal(0.04 * i)}
                className="relative pb-8 pl-10 last:pb-0"
              >
                <span
                  aria-hidden
                  className={`absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 ${
                    i === 0
                      ? "border-accent bg-accent/30 shadow-[0_0_0_4px_rgba(241,48,36,0.15)]"
                      : "border-white/25 bg-ink-950"
                  }`}
                />
                <div className="card card-hover p-5 sm:p-6">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                    <h3 className="text-base font-semibold text-white sm:text-lg">
                      {role}
                      {company ? (
                        <span className="font-normal text-zinc-400"> · {company}</span>
                      ) : null}
                    </h3>
                    <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500">
                      {when}
                    </span>
                  </div>
                  {rest.length ? (
                    <p className="mt-2 text-sm">{rest.join(" · ")}</p>
                  ) : null}
                </div>
              </motion.li>
            );
          })}
        </ol>
      </section>

      {/* Skills */}
      <section aria-labelledby="skills-heading" className="mt-24 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="eyebrow">Toolbox</p>
          <h2 id="skills-heading" className="h3 mt-4">
            Skills
          </h2>
        </div>
        <div className="grid gap-4 lg:col-span-8 md:grid-cols-2">
          {skills.map((group, gi) => (
            <motion.div key={group.title} {...reveal(0.06 * gi)} className="card p-6">
              <h3 className="text-sm font-semibold text-white">{group.title}</h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.icons.map(({ Icon, name }) => (
                  <li
                    key={name}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-zinc-300 transition-colors hover:border-accent/40 hover:text-white"
                  >
                    <Icon aria-hidden className="text-base text-zinc-400" />
                    {name}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Certifications + education */}
      <div className="mb-24 mt-24 grid gap-4 md:grid-cols-2">
        {[
          { id: "certs", label: "Recognition", heading: "Certifications", items: certifications },
          { id: "edu", label: "Education", heading: "Credentials", items: credentials },
        ].map((block, bi) => (
          <motion.section
            key={block.id}
            {...reveal(0.06 * bi)}
            aria-labelledby={`${block.id}-heading`}
            className="card p-7 sm:p-8"
          >
            <p className="eyebrow">{block.label}</p>
            <h2 id={`${block.id}-heading`} className="mt-4 text-xl font-semibold text-white">
              {block.heading}
            </h2>
            <ul className="mt-6 divide-y divide-white/[0.07]">
              {block.items.map((item) => (
                <li key={item.title} className="flex items-start justify-between gap-4 py-4 first:pt-0 last:pb-0">
                  <span className="text-[15px] leading-snug text-zinc-200">{item.title}</span>
                  <span className="shrink-0 text-right font-mono text-[11px] uppercase tracking-[0.12em] text-zinc-500">
                    {item.stage}
                  </span>
                </li>
              ))}
            </ul>
          </motion.section>
        ))}
      </div>
    </div>
  );
};

export default About;
