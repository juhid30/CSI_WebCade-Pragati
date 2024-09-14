import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto text-center">
        <p>&copy; 2024 CodeBoost. All Rights Reserved.</p>
        <div className="mt-4">
          <a href="#home" className="text-white hover:text-blue-500">
            Home
          </a>{" "}
          |
          <a href="#features" className="ml-2 text-white hover:text-blue-500">
            Features
          </a>{" "}
          |
          <a href="#employers" className="ml-2 text-white hover:text-blue-500">
            Employer Services
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
