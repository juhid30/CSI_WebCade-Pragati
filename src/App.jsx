import { useState, useRef } from "react";
import "./assets/logo.svg";
import viteLogo from "/vite.svg";
import "./index.css"; // Import tailwind styles
import { LocomotiveScrollProvider } from "react-locomotive-scroll";

import "./App.css";
import Login from "./components/Login";
import ListJobs from "./components/ListJobs";
import Navbar from "./components/Navbar";
import BinningPage from "./components/BinningPage";

function App() {
  return (
    <>
      <Navbar/>
      <Login />
    </>
  );
}

export default App;
