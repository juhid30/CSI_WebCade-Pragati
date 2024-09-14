import { useState } from "react";

const QuizComponent = () => {
  const [answers, setAnswers] = useState({
    q1: "",
    q2: "",
    q3: "",
    q4: "",
  });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [result, setResult] = useState(null);

  const questions = [
    {
      id: "q1",
      question: "How do you approach a new learning task?",
      options: [
        { label: "I like to research and plan thoroughly.", value: "above" },
        { label: "I give it a try and see how it goes.", value: "mediocre" },
        { label: "I avoid it or feel overwhelmed.", value: "below" },
      ],
    },
    {
      id: "q2",
      question: "How do you respond to feedback?",
      options: [
        { label: "I take it as a chance to improve.", value: "above" },
        { label: "I accept it but don’t always act on it.", value: "mediocre" },
        { label: "I feel discouraged or defensive.", value: "below" },
      ],
    },
    {
      id: "q3",
      question: "How do you manage your study time?",
      options: [
        { label: "I create a schedule and stick to it.", value: "above" },
        { label: "I study when I feel like it.", value: "mediocre" },
        { label: "I often procrastinate and cram.", value: "below" },
      ],
    },
    {
      id: "q4",
      question: "How do you deal with difficult topics?",
      options: [
        { label: "I break them down and seek help if needed.", value: "above" },
        {
          label: "I try to understand but sometimes skip them.",
          value: "mediocre",
        },
        { label: "I skip or give up on them.", value: "below" },
      ],
    },
  ];

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value,
    }));
  };

  const calculateResult = () => {
    let score = 0;

    // Calculate score based on answers
    Object.values(answers).forEach((answer) => {
      if (answer === "above") {
        score += 2;
      } else if (answer === "mediocre") {
        score += 1;
      }
    });

    // Determine learning type based on score
    if (score >= 7) {
      setResult("Above Average");
    } else if (score >= 4) {
      setResult("Mediocre");
    } else {
      setResult("Below Average");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateResult();
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <div className="quiz-container">
      <h2 className="text-2xl font-bold mb-4">Learning Style Quiz</h2>

      {!result ? (
        <form onSubmit={handleSubmit}>
          {/* Display current question */}
          <div key={questions[currentQuestionIndex].id} className="mb-4">
            <p className="mb-2">{questions[currentQuestionIndex].question}</p>
            {questions[currentQuestionIndex].options.map((option) => (
              <label key={option.value} className="block mb-1">
                <input
                  type="radio"
                  name={questions[currentQuestionIndex].id}
                  value={option.value}
                  onChange={(e) =>
                    handleAnswerChange(
                      questions[currentQuestionIndex].id,
                      e.target.value
                    )
                  }
                  checked={
                    answers[questions[currentQuestionIndex].id] === option.value
                  }
                  required
                />
                <span className="ml-2">{option.label}</span>
              </label>
            ))}
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={handlePrevious}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </button>
            {currentQuestionIndex < questions.length - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      ) : (
        // Display result
        <div className="result mt-6">
          <h3 className="text-xl font-semibold">Your Learning Type:</h3>
          <p className="mt-2 text-lg text-gray-800">{result}</p>
        </div>
      )}
    </div>
  );
};

export default QuizComponent;
