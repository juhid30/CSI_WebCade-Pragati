import { useState, useRef } from "react";
// import "./assets/logo.svg";
import viteLogo from "/vite.svg";
import "./index.css"; // Import tailwind styles
import { Route, Routes, Navigate } from "react-router-dom";

import "./App.css";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import CardsIntrest from "./components/CardsIntrest";
import CodingPlatform from "../src/components/CodingPlatform"
import CalenderC from "../src/components/Calendar"
import Home from "./pages/home";

function App() {
  return (
    <div className="bg-white min-h-[100vh]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/coding" element={<CodingPlatform />} />
        <Route path="/calendar" element={<CalenderC />} />

      </Routes>
    </div>
  );
}

export default App;
