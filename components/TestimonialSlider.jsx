import Image from "next/image";
import { FaQuoteLeft } from "react-icons/fa";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { ASSET } from "../lib/site";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const img = (name) => `${ASSET}/${name}`;

const testimonialData = [
  {
    image: img("pat.jpeg"),
    name: "Pat Russell",
    position: "Client",
    message:
      "Ronak is an extremely skilled developer but what sets him apart are his communication skills. He takes the time to explore projects from the user perspective and understand purpose. After just a few weeks he was as capable as our lead developer who created the software.",
  },
  {
    image: img("aran.jpg"),
    name: "Aran Jagers",
    position: "Client",
    message:
      "We are very delightful to work with Ronak. Always a fast response. Reliable in every way.",
  },
  {
    image: img("timothy.jpeg"),
    name: "Timothy Franklyn",
    position: "NSoJ",
    message:
      "National School of Journalism and Public Discourse (NSoJ) has benefited from Ronak's expertise as a consultant for several years now. He is responsive and provides design solutions to our needs in a timely and effective manner. He has strong technical and problem solving skills. He is also a delight to deal with personally. I strongly recommend him.",
  },
  {
    image: img("martijn.jpeg"),
    name: "Martijn Deinum",
    position: "Client",
    message:
      "Ronak has build various websites for my company and we are very satisfied with his service. The quality of the website is really good, he listens very good to your preferences and he is available most of the day. Keep it up!",
  },
  {
    image: img("brandon.png"),
    name: "Brandon Oakley",
    position: "Client",
    message:
      "I have been working with Ronak for several months now. He understands our system and what we are trying to accomplish making it easy to discuss projects with him. Ronak is able to dive into an issue and find the resolution as well as think big picture to design and implement new ideas with limited information.",
  },
  {
    image: img("avatar-1.png"),
    name: "John Smith",
    position: "Client",
    message:
      "Ronak was a real pleasure to work with and we look forward to working with him again. He's definitely the kind of developer you can trust with a project from start to finish.",
  },
  {
    image: img("avatar-2.png"),
    name: "Ammy Wilson",
    position: "Client",
    message:
      "Ronak's technical expertise and attention to detail transformed our project. His ability to understand our requirements and deliver beyond expectations was impressive.",
  },
  {
    image: img("avatar-3.png"),
    name: "Kimberly Davis",
    position: "Client",
    message:
      "Working with Ronak was a game-changer for our company. His innovative approach to problem-solving and ability to deliver quality work on tight deadlines made all the difference.",
  },
  {
    image: img("avatar-4.png"),
    name: "Rick Clark",
    position: "Client",
    message:
      "Ronak's expertise in both front-end and back-end development greatly improved our platform's performance and user experience. His communication throughout the project was excellent.",
  },
];

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
