import Image from "next/image";
import Link from "next/link";
import { BsArrowUpRight } from "react-icons/bs";

/**
 * Thumbnails: add files under /public/projects/ (see path per item).
 */
const portfolioItems = [
  {
    title: "All Pro IFM",
    path: "/projects/all-pro-ifm.jpg",
    link: "https://allproifm.com/",
  },
  {
    title: "Jager Lodge",
    path: "/projects/jager-lodge.png",
    link: "https://jagerlodge.at/",
  },
  {
    title: "Bulletproof Cyber Security",
    path: "/projects/bulletproof.png",
    link: "https://www.bulletproof.co.uk/",
  },
  {
    title: "NSoJ",
    path: "/projects/nsoj.png",
    link: "https://www.nsoj.in/",
  },
  {
    title: "Pit Stop USA",
    path: "/projects/pit-stop-usa.jpg",
    link: "https://pitstopusa.com/",
  },
  {
    title: "Nav Eco",
    path: "/projects/nav-eco.png",
    link: "https://www.nav-eco.fr/en",
  },
  {
    title: "Auto Service Haarlem",
    path: "/projects/auto-service-haarlem.jpg",
    link: "https://autoservicehaarlem.nl/",
  },
];

const WorkSlider = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 w-full">
      {portfolioItems.map((image) => (
        <article
          key={image.title}
          className="group flex flex-col rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] shadow-lg shadow-black/20 ring-1 ring-white/5 overflow-hidden transition-all duration-300 hover:border-accent/35 hover:shadow-[0_0_28px_rgba(241,48,36,0.1)]"
        >
          <Link
            href={image.link}
            target="_blank"
            rel="noreferrer noopener"
            className="relative block w-full aspect-[16/11] lg:aspect-[4/3] overflow-hidden bg-black/25 outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f]"
          >
            <Image
              src={image.path}
              alt={image.title}
              fill
              className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 sm:opacity-60 group-hover:opacity-90 transition-opacity"
              aria-hidden
            />
            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 lg:p-3.5 xl:p-4 flex items-end justify-between gap-2 sm:gap-3">
              <h3 className="text-sm sm:text-base lg:text-sm xl:text-base font-semibold text-white leading-tight drop-shadow-sm line-clamp-2 pr-1">
                {image.title}
              </h3>
              <span
                className="inline-flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-colors group-hover:border-accent/50 group-hover:bg-accent/15 group-hover:text-accent"
                aria-hidden
              >
                <BsArrowUpRight className="text-base sm:text-lg" />
              </span>
            </div>
          </Link>

          <div className="px-4 py-3 sm:px-5 sm:py-3.5 border-t border-white/10 bg-black/20">
            <Link
              href={image.link}
              target="_blank"
              rel="noreferrer noopener"
              className="text-xs sm:text-sm font-medium text-accent/90 hover:text-accent transition-colors inline-flex items-center gap-1.5"
            >
              Visit live site
              <BsArrowUpRight className="text-sm opacity-80" aria-hidden />
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
};

export default WorkSlider;
