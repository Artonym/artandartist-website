import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

const frames = [
  {
    image: "/frames/frame1.png",
    title: "HOME",
    description:
      "Explore a curated stream of fine art, creative updates, and opportunities tailored exclusively for artists and art professionals."
  },
  {
    image: "/frames/frame2.png",
    title: "CONNECT",
    description:
      "Discover and build meaningful connections with artists, curators, collectors, and creative collaborators from around the world."
  },
  {
    image: "/frames/frame3.png",
    title: "PROFILE",
    description:
      "Present your artistic identity through a professional portfolio showcasing your work, exhibitions, achievements, and creative journey."
  },
  {
    image: "/frames/frame4.png",
    title: "OPPORTUNITIES",
    description:
      "Access curated job listings, commissions, residencies, grants, and exhibition calls designed specifically for the fine arts community."
  },
  {
    image: "/frames/frame5.png",
    title: "MESSAGING",
    description:
      "Engage in focused, professional conversations that foster collaboration, mentorship, and creative partnerships."
  }
];

const AppShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="pt-12 pb-56 bg-[#ece9de] overflow-hidden">
      
      {/* Heading */}
      <div className="text-center mb-16 px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-kugile">
          The Digital Atelier
        </h2>
      </div>

      <div className="w-full max-w-6xl mx-auto px-4">

        <Swiper
          effect="coverflow"
          centeredSlides={true}
          loop={true}
          slidesPerView={1}
          spaceBetween={0}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 250,
            modifier: 1.8,
            slideShadows: false
          }}
          navigation={true}
          modules={[EffectCoverflow, Navigation]}
          breakpoints={{
            1280: {
              slidesPerView: 3,
              spaceBetween: 0
            }
          }}
        >
          {frames.map((frame, index) => (
            <SwiperSlide key={index}>
              <div className="flex justify-center items-center">
                <img
                  src={frame.image}
                  alt={frame.title}
                  className="
                    w-[220px] h-[420px]
                    sm:w-[240px] sm:h-[460px]
                    md:w-[260px] md:h-[500px]
                    lg:w-[280px] lg:h-[520px]
                    object-contain
                    mx-auto
                  "
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>

      {/* Dynamic Text Section */}
      <div className="text-center mt-14 max-w-2xl mx-auto px-6">
        <h3 className="text-2xl md:text-3xl font-kugile mb-3">
          {frames[activeIndex].title}
        </h3>
        <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
          {frames[activeIndex].description}
        </p>
      </div>

      <style>
        {`
          .swiper-slide {
            opacity: 0;
            transition: transform 0.4s ease, opacity 0.4s ease;
          }

          .swiper-slide-active {
            opacity: 1;
            transform: scale(1.1);
          }

          .swiper-slide-prev,
          .swiper-slide-next {
            opacity: 1;
            transform: scale(0.9);
          }

          /* =============================
             Responsive Arrow Styling
          ============================== */

          /* Mobile (default) */
          .swiper-button-prev,
          .swiper-button-next {
            color: black;
            width: 28px;
            height: 28px;
          }

          .swiper-button-prev::after,
          .swiper-button-next::after {
            font-size: 16px;
          }

          /* Small screens */
          @media (min-width: 640px) {
            .swiper-button-prev,
            .swiper-button-next {
              width: 32px;
              height: 32px;
            }

            .swiper-button-prev::after,
            .swiper-button-next::after {
              font-size: 20px;
            }
          }

          /* Tablets */
          @media (min-width: 1024px) {
            .swiper-button-prev,
            .swiper-button-next {
              width: 36px;
              height: 36px;
            }

            .swiper-button-prev::after,
            .swiper-button-next::after {
              font-size: 22px;
            }
          }

          /* Large desktops */
          @media (min-width: 1440px) {
            .swiper-button-prev,
            .swiper-button-next {
              width: 42px;
              height: 42px;
            }

            .swiper-button-prev::after,
            .swiper-button-next::after {
              font-size: 26px;
            }
          }
        `}
      </style>

    </section>
  );
};

export default AppShowcase;
