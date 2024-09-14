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

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
