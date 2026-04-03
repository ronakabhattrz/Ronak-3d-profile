import Image from "next/image";
import { FaQuoteLeft } from "react-icons/fa";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { testimonialData } from "../data/testimonials";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const TestimonialSlider = () => {
  return (
    <Swiper
      navigation
      pagination={{
        clickable: true,
      }}
      modules={[Navigation, Pagination]}
      className="min-h-[420px] sm:min-h-[480px] pb-10"
    >
      {testimonialData.map((person, i) => (
        <SwiperSlide key={i}>
          <div className="flex flex-col items-center md:flex-row gap-x-8 min-h-[360px] px-6 sm:px-16">
            <div className="w-full max-w-[300px] flex flex-col xl:justify-center items-center relative mx-auto xl:mx-0 shrink-0">
              <div className="flex flex-col justify-center text-center">
                <div className="mb-2 mx-auto rounded-full overflow-hidden w-[100px] h-[100px] relative border-2 border-white/10">
                  <Image
                    src={person.image}
                    width={100}
                    height={100}
                    alt={person.name}
                    className="object-cover"
                  />
                </div>

                <div className="text-lg">{person.name}</div>

                <div className="text-[12px] uppercase font-extralight tracking-widest">
                  {person.position}
                  {person.source ? (
                    <span className="text-accent"> · {person.source}</span>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-center before:w-[1px] xl:before:bg-white/20 xl:before:absolute xl:before:left-0 xl:before:h-[200px] relative xl:pl-20">
              <div className="mb-4">
                <FaQuoteLeft
                  className="text-4xl xl:text-6xl text-white/20 mx-auto md:mx-0"
                  aria-hidden
                />
              </div>

              <div className="xl:text-lg text-center md:text-left text-white/90 leading-relaxed max-h-[280px] overflow-y-auto pr-1">
                {person.message}
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default TestimonialSlider;
