import React from "react";

const HeroSection = () => {
  return (
    <section className="bg-gray-900 text-white py-20">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl font-bold">Enhance Your Coding Journey</h1>
        <p className="mt-4 text-xl">
          AI-powered code review, interview scheduling, chatbot progress
          tracking, and ranking management, all in one platform.
        </p>
        <a href="#features">
          <button className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Get Started
          </button>
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
