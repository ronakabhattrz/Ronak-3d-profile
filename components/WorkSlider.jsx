import Image from "next/image";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";

import { ASSET } from "../lib/site";

const base = ASSET;

/** All portfolio items on one page (live sites + hub links) */
const portfolioItems = [
  {
    title: "All Pro IFM",
    path: `${base}/project-3.jpg`,
    link: "https://allproifm.com/",
  },
  {
    title: "Jager Lodge",
    path: `${base}/project-7.png`,
    link: "https://jagerlodge.at/",
  },
  {
    title: "Bulletproof Cyber Security",
    path: `${base}/project-4.png`,
    link: "https://www.bulletproof.co.uk/",
  },
  {
    title: "NSoJ",
    path: `${base}/project-6.png`,
    link: "https://www.nsoj.in/",
  },
  {
    title: "Pit Stop USA",
    path: `${base}/project-8.jpg`,
    link: "https://pitstopusa.com/",
  },
  {
    title: "Nav Eco",
    path: `${base}/project-9.png`,
    link: "https://www.nav-eco.fr/en",
  },
  {
    title: "Auto Service Haarlem",
    path: `${base}/project-1.jpg`,
    link: "https://autoservicehaarlem.nl/",
  }
];

const WorkSlider = () => {
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10 w-full">
      {portfolioItems.map((image, i) => (
        <div
          className="w-full rounded-xl sm:rounded-2xl bg-white/[0.04] shadow-xl ring-1 ring-white/15 p-2.5 sm:p-3 md:p-4"
          key={`${image.title}-${i}`}
        >
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[5/3] rounded-lg overflow-hidden bg-black/20 group">
            <Image
              src={image.path}
              alt={image.title}
              fill
              className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 640px) 48vw, (max-width: 1536px) 46vw, 560px"
            />

            <div
              className="absolute inset-0 bg-gradient-to-l from-transparent via-[#e838cc]/90 to-[#4a22bd]/90 opacity-0 group-hover:opacity-90 transition-all duration-500 pointer-events-none"
              aria-hidden
            />

            <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <Link
                href={image.link}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center justify-center gap-x-2 sm:gap-x-3 text-xs sm:text-sm tracking-[0.12em] sm:tracking-[0.15em] text-white font-semibold drop-shadow-md"
              >
                <span>LIVE</span>
                <span>PROJECT</span>
                <BsArrowRight className="text-xl sm:text-2xl shrink-0" aria-hidden />
              </Link>
            </div>

            <div className="absolute top-2 left-2 right-2 sm:top-3 sm:left-3 sm:right-3 pointer-events-none">
              <p className="text-xs sm:text-sm font-semibold text-white drop-shadow-md line-clamp-2 opacity-95 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                {image.title}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WorkSlider;
