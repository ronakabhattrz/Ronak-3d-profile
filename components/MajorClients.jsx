import { motion } from "framer-motion";
import Image from "next/image";

import { fadeIn } from "../variants";

/** Logos in /public — same set as ronakbhatt.in “Major clients”. */
const clients = [
  { src: "/logo-1-color.png", name: "Upwork" },
  { src: "/logo-2-color.svg", name: "Bulletproof Cyber Security" },
  { src: "/logo-3-color.png", name: "All Pro IFM" },
  { src: "/logo-4-color.png", name: "Auto Service Haarlem" },
  { src: "/logo-5-color.png", name: "MBMotion.nl" },
  { src: "/logo-6-color.png", name: "HPPC" },
];

const MajorClients = () => {
  return (
    <motion.section
      variants={fadeIn("up", 0.1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      className="my-24"
      aria-labelledby="major-clients-heading"
    >
      <div className="mb-8 flex flex-col items-center gap-3 text-center">
        <p className="eyebrow">Trusted by</p>
        <h2 id="major-clients-heading" className="h3">
          Major <span className="em">clients</span>
        </h2>
      </div>

      <ul className="grid grid-cols-2 overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.07] gap-px sm:grid-cols-3 lg:grid-cols-6">
        {clients.map((client) => (
          <li
            key={client.src}
            className="group flex h-28 items-center justify-center bg-ink-900 px-6 transition-colors hover:bg-ink-850"
          >
            <div className="relative h-12 w-full max-w-[140px] opacity-60 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0">
              <Image
                src={client.src}
                alt={`${client.name} logo`}
                fill
                className="object-contain object-center"
                sizes="(max-width: 640px) 40vw, 160px"
              />
            </div>
          </li>
        ))}
      </ul>
    </motion.section>
  );
};

export default MajorClients;
