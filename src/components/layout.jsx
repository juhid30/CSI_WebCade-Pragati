import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./footer";
import QuizComponent from "./Quiz";
import CardsIntrest from "./CardsIntrest";

export default function Layout() {
  return (
    <div className=" flex flex-col min-h-screen p-3">
      <Navbar />
      <main className="relative flex-grow">
        <Outlet />
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
      </main>

      <Footer />
    </div>
  );
}
