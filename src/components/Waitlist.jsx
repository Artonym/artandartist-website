import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Waitlist = () => {
  const [showModal, setShowModal] = useState(true);
  const navigate = useNavigate();

  // Close modal and go back home
  const handleClose = () => {
    setShowModal(false);
    navigate("/");
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-md w-[90%] max-w-md relative shadow-xl">
        
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-500 text-xl"
        >
          ✕
        </button>

        <h2 className="text-2xl mb-4 font-kugile">
          Join the Waitlist
        </h2>

        <p className="text-gray-600 mb-6">
          Be among the first artists to experience Art & Artist.
        </p>

        <input
          type="email"
          placeholder="Your Email"
          className="w-full border border-gray-300 px-4 py-2 mb-4 rounded-md"
        />

        <button className="w-full bg-black text-white py-2 rounded-md hover:opacity-90 transition">
          Submit
        </button>
      </div>
    </div>
  );
};

export default Waitlist;
