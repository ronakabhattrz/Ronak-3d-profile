import Image from "next/image";
import { RiDoubleQuotesL } from "react-icons/ri";

/** One quote card — used on the testimonials wall, Home and service pages. */
const TestimonialCard = ({ person, className = "" }) => (
  <figure className={`card card-hover flex flex-col p-6 sm:p-7 ${className}`}>
    <RiDoubleQuotesL aria-hidden className="text-3xl text-accent/80" />
    <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-zinc-300">
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
        <p className="truncate text-sm font-medium text-white">{person.name}</p>
        <p className="truncate text-xs text-zinc-400">
          {person.position}
          {person.source ? (
            <span className="text-accent"> · {person.source}</span>
          ) : null}
        </p>
      </div>
    </figcaption>
  </figure>
);

export default TestimonialCard;
