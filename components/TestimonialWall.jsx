import Image from "next/image";
import { RiDoubleQuotesL } from "react-icons/ri";

import { testimonialData } from "../data/testimonials";

/** Masonry-style wall of quote cards (CSS columns, no JS). */
const TestimonialWall = () => {
  return (
    <ul className="columns-1 gap-4 md:columns-2 lg:columns-3">
      {testimonialData.map((person, i) => (
        <li key={`${person.name}-${i}`} className="mb-4 break-inside-avoid">
          <figure className="card card-hover p-6 sm:p-7">
            <RiDoubleQuotesL aria-hidden className="text-3xl text-accent/80" />
            <blockquote className="mt-4 text-[15px] leading-relaxed text-zinc-300">
              {person.message}
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3 border-t border-white/[0.07] pt-5">
              <Image
                src={person.image}
                width={40}
                height={40}
                alt=""
                className="h-10 w-10 rounded-full border border-white/10 object-cover"
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-white">
                  {person.name}
                </p>
                <p className="truncate text-xs text-zinc-500">
                  {person.position}
                  {person.source ? (
                    <span className="text-accent"> · {person.source}</span>
                  ) : null}
                </p>
              </div>
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
};

export default TestimonialWall;
