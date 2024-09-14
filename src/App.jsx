import { useState, useRef } from "react";
// import "./assets/logo.svg";
import viteLogo from "/vite.svg";
import "./index.css"; // Import tailwind styles
import { LocomotiveScrollProvider } from "react-locomotive-scroll";

import "./App.css";
import Login from "./components/Login";
import ListJobs from "./components/ListJobs";
import Navbar from "./components/Navbar";

function App() {
  const containerRef = useRef(null);
  return(
    <>
    {/* <Login/> */}
    <Navbar/>
    </>
  );
}

export default App;
