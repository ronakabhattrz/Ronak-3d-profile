import { motion } from "framer-motion";
import Image from "next/image";

import { fadeIn } from "../variants";

/** Logos in /public — same set as ronakbhatt.in “Major clients”
 *  Update `name` with the real company name for each logo file. */
const clients = [
  { src: “/logo-1-color.png”, name: “Major client” },
  { src: “/logo-2-color.svg”, name: “Major client” },
  { src: “/logo-3-color.png”, name: “Major client” },
  { src: “/logo-4-color.png”, name: “Major client” },
  { src: “/logo-5-color.png”, name: “Major client” },
  { src: “/logo-6-color.png”, name: “Major client” },
];

const MajorClients = () => {
  return (
    <motion.section
      variants={fadeIn("up", 0.35)}
      initial="hidden"
      animate="show"
      exit="hidden"
      className="w-full mt-14 sm:mt-16 xl:mt-20 pt-10 sm:pt-12 border-t border-white/10"
      aria-labelledby="major-clients-heading"
    >
      <h3
        id="major-clients-heading"
        className="text-center xl:text-left text-xl sm:text-2xl font-semibold mb-8 sm:mb-10"
      >
        Major <span className="text-accent">clients</span>
      </h3>

      <ul className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-5 list-none p-0 m-0 w-full">
        {clients.map((client) => (
          <li key={client.src} className="min-w-0">
            <div className="group flex h-[106px] w-full items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] px-2 sm:px-4 py-3 shadow-lg shadow-black/20 ring-1 ring-white/5 transition-all duration-300 hover:border-accent/35 hover:from-white/[0.1] hover:shadow-[0_0_28px_rgba(241,48,36,0.12)]">
              <div className="relative h-[69.12px] w-full max-w-[172.8px] opacity-70 transition-opacity duration-300 group-hover:opacity-100">
                <Image
                  src={client.src}
                  alt={`${client.name} logo`}
                  fill
                  className="object-contain object-center"
                  sizes="(max-width: 640px) 30vw, 200px"
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </motion.section>
  );
};

export default MajorClients;
