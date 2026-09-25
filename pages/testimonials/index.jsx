import { HiArrowUpRight, HiStar } from "react-icons/hi2";

import JsonLd from "../../components/JsonLd";
import PageHeader from "../../components/PageHeader";
import TestimonialWall from "../../components/TestimonialWall";
import { testimonialData, upworkProfileUrl } from "../../data/testimonials";
import { breadcrumbJsonLd } from "../../lib/schema";

const Testimonials = () => {
  return (
    <div className="container max-w-content">
      <JsonLd id="testimonials" data={breadcrumbJsonLd("/testimonials", "Testimonials")} />
      <PageHeader
        eyebrow="Testimonials"
        title={
          <>
            Client <span className="em">testimonials.</span>
          </>
        }
        aside={
          <a
            href={upworkProfileUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="card card-hover group flex items-center gap-5 px-6 py-5"
          >
            <div>
              <div className="flex gap-0.5 text-amber-400" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <HiStar key={i} />
                ))}
              </div>
              <p className="mt-1.5 text-sm text-zinc-300">
                {testimonialData.length} reviews · Top Rated Plus
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-white group-hover:text-accent">
              Upwork <HiArrowUpRight aria-hidden />
            </span>
          </a>
        }
      >
        <p>
          What clients and teams say after working together. More public
          feedback lives on my Upwork profile.
        </p>
      </PageHeader>

      <div className="mb-24">
        <TestimonialWall />
      </div>
    </div>
  );
};

export default Testimonials;
