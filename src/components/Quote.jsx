/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(SplitText, ScrollTrigger);
}

const Quote = () => {
  const sectionRef = useRef(null);
  const topTextRef = useRef(null);
  const middleTextRef = useRef(null);
  const bottomTextRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const topElement = topTextRef.current;
      const middleElement = middleTextRef.current;
      const bottomElement = bottomTextRef.current;

      if (!topElement || !middleElement || !bottomElement) return;

      // Create SplitText instances
      const topSplit = new SplitText(topElement, {
        type: 'chars',
        charsClass: "char"
      });

      const middleSplit = new SplitText(middleElement, {
        type: 'chars',
        charsClass: "char"
      });

      const bottomSplit = new SplitText(bottomElement, {
        type: 'chars',
        charsClass: "char"
      });

      // Set initial states for all characters
      const setInitialStates = (split, direction) => {
        const xOffset = direction === 'right' ? 100 : -100;
        gsap.set(split.chars, {
          x: xOffset,
          yPercent: () => gsap.utils.random(-100, 100),
          rotation: () => gsap.utils.random(-30, 30),
          autoAlpha: 0
        });
      };

      setInitialStates(topSplit, 'right');
      setInitialStates(middleSplit, 'left');
      setInitialStates(bottomSplit, 'right');

      // Top text animation
      gsap.to(topSplit.chars, {
        x: 0,
        yPercent: 0,
        rotation: 0,
        autoAlpha: 1,
        ease: 'back.out(1.5)',
        stagger: {
          amount: 0.5,
          from: 'random'
        },
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'top 30%',
          scrub: 1,
          markers: false,
        }
      });

      // Middle text animation
      gsap.to(middleSplit.chars, {
        x: 0,
        yPercent: 0,
        rotation: 0,
        autoAlpha: 1,
        ease: 'back.out(1.5)',
        stagger: {
          amount: 0.5,
          from: 'random'
        },
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 30%',
          end: 'top 0%',
          scrub: 1,
          markers: false,
        }
      });

      // Bottom text animation - using a different approach for bottom triggers
      gsap.to(bottomSplit.chars, {
        x: 0,
        yPercent: 0,
        rotation: 0,
        autoAlpha: 1,
        ease: 'back.out(1.5)',
        stagger: {
          amount: 0.5,
          from: 'random'
        },
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'bottom 120%', // When bottom is 90% from bottom (10% visible)
          end: 'bottom 100%',   // When bottom is 70% from bottom (30% visible)
          scrub: 1,
          markers: false,
        }
      });

    }, sectionRef);

    return () => {
      ctx.revert(); // Cleanup
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative flex flex-col overflow-hidden bg-[#ece9de]"
    >
      <div className="top-div relative h-[60vh] bg-[#231B1B] clip-top flex items-center justify-center text-white text-2xl sm:text-3xl md:text-4xl font-kugile">
        <p 
          ref={topTextRef}
          className="text-top px-4 text-center"
        >
          Join a network
        </p>
      </div>
      
      <div className="middle-div relative h-[20vh] clip-top flex items-center justify-center text-black text-xl sm:text-2xl md:text-4xl font-kugile">
        <p 
          ref={middleTextRef}
          className="text-middle px-4 text-center"
        >
          Where Imagination becomes
        </p>
      </div>
      
      <div className="bottom-div relative h-[60vh] bg-[#231B1B] clip-top flex items-center justify-center text-white text-2xl sm:text-3xl md:text-4xl font-kugile">
        <p 
          ref={bottomTextRef}
          className="text-bottom px-4 text-center"
        >
          Opportunities
        </p>
      </div>

      <style jsx>{`
        .clip-top {
          clip-path: polygon(0 30%, 100% 0%, 100% 100%, 0 70%);
        }

        @media (max-width: 1023px) {
          .clip-top {
            clip-path: polygon(0 20%, 100% 0%, 100% 100%, 0 80%);
          }
          .top-div, .bottom-div {
            height: 35vh;
          }
          .middle-div {
            height: 18vh;
          }
        }

        @media (max-width: 639px) {
          .clip-top {
            clip-path: polygon(0 15%, 100% 0%, 100% 100%, 0 85%);
          }
          .top-div, .bottom-div {
            height: 30vh;
          }
          .middle-div {
            height: 16vh;
          }
        }

        @media (max-width: 480px) {
          .clip-top {
            clip-path: polygon(0 20%, 100% 0%, 100% 100%, 0 80%);
          }
          
          .top-div, .bottom-div {
            height: 30vh;
          }
          .middle-div {
            height: 16vh;
          }
        }

        .char {
          display: inline-block;
          position: relative;
        }

        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </section>
  );
};

export default Quote;