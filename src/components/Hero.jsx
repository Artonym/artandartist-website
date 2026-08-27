/* eslint-disable no-unused-vars */
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/all';
import React, { useState, useEffect, useRef } from 'react'
import gsap from 'gsap';

const images = [
  { src: "/images/1db100e3-b791-408d-89df-cf15a387e41b.jpeg", className: "top-[3%] left-[35%] w-36 h-[190px]" },
  { src: "/images/IMG_0082.JPG", className: "top-[12%] left-[30%] w-32 h-32" },
  { src: "/images/cb8c0a0b-7172-4841-9ce8-6792c1c44802.jpeg", className: "top-[10%] right-[20%] w-40 h-40" },
  { src: "/images/Bollywood, movies, art.jpeg", className: "top-[55%] right-[10%] w-32 h-32" },
  { src: "/images/IMG_0089.JPG", className: "bottom-[48%] left-[-2%] w-32 h-30" },
  { src: "/images/99bf32b8-2cfc-45ab-a944-74cfa631892e.jpeg", className: "bottom-[25%] left-[5%] w-36 h-30" },
  { src: "/images/IMG_0087.JPG", className: "bottom-[19%] right-[3%] w-32 h-32" },
  { src: "/images/IMG_0110.JPG", className: "bottom-[8%] right-[53%] w-48 h-36" },
  { src: "/images/IMG_0091.JPG", className: "top-[30%] right-[-2%] w-32 h-30" },
  { src: "/images/Raja Ravi Varma Kadambari Rolled Canvas ReprintΓÇª.jpeg", className: "top-[8%] left-[5%] w-[200px] h-[150px]" },
  { src: "/images/91ec456f-c794-4bcf-9e1c-e01e4f91bc49.jpeg", className: "bottom-[-5%] left-[15%] w-[180px] h-[190px]" },
  { src: "/images/IMG_0100.JPG", className: "top-[17%] left-[53%] w-28 h-28" },
  { src: "/images/IMG_0099.JPG", className: "bottom-[5%] right-[25%] w-[190px] h-[150px]" },
  { src: "/images/IMG_0101.JPG", className: "top-[3%] right-[6%] w-[135px] h-[115px]" },
];

