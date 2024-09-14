import React from "react";
import Navbar from "../components/Navbar";
import CardsIntrest from "../components/CardsIntrest";
import QuizComponent from "../components/Quiz";
import DataCP from "../components/DataCP";

export default function Home() {
  return (
    <div className="relative">
      <button
        className="btn absolute bottom-10 right-10"
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
      <dialog id="quiz" className="modal">
        <div className="modal-box bg-white ">
          <div className="modal-action block">
            <QuizComponent />
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
