import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="bg-gray-900 text-white py-20">
      <div className="container mx-auto text-center h-fit">
        <h1 className="text-5xl font-bold">Enhance Your Coding Journey</h1>
        <p className="mt-4 text-xl text-gray-300">
          AI-powered code review, interview scheduling, chatbot progress
          tracking, and ranking management, all in one platform.
        </p>
        {/* Removed the extra <a> tag */}
        <Link
          to="/login"
          className="inline-block mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Get Started
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