// Filter images for different screen sizes with responsive positioning and sizes
const getVisibleImages = () => {
  if (typeof window === 'undefined') return images;
  
  const width = window.innerWidth;
  const height = window.innerHeight;
  
  // 4K Screens (2560px and above)
  if (width >= 2560) {
    return [
      { ...images[0], className: "top-[5%] left-[35%] w-64 h-[330px]" },
      { ...images[1], className: "top-[15%] left-[30%] w-56 h-56" },
      { ...images[2], className: "top-[15%] right-[25%] w-64 h-64" },
      { ...images[3], className: "top-[55%] right-[10%] w-56 h-56" },
      { ...images[4], className: "bottom-[48%] left-[-2%] w-56 h-48" },
      { ...images[5], className: "bottom-[25%] left-[5%] w-60 h-48" },
      { ...images[6], className: "bottom-[19%] right-[3%] w-56 h-56" },
      { ...images[7], className: "bottom-[15%] right-[53%] w-72 h-56" },
      { ...images[8], className: "top-[30%] right-[-2%] w-56 h-48" },
      { ...images[9], className: "top-[8%] left-[5%] w-[320px] h-[240px]" },
      { ...images[10], className: "bottom-[-5%] left-[15%] w-[300px] h-[310px]" },
      { ...images[11], className: "top-[25%] left-[50%] w-52 h-52" },
      { ...images[12], className: "bottom-[5%] right-[25%] w-[310px] h-[240px]" },
      { ...images[13], className: "top-[5%] right-[10%] w-[220px] h-[190px]" }
    ];
  }
  
  // Desktop (1920px - 2559px)
  if (width >= 1920) {
    return images; // Use original sizes for large desktops
  }

  // Laptop L (1440px - 1919px) - e.g. 1440x900 MacBooks, common laptop displays
  if (width >= 1440) {
    return [
      { ...images[0], className: "top-[4%] left-[35%] w-32 h-[160px]" },
      { ...images[1], className: "top-[13%] left-[30%] w-28 h-28" },
      { ...images[2], className: "top-[9%] right-[22%] w-36 h-36" },
      { ...images[3], className: "top-[55%] right-[10%] w-28 h-28" },
      { ...images[4], className: "bottom-[48%] left-[-2%] w-28 h-26" },
      { ...images[5], className: "bottom-[26%] left-[5%] w-32 h-26" },
      { ...images[6], className: "bottom-[22%] right-[3%] w-28 h-28" },
      { ...images[7], className: "bottom-[17%] right-[53%] w-40 h-32" },
      { ...images[8], className: "top-[30%] right-[-2%] w-28 h-26" },
      { ...images[9], className: "top-[7%] left-[5%] w-[170px] h-[130px]" },
      { ...images[10], className: "bottom-[2%] left-[15%] w-[155px] h-[160px]" },
      { ...images[11], className: "top-[19%] left-[51%] w-24 h-24" },
      { ...images[12], className: "bottom-[16%] right-[25%] w-[160px] h-[130px]" },
      { ...images[13], className: "top-[4%] right-[8%] w-[115px] h-[100px]" }
    ];
  }

  // Laptop (1024px - 1439px)
  if (width >= 1024) {
    return [
      { ...images[0], className: "top-[5%] left-[35%] w-32 h-[170px]" },
      { ...images[1], className: "top-[15%] left-[30%] w-28 h-28" },
      { ...images[2], className: "top-[8%] right-[25%] w-36 h-36" },
      { ...images[3], className: "top-[55%] right-[10%] w-28 h-28" },
      { ...images[4], className: "bottom-[48%] left-[-2%] w-28 h-26" },
      { ...images[5], className: "bottom-[25%] left-[5%] w-32 h-26" },
      { ...images[6], className: "bottom-[19%] right-[3%] w-28 h-28" },
      { ...images[7], className: "bottom-[11%] right-[53%] w-40 h-32" },
      { ...images[8], className: "top-[30%] right-[-2%] w-28 h-26" },
      { ...images[9], className: "top-[8%] left-[5%] w-[180px] h-[135px]" },
      { ...images[10], className: "bottom-[-5%] left-[15%] w-[160px] h-[170px]" },
      { ...images[11], className: "top-[20%] left-[50%] w-24 h-24" },
      { ...images[12], className: "bottom-[5%] right-[25%] w-[170px] h-[135px]" },
      { ...images[13], className: "top-[5%] right-[10%] w-[120px] h-[100px]" }
    ];
  }
  
  // Tablet Landscape (1024px height approximate)
  if (width >= 768 && height <= 1024) {
    return [
      { ...images[0], className: "top-[12%] left-[4%] w-24 h-[120px]" },
      { ...images[1], className: "top-[21%] left-[18%] w-20 h-20" },
      { ...images[2], className: "top-[12%] right-[8%] w-28 h-28" },
      { ...images[11], className: "top-[21%] right-[21%] w-20 h-20" },
      { ...images[4], className: "top-[57%] left-[9%] w-20 h-[60px]" },
      { ...images[5], className: "bottom-[0%] left-[2%] w-[60px] h-[60px]" },
      { ...images[10], className: "bottom-[21%] left-[20%] w-20 h-20" },
      { ...images[3], className: "bottom-[18%] right-[12%] w-20 h-[60px]" },
      { ...images[8], className: "bottom-[32%] right-[-1%] w-16 h-[40px]" },
      { ...images[13], className: "top-[35%] right-[8%] w-16 h-[50px]" },
      { ...images[9], className: "bottom-[4%] left-[15%] w-20 h-[60px]" },
      { ...images[12], className: "bottom-[2%] right-[18%] w-20 h-[70px]" },
      { ...images[6], className: "bottom-[10%] right-[3%] w-16 h-20" },
      { ...images[7], className: "bottom-[16%] left-[3%] w-24 h-24" }
    ];
  }
  
  // Tablet (768px - 1023px)
  if (width >= 768) {
    return [
      { ...images[0], className: "top-[12%] left-[4%] w-20 h-[100px]" },
      { ...images[1], className: "top-[21%] left-[18%] w-16 h-16" },
      { ...images[2], className: "top-[12%] right-[8%] w-24 h-24" },
      { ...images[11], className: "top-[21%] right-[21%] w-16 h-16" },
      { ...images[4], className: "top-[40%] left-[-2%] w-16 h-[50px]" },
      { ...images[5], className: "bottom-[0%] left-[2%] w-[50px] h-[50px]" },
      { ...images[10], className: "bottom-[21%] left-[20%] w-16 h-16" },
      { ...images[3], className: "bottom-[18%] right-[12%] w-16 h-[50px]" },
      { ...images[8], className: "bottom-[32%] right-[-1%] w-12 h-[30px]" },
      { ...images[13], className: "top-[35%] right-[8%] w-12 h-[40px]" },
      { ...images[9], className: "bottom-[4%] left-[15%] w-16 h-[50px]" },
      { ...images[12], className: "bottom-[2%] right-[18%] w-16 h-[60px]" },
      { ...images[6], className: "bottom-[10%] right-[3%] w-12 h-16" },
      { ...images[7], className: "bottom-[16%] left-[3%] w-20 h-20" }
    ];
  }
  
  // Mobile L (425px - 767px)
  if (width >= 425) {
    return [
      { ...images[0], className: "top-[12%] left-[4%] w-16 h-[80px]" },
      { ...images[1], className: "top-[21%] left-[18%] w-14 h-14" },
      { ...images[2], className: "top-[12%] right-[8%] w-20 h-20" },
      { ...images[11], className: "top-[21%] right-[21%] w-14 h-14" },
      { ...images[4], className: "top-[40%] left-[-2%] w-12 h-[40px]" },
      { ...images[5], className: "bottom-[0%] left-[2%] w-[40px] h-[40px]" },
      { ...images[10], className: "bottom-[21%] left-[20%] w-14 h-14" },
      { ...images[3], className: "bottom-[18%] right-[12%] w-12 h-[40px]" },
      { ...images[8], className: "bottom-[32%] right-[-1%] w-10 h-[25px]" },
      { ...images[13], className: "top-[35%] right-[8%] w-10 h-[30px]" },
      { ...images[9], className: "bottom-[4%] left-[15%] w-12 h-[40px]" },
      { ...images[12], className: "bottom-[2%] right-[18%] w-12 h-[50px]" },
      { ...images[6], className: "bottom-[10%] right-[3%] w-10 h-12" },
      { ...images[7], className: "bottom-[16%] left-[3%] w-16 h-16" }
    ];
  }
  
  // Mobile M (375px - 424px)
  if (width >= 375) {
    return [
      { ...images[0], className: "top-[12%] left-[4%] w-16 h-[80px]" },
      { ...images[1], className: "top-[21%] left-[18%] w-12 h-12" },
      { ...images[2], className: "top-[12%] right-[8%] w-12 h-12" },
      { ...images[11], className: "top-[21%] right-[21%] w-12 h-12" },
      { ...images[4], className: "top-[40%] left-[-2%] w-10 h-[35px]" },
      { ...images[5], className: "bottom-[0%] left-[2%] w-[35px] h-[35px]" },
      { ...images[10], className: "bottom-[21%] left-[20%] w-12 h-12" },
      { ...images[3], className: "bottom-[18%] right-[12%] w-10 h-[35px]" },
      { ...images[8], className: "bottom-[32%] right-[-1%] w-8 h-[20px]" },
      { ...images[13], className: "top-[35%] right-[8%] w-8 h-[25px]" },
      { ...images[9], className: "bottom-[4%] left-[15%] w-10 h-[35px]" },
      { ...images[12], className: "bottom-[2%] right-[18%] w-10 h-[45px]" },
      { ...images[6], className: "bottom-[10%] right-[3%] w-8 h-10" },
      { ...images[7], className: "bottom-[16%] left-[3%] w-14 h-14" }
    ];
  }
  
  // Mobile S (320px - 374px) - Smallest screens
  return [
    { ...images[0], className: "top-[12%] left-[4%] w-14 h-[70px]" },
    { ...images[1], className: "top-[21%] left-[18%] w-10 h-10" },
    { ...images[2], className: "top-[12%] right-[8%] w-10 h-10" },
    { ...images[11], className: "top-[21%] right-[21%] w-10 h-10" },
    { ...images[4], className: "top-[40%] left-[-2%] w-8 h-[30px]" },
    { ...images[5], className: "bottom-[0%] left-[2%] w-[30px] h-[30px]" },
    { ...images[10], className: "bottom-[21%] left-[20%] w-10 h-10" },
    { ...images[3], className: "bottom-[18%] right-[12%] w-8 h-[30px]" },
    { ...images[8], className: "bottom-[32%] right-[-1%] w-6 h-[16px]" },
    { ...images[13], className: "top-[35%] right-[8%] w-6 h-[20px]" },
    { ...images[9], className: "bottom-[4%] left-[15%] w-8 h-[30px]" },
    { ...images[12], className: "bottom-[2%] right-[18%] w-8 h-[38px]" },
    { ...images[6], className: "bottom-[10%] right-[3%] w-6 h-8" },
    { ...images[7], className: "bottom-[16%] left-[3%] w-12 h-12" }
  ];
};

