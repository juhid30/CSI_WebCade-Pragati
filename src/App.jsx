import { useState, useRef } from "react";
// import "./assets/logo.svg";
import viteLogo from "/vite.svg";
import "./index.css"; // Import tailwind styles
import { Route, Routes, Navigate } from "react-router-dom";

import "./App.css";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import CardsIntrest from "./components/CardsIntrest";
import Home from "./pages/home";
import ResumeUpload from "./components/ResumeUpload";
import ApplyForJob from "./components/ApplyForJob";

function App() {
  return (
    <div className="bg-white min-h-[100vh]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/getCP" element={<DataCP />} />
        <Route path="/login" element={<Login />} />
        <Route path="/apply" element={<ApplyForJob />} />
        <Route
          path="/upload-resume"
          element={<ResumeUpload studentId={"fKDUga9FWQtsXwVGd67u"} />}
        />
      </Routes>
    </div>
  );
}

export default App;
