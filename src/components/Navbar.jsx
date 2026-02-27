import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleJoinClick = () => {
    navigate("/waitlist");
  };

  return (
    <nav
      className="
        fixed 
        bottom-5 lg:bottom-[70px]
        left-1/2 transform -translate-x-1/2
        w-[90%] sm:w-[400px] md:w-[450px] lg:w-auto
        bg-white/80 backdrop-blur-md 
        border border-gray-300 
        flex justify-between items-center
        gap-4 md:gap-[150px] 
        py-2 px-3 sm:py-2 sm:px-4 lg:py-6 lg:px-6
        rounded-[8px]
        shadow-lg z-50
      "
    >
      <h1 className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-wasted-vindey text-gray-800 whitespace-nowrap">
        Art & Artist
      </h1>

      <button
        onClick={handleJoinClick}
        className="bg-[#F2FF99] text-black px-8 py-3 font-courier-regular font-medium text-lg hover:bg-black hover:text-white hover:scale-105 transition-all duration-300 rounded-md"
      >
        Join Our Community
      </button>

    </nav>
  );
};

export default Navbar;