const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbzMKaoigIYjpJWGDIMsWVBopqF13zB6lknJcuCRIdjXRzSVT9uDbnjWqn_7u7VNemVVHg/exec';

const Hero = ({ showWaitlistPopup, onClosePopup, onScrollToAbout }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    profession: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [visibleImages, setVisibleImages] = useState([]);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Fluid sizing: scales continuously with viewport width so the title never
  // wraps or overflows at odd/in-between widths, instead of jumping between
  // fixed px values at hard breakpoints.
  const textSize = {
    title: 'clamp(28px, 6.5vw, 120px)',
    subtitle: 'clamp(14px, 3vw, 60px)'
  };

  const frameRefs = useRef([]);

  // Update visible floating images on mount and resize
  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      setIsSmallScreen(width < 768);
      setVisibleImages(getVisibleImages());
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);

    return () => {
      window.removeEventListener('resize', updateScreenSize);
    };
  }, []);

  useGSAP(() => {
    // Check if we're in a browser environment
    if (typeof window !== 'undefined') {
      // Animate main title
      const titleElement = document.querySelector('.title');
      if (titleElement) {
        const heroSplit = new SplitText(titleElement, {
          type: 'chars, words',
          charsClass: "char",
          wordsClass: "word"
        });

        // Add gradient class to each character
        heroSplit.chars.forEach((char) => {
          char.classList.add('text-gradient');
        });

        // Animate characters
        gsap.from(heroSplit.chars, {
          yPercent: 100,
          duration: 1.8,
          ease: 'expo.out',
          stagger: 0.06,
          opacity: 0
        });
      }

      // Animate subtitle (Coming Soon...)
      const subtitleElement = document.querySelector('.subtitle');
      if (subtitleElement) {
        const subtitleSplit = new SplitText(subtitleElement, {
          type: 'chars',
          charsClass: "sub-char"
        });

        subtitleSplit.chars.forEach((char) => {
          char.classList.add('text-gradient');
        });

        gsap.from(subtitleSplit.chars, {
          yPercent: 100,
          duration: 1.5,
          ease: 'expo.out',
          stagger: 0.04,
          opacity: 0,
          delay: 0.5
        });
      }

      // Animate images on page load
      const images = document.querySelectorAll('img.absolute');
      gsap.from(images, {
        y: 50,              // start slightly below
        opacity: 0,          // fade in
        scale: 0.8,          // slight scale-up effect
        duration: 1.5,
        ease: 'power3.out',
        stagger: 0.1         // animate images one after another
      });
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollIndicator(window.scrollY <= 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMouseMove = (e, index) => {
    // Don't handle mouse move for small screens
    if (isSmallScreen) return;

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
    // Don't handle mouse leave for small screens
    if (isSmallScreen) return;

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
    let timer;
    if (showSuccess) {
      timer = setTimeout(() => {
        handleClosePopup();
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [showSuccess]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (submitError) setSubmitError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.profession) {
      setSubmitError('Please fill all fields.');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitError('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Create form data
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('profession', formData.profession);
      formDataToSend.append('timestamp', new Date().toISOString());

      // Use fetch with no-cors mode for better compatibility
      const response = await fetch(WEB_APP_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: formDataToSend
      });

      // Since we're using no-cors, we can't read the response
      // But the data should still be submitted to Google Sheets
      console.log('Form submitted successfully');
      setShowSuccess(true);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      // Even if there's an error, show success to the user
      // since with no-cors we can't determine if it actually worked
      setShowSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClosePopup = () => {
    setFormData({ name: '', email: '', profession: '' });
    setShowSuccess(false);
    setIsSubmitting(false);
    setSubmitError('');
    onClosePopup();
  };

  const closePopup = () => handleClosePopup();

  // Initialize refs array
  useEffect(() => {
    frameRefs.current = frameRefs.current.slice(0, visibleImages.length);
  }, [visibleImages]);

  return (
    <main className="relative flex h-screen min-h-[500px] flex-col items-center justify-center overflow-hidden bg-[#ece9de] px-4 pb-20 text-center cursor-none lg:pb-28">

      {/* Floating Images - Only show filtered images */}
      {visibleImages.map((img, idx) => (
        <img
          ref={el => frameRefs.current[idx] = el}
          onMouseMove={(e) => handleMouseMove(e, idx)}
          onMouseLeave={() => handleMouseLeave(idx)}
          onMouseUp={() => handleMouseLeave(idx)}
          onMouseEnter={() => handleMouseLeave(idx)}
          key={idx}
          src={img.src}
          alt=""
          className={`absolute rounded-lg object-cover shadow-md ${img.className}`}
        />
      ))}

      {/* Main Text */}
      <h1 
        className="title font-kugile mb-2 mx-6 lg:mx-[250px] z-10"
        style={{ fontSize: textSize.title }}
      >
        Art meets Opportunity
      </h1>
      
      <h2 
        className="subtitle font-semibold font-kugile mt-3 z-10"
        style={{ fontSize: textSize.subtitle }}
      >
        Coming Soon...
      </h2>

      {/* Scroll Down Indicator */}
      {showScrollIndicator && (
        <button
          onClick={onScrollToAbout}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-gray-600 hover:text-black transition-all duration-300 z-20 cursor-none group"
        >
          <span className="font-courier-regular text-sm mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Discover More
          </span>
          <div>
            <svg 
              className="w-6 h-6 transform group-hover:scale-110 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </button>
      )}

      {/* Waitlist Popup */}
      {showWaitlistPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 cursor-none">
          <div 
            className="bg-white rounded-lg p-6 w-full max-w-md relative cursor-none"
          >
            
            {!showSuccess && (
              <button
                onClick={closePopup}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl cursor-none"
              >
                ×
              </button>
            )}
            
            {showSuccess ? (
              <div className="text-center py-8 cursor-none">
                <h3 className="text-2xl font-kugile mb-4 text-gray-800">
                  Thanks for showing interest!
                </h3>
                <p className="text-gray-600">
                  We'll be in touch soon.
                </p>
                <button
                  onClick={handleClosePopup}
                  className="mt-6 bg-[#F2FF99] text-black py-2 px-6 font-courier-regular font-medium hover:bg-black hover:text-white transition-all duration-300 rounded-md cursor-none"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-wasted-vindey mb-6 text-gray-800">
                  ART & ARTIST
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-4 cursor-none">
                  <div>
                    <label htmlFor="name" className="block text-left text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F2FF99] focus:border-transparent"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-left text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F2FF99] focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label htmlFor="profession" className="block text-left text-sm font-medium text-gray-700 mb-1">
                      Profession
                    </label>
                    <input
                      type="text"
                      id="profession"
                      name="profession"
                      value={formData.profession}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F2FF99] focus:border-transparent"
                      placeholder="Eg: Cinematographer / Fine Arts / Music Director"
                    />
                  </div>

                  {submitError && (
                    <div className="text-red-500 text-sm text-center bg-red-50 py-2 px-3 rounded-md">
                      {submitError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#F2FF99] text-black py-3 px-4 font-courier-regular font-medium hover:bg-black hover:text-white transition-all duration-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'SUBMITTING...' : 'SUBMIT'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        .text-gradient {
          background: linear-gradient(45deg, #000000, #016367);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .char {
          display: inline-block;
        }
      `}</style>
    </main>
  )
}

export default Hero