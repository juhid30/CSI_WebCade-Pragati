import React, { useState } from "react";

const Modal = ({ isOpen, closeModal }) => {
  const data = {
    response: {
      suggestions: [
        {
          advice:
            "To strengthen your technical expertise, delving into Firebase and SQL will significantly enhance your skill set. Consider enrolling in online courses or workshops that offer comprehensive training in these technologies.",
          resources: [
            {
              link: "https://www.coursera.org/specializations/firebase-tutorial-beginners",
              title: "Firebase Tutorial for Beginners",
            },
            {
              link: "https://www.udacity.com/school-of-data-science/nanodegree/nd023",
              title: "Mastering SQL for Data Analytics",
            },
            {
              link: "https://www.udemy.com/course/the-complete-sql-bootcamp-2023-go-from-zero-to-hero/",
              title: "The Complete SQL Bootcamp 2023: Go from Zero to Hero",
            },
            {
              link: "https://www.youtube.com/watch?v=E72cZrkz9zs",
              title:
                "Firebase Crash Course for Beginners: Build an App in Under 3 Hours",
            },
            {
              link: "https://www.youtube.com/watch?v=T-HU1o6-gRA",
              title:
                "SQL Tutorial for Beginners | Full Course | Learn SQL in 60 Minutes",
            },
          ],
        },
      ],
    },
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-3/4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Suggestions</h2>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-700"
          >
            X
          </button>
        </div>

        <div className="mb-6">
          <p className="text-lg text-gray-700">
            {data.response.suggestions[0].advice}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto h-64 pr-2 scrollbar-hide">
          {data.response.suggestions[0].resources.map((resource, index) => (
            <div
              key={index}
              className="bg-blue-50 rounded-lg p-4 shadow hover:bg-blue-100 transition"
            >
              <h3 className="text-md font-semibold mb-2">{resource.title}</h3>
              <a
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                View Resource
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SuggestionsModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <button
        onClick={openModal}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
      >
        Open Modal
      </button>
      <Modal isOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
};

export default SuggestionsModal;
