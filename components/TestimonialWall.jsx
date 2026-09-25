import TestimonialCard from "./TestimonialCard";
import { testimonialData } from "../data/testimonials";

/** Masonry-style wall of quote cards (CSS columns, no JS). */
const TestimonialWall = () => {
  return (
    <ul className="columns-1 gap-4 md:columns-2 lg:columns-3">
      {testimonialData.map((person, i) => (
        <li key={`${person.name}-${i}`} className="mb-4 break-inside-avoid">
          <TestimonialCard person={person} />
        </li>
      ))}
    </ul>
  );
};

export default TestimonialWall;
