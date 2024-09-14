import ChatBotP from "../syllabus/SyllabusChat";
import ChatBot from "../syllabus/SyllabusChat";
import ChatBotW from "../syllabus/WebChat";

export default function CardsIntrest() {
  // Function to handle card click and set local storage
  const handleCardClick = (cardName) => {
    // Set the localStorage with the selected card name
    localStorage.setItem("quiz", cardName);
    document.getElementById(cardName).showModal();
  };

  // Card data
  const cards = [
    { name: "WebDev", description: "Learn about web development." },
    { name: "Python", description: "Master Python programming." },
    { name: "C++", description: "Explore C++ concepts." },
    { name: "ML", description: "Dive into Machine Learning." },
  ];

  return (
    <div className=" grid grid-cols-2 p-6 gap-6">
      {cards.map((card) => (
        <div
          key={card.name}
          onClick={() => handleCardClick(card.name)}
          className="bg-blue-500 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer text-center w-48"
        >
          <h3 className="text-xl font-semibold mb-2">{card.name}</h3>
          <p className="text-gray-500">{card.description}</p>
        </div>
      ))}
      {cards.map((card) => (
        <dialog key={card.name} id={card.name} className="modal">
          <div className="modal-box p-0   w-[100vw]   bg-white scrollbar-hide">
            <div className="modal-action block ">
              {card.name === "WebDev" ? <ChatBotW /> : <ChatBotP />}
              <form method="dialog z-50">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      ))}
    </div>
  );
}
