import { useState, useRef } from "react";
// import "./assets/logo.svg";
import viteLogo from "/vite.svg";
import "./index.css"; // Import tailwind styles
import { LocomotiveScrollProvider } from "react-locomotive-scroll";

import "./App.css";
import Login from "./components/Login";
import ListJobs from "./components/ListJobs";
import Navbar from "./components/Navbar";
import CardsIntrest from "./components/CardsIntrest";
import BinningPage from "./components/BinningPage";
import Hero from "./components/Hero";

function App() {
  return (
    <>
    <Hero/>
      <Navbar />
      <Login />
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn"
        onClick={() => document.getElementById("cards_interest").showModal()}
      >
        Chat Bot
      </button>
      <dialog id="cards_interest" className="modal">
        <div className="modal-box bg-white ">
          <div className="modal-action block">
            <CardsIntrest />
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default App;
