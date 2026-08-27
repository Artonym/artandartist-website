import React, { useState, useEffect, useRef } from 'react'
import gsap from 'gsap';


// Updated images array with responsive positioning
const aboutImages = [
  { 
    src: "/images/kp.jpeg", 
    className: "lg:top-[4%] lg:right-[20%] lg:w-32 lg:h-32 xl:top-[3%] xl:right-[25%] xl:w-36 xl:h-36 2xl:top-[2%] 2xl:right-[28%] 2xl:w-44 2xl:h-44" 
  },
  { 
    src: "/images/IMG_0083.JPG", 
    className: "lg:hidden xl:block xl:top-[18%] xl:left-[4%] xl:w-44 xl:h-44 2xl:top-[16%] 2xl:left-[8%] 2xl:w-52 2xl:h-52" 
  },
  { 
    src: "/images/a7edfd5e-1e6f-44fa-9a84-3400b60ff350.jpeg", 
    className: "lg:bottom-[7%] lg:right-[10%] lg:w-32 lg:h-32 xl:bottom-[12%] xl:right-[8%] xl:w-36 xl:h-36 2xl:bottom-[10%] 2xl:right-[10%] 2xl:w-44 2xl:h-44" 
  },
  { 
    src: "/images/4e38db82-bdb1-46bd-ad21-127e0802fa09.jpeg", 
    className: "lg:hidden xl:block xl:top-[10%] xl:left-[0%] xl:w-40 xl:h-[210px] 2xl:top-[8%] 2xl:left-[2%] 2xl:w-48 2xl:h-[250px]" 
  },
  { 
    src: "/images/c081a630-2fec-4bc6-a1c2-9903cfea93c9.jpeg", 
    className: "lg:bottom-[3%] lg:left-[7%] lg:w-32 lg:h-30 xl:bottom-[12%] xl:left-[8%] xl:w-36 xl:h-32 2xl:bottom-[10%] 2xl:left-[10%] 2xl:w-44 2xl:h-40" 
  },
  { 
    src: "/images/c9473518-dd56-45a9-9ac7-4e0622a62869.jpeg", 
    className: "lg:top-[45%] lg:right-[8%] lg:w-36 lg:h-30 xl:top-[40%] xl:left-[1%] xl:w-40 xl:h-32 2xl:top-[38%] 2xl:left-[2%] 2xl:w-48 2xl:h-40" 
  },
  { 
    src: "/images/THE APU TRILOGY restoration- each of the threeΓÇª.jpeg", 
    className: "lg:bottom-[1%] lg:right-[5%] lg:w-32 lg:h-32 xl:bottom-[8%] xl:right-[4%] xl:w-36 xl:h-36 2xl:bottom-[6%] 2xl:right-[5%] 2xl:w-44 2xl:h-44" 
  },
  { 
    src: "/images/Minimal Movie Posters India.jpeg", 
    className: "lg:hidden xl:block xl:top-[48%] xl:right-[12%] xl:w-52 xl:h-40 2xl:top-[45%] 2xl:right-[14%] 2xl:w-60 2xl:h-48" 
  },
  { 
    src: "/images/02b55347-958d-4029-be31-b721abf07185.jpeg", 
    className: "lg:top-[28%] lg:right-[-1%] lg:w-32 lg:h-30 xl:top-[22%] xl:right-[1%] xl:w-36 xl:h-32 2xl:top-[20%] 2xl:right-[2%] 2xl:w-44 2xl:h-40" 
  },
  { 
    src: "/images/d8bd2b49-e935-49b2-ab1a-9ec2b0fa5deb.jpeg", 
    className: "lg:hidden xl:block xl:top-[30%] xl:right-[10%] xl:w-[180px] xl:h-[145px] 2xl:top-[28%] 2xl:right-[12%] 2xl:w-[220px] 2xl:h-[175px]" 
  },
  { 
    src: "/images/IMG_0096.JPG", 
    className: "lg:hidden xl:block xl:top-[58%] xl:left-[2%] xl:w-[150px] xl:h-[210px] 2xl:top-[55%] 2xl:left-[5%] 2xl:w-[240px] 2xl:h-[250px]" 
  },
  { 
    src: "/images/IMG_0102.JPG", 
    className: "lg:top-[29%] lg:left-[-3%] lg:w-28 lg:h-28 xl:top-[42%] xl:left-[85%] xl:w-32 xl:h-32 2xl:top-[40%] 2xl:left-[88%] 2xl:w-40 2xl:h-40" 
  },
  { 
    src: "/images/Laapataa Ladies Hindi Movie Vintage Retro MovieΓÇª.jpeg", 
    className: "lg:bottom-[29%] lg:right-[-1%] lg:w-[190px] lg:h-[150px] xl:bottom-[28%] xl:right-[1%] xl:w-[210px] xl:h-[165px] 2xl:bottom-[25%] 2xl:right-[2%] 2xl:w-[250px] 2xl:h-[195px]" 
  },
  { 
    src: "/images/d31adb8d-3fd8-4a58-ba70-93cf3f4bff94.jpeg", 
    className: "lg:top-[4%] lg:left-[20%] lg:w-[135px] lg:h-[115px] xl:top-[3%] xl:left-[25%] xl:w-[150px] xl:h-[130px] 2xl:top-[2%] 2xl:left-[28%] 2xl:w-[180px] 2xl:h-[155px]" 
  },
];

const About = ({ onJoinWaitlistClick }) => {
  const [isVisible, setIsVisible] = useState(false)
  const frameRefs = useRef([])

  // Initialize refs array
  useEffect(() => {
    frameRefs.current = frameRefs.current.slice(0, aboutImages.length);
  }, [])

  const handleMouseMove = (e, index) => {
    const { clientX, clientY } = e;
    const element = frameRefs.current[index];

    if (!element) return;

    const rect = element.getBoundingClientRect();
    const xPos = clientX - rect.left;
    const yPos = clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((yPos - centerY) / centerY) * -10;
    const rotateY = ((xPos - centerX) / centerX) * 10;

    gsap.to(element, {
      duration: 0.3,
      rotateX,
      rotateY,
      transformPerspective: 500,
      ease: "power1.inOut",
    });
  };

  const handleMouseLeave = (index) => {
    const element = frameRefs.current[index];

    if (element) {
      gsap.to(element, {
        duration: 0.3,
        rotateX: 0,
        rotateY: 0,
        ease: "power1.inOut",
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.getElementById('about')
      if (aboutSection) {
        const rect = aboutSection.getBoundingClientRect()
        if (rect.top < window.innerHeight * 0.8) {
          setIsVisible(true)
          
          // Animate images when section becomes visible - only on large screens
          if (window.innerWidth >= 1024) {
            const images = aboutSection.querySelectorAll('img.absolute')
            gsap.fromTo(images, 
              {
                y: 50,
                opacity: 0,
                scale: 0.8
              },
              {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 1.5,
                ease: 'power3.out',
                stagger: 0.1
              }
            )
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <section id="about" className="relative bg-ece9de min-h-screen flex items-center justify-center overflow-hidden py-24 lg:pb-[250px] mt-0">
      
      {/* Floating Images with 3D Tilt Effect - Hidden on medium and small screens */}
      {aboutImages.map((img, idx) => (
        <img
          ref={el => frameRefs.current[idx] = el}
          onMouseMove={(e) => handleMouseMove(e, idx)}
          onMouseLeave={() => handleMouseLeave(idx)}
          onMouseUp={() => handleMouseLeave(idx)}
          onMouseEnter={() => handleMouseLeave(idx)}
          key={idx}
          src={img.src}
          alt=""
          className={`hidden lg:block absolute rounded-lg object-cover shadow-md ${img.className}`}
        />
      ))}

      <div className={`relative z-10 w-full max-w-4xl mx-auto px-6 transition-all duration-1000 ease-out ${
        isVisible 
          ? 'translate-y-0 opacity-100' 
          : '-translate-y-20 opacity-0'
      }`}>
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-kugile text-black mb-4">
            About Us
          </h2>
          <div className="w-24 h-1 bg-[#016367] mx-auto"></div>
        </div>

        <div className="mb-16">
          <h3 className="text-2xl lg:text-4xl font-wasted-vindey text-[#016367] mb-6">
            Why We Built Art & Artist
          </h3>
          <div className="space-y-4 text-black text-justify">
            <p className="text-lg lg:text-xl font-serif leading-relaxed opacity-90">
              Art has always been more than just expression - it's a language that connects souls. But somewhere along the way, We noticed that many talented artists struggled to find their space in the world - not because they lacked skill or passion, but because they lacked connection.
            </p>
            <p className="text-lg lg:text-xl font-serif  leading-relaxed opacity-90">
              We met painters who couldn't find galleries, filmmakers who couldn't find crews, actors who didn't know where to start, and countless creators who felt unseen. That's when We realized - talent needs a home, not just a platform.
            </p>
            <p className="text-lg lg:text-xl font-serif  leading-relaxed opacity-90">
              So We built Art & Artist - a place where creativity meets opportunity. A community where artists can be discovered, collaborate, and grow together.
            </p>
            <p className="text-lg lg:text-xl font-serif  leading-relaxed opacity-90">
              This platform is our way of giving back to the art world - to create a digital ecosystem where every artist, from any corner of India or the world, can share their story, find their tribe, and turn their passion into purpose.
            </p>
            <p className="text-lg lg:text-xl font-serif  leading-relaxed opacity-90">
              Because art deserves more than applause - it deserves connection, recognition, and love.
            </p>
          </div>
        </div>

        <div className="mb-16">
          <div className='border-t border-dotted border-gray-700 pt-10 w-2/5 mx-auto'></div>
          <h3 className="text-2xl lg:text-4xl font-wasted-vindey text-[#016367] mb-6">
            The Problem
          </h3>
          <div className="space-y-4 text-black text-justify">
            <p className="text-lg lg:text-xl font-serif leading-relaxed opacity-90">
              Every artist carries a story, a dream, and a spark that deserves to be seen.
            </p>
            <p className="text-lg lg:text-xl font-serif  leading-relaxed opacity-90">
              But too often, that spark fades in silence.
            </p>
            <p className="text-lg lg:text-xl font-serif  leading-relaxed opacity-90">
              Many artists - painters, filmmakers, actors, designers, and musicians - struggle to find the right people, the right projects, or even the right space to express their art.
            </p>
            <p className="text-lg lg:text-xl font-serif  leading-relaxed opacity-90">
              We saw this everywhere: talented individuals with incredible potential, but no platform that truly understood them.
            </p>
            <p className="text-lg lg:text-xl font-serif  leading-relaxed opacity-90">
              Not just a lack of visibility - a lack of connection.
            </p>
          </div>
        </div>

        <div className="mb-16">
          <div className='border-t border-dotted border-gray-700 pt-10 w-2/5 mx-auto'></div>
          <h3 className="text-2xl lg:text-4xl font-wasted-vindey text-[#016367] mb-6">
            The Vision
          </h3>
          <div className="space-y-4 text-black text-justify">
            <p className="text-lg lg:text-xl font-serif  leading-relaxed opacity-90">
              That's when We decided to build Art & Artist - a home for creativity.
            </p>
            <p className="text-lg lg:text-xl font-serif  leading-relaxed opacity-90">
              A place where art isn't lost in the noise, but celebrated.
            </p>
            <p className="text-lg lg:text-xl font-serif  leading-relaxed opacity-90">
              A place where every creator, no matter where they come from, can connect, collaborate, and grow.
            </p>
            <p className="text-lg lg:text-xl font-serif  leading-relaxed opacity-90">
              Art & Artist is more than just a platform - it's a movement to bring together the creative community under one roof.
            </p>
            <p className="text-lg lg:text-xl font-serif  leading-relaxed opacity-90">
              It's where portfolios become stories, projects become collaborations, and connections become lifelong partnerships.
            </p>
          </div>
        </div>

        <div className="mb-16">
          <div className='border-t border-dotted border-gray-700 pt-10 w-2/5 mx-auto'></div>
          <h3 className="text-2xl lg:text-4xl font-wasted-vindey text-[#016367] mb-6">
            The Journey
          </h3>
          <div className="space-y-4 text-black text-justify">
            <p className="text-lg lg:text-xl font-serif  leading-relaxed opacity-90">
              Art & Artist was born from a simple belief:
            </p>
            <p className="text-lg lg:text-xl font-serif  leading-relaxed opacity-90 italic">
              that art deserves more than applause - it deserves recognition, opportunity, and love.
            </p>
            <p className="text-lg lg:text-xl font-serif  leading-relaxed opacity-90">
              Through this platform, We wanted to give artists the space to showcase their work, find like-minded people, and build meaningful careers.
            </p>
            <p className="text-lg lg:text-xl font-serif  leading-relaxed opacity-90">
              What started as an idea has now grown into a vision - to make the art world more open, inclusive, and connected.
            </p>
            <p className="text-lg lg:text-xl font-serif  leading-relaxed opacity-90">
              Because when artists come together, something magical happens.
            </p>
            <p className="text-lg lg:text-xl font-serif  leading-relaxed opacity-90">
              And that magic is what Art & Artist is all about.
            </p>
          </div>
        </div>

        <div className="text-center mt-12 pt-8 border-t border-gray-700">
          <button 
            onClick={onJoinWaitlistClick}
            className="bg-[#F2FF99] text-black px-8 py-3 font-courier-regular  font-medium text-lg hover:bg-black hover:text-white hover:scale-105 transition-all duration-300 rounded-md"
          >
            Join Our Community
          </button>
        </div>
      </div>
    </section>
  )
}

export default About