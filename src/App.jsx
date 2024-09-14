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
import JobListingPage from "./components/JobListing";
import Test from "./components/Test";
import ApplyForJob from "./components/ApplyForJob";

function App() {
  return (
    <>
      <ApplyForJob />
      {/* <Test /> */}
      {/* <JobListingPage /> */}
      {/* <BinningPage /> */}
    </>
  );
}

export default App;
