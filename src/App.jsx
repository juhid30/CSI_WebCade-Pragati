import { useState, useRef } from "react";
import "./assets/logo.svg";
import viteLogo from "/vite.svg";
import "./index.css"; // Import tailwind styles
import { LocomotiveScrollProvider } from "react-locomotive-scroll";

import "./App.css";
import Login from "./components/Login";
import Navbar from "./components/Navbar";

function App() {
  const containerRef = useRef(null);
  return(
    <>
      <LocomotiveScrollProvider
      options={
        {
          smooth:true,
        }
      }
      watch={[]}
      containerRef={containerRef}>


        <main data-scroll-container ref={containerRef}>
          <Navbar/>
          <Login/>
          <Login/>
          <Login/>
        </main>

      </LocomotiveScrollProvider>
    </>
  );
}

export default App;
