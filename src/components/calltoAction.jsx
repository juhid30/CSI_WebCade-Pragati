import React from "react";

const CTASection = () => {
  return (
    <section className="bg-blue-500 text-white py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">
          Ready to Take Your Coding Skills to the Next Level?
        </h2>
        <p className="text-xl mb-6">
          Join our platform today and experience AI-powered coding, progress
          tracking, and more.
        </p>
        <button className="bg-white text-blue-500 font-bold py-2 px-4 rounded hover:bg-gray-300">
          Sign Up Now
        </button>
      </div>
    </section>
  );
};

export default CTASection;
