import { useState, useEffect, useRef } from "react";
import python from "./python.json";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function ChatBotP() {
  const [currentSubjectIndex, setCurrentSubjectIndex] = useState(0);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [selectedTopics, setSelectedTopics] = useState({});
  const [isFinalSlide, setIsFinalSlide] = useState(false);
  const [messages, setMessages] = useState([]);
  const [response, setResponse] = useState(null);

  const API_KEY = "AIzaSyBxm7zzP55l_Aoqgb3I7LF-YJDURFApzrw";
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // Create a ref for the chat container
  const chatContainerRef = useRef(null);

  const currentSubject = python.subjects[currentSubjectIndex];
  const currentChapter = currentSubject.chapters[currentChapterIndex];

  // This useEffect will read the current chapter out loud when the chapter changes
  useEffect(() => {
    if (currentChapter) {
      speakOutLoud(`Chapter: ${currentChapter.chapter}`);
      addMessage({
        role: "bot",
        text: `Current Chapter: ${currentChapter.chapter}. Please select the topics you've covered if you wish to.`,
      });
    } else {
      addMessage({
        role: "bot",
        text: `Please select the topics you have covered in ${currentSubject.subject}.`,
      });
    }
  }, [currentChapter, currentSubject.subject]);

  // useEffect to scroll to the bottom whenever messages are updated
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Function to add messages to chat history
  const addMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  // Function to handle topic selection via checkboxes
  const handleTopicChange = (topic) => {
    const key = `${currentSubject.subject}_${currentChapter.chapter}`;
    const newSelectedTopics = {
      ...selectedTopics,
      [key]: {
        ...(selectedTopics[key] || {}),
        [topic]: !(selectedTopics[key]?.[topic] || false),
      },
    };
    setSelectedTopics(newSelectedTopics);

    if (newSelectedTopics[key][topic]) {
      addMessage({ role: "user", text: `You selected the topic: ${topic}` });
    }
  };

  // Function to handle the "Next" button action
  const handleNext = () => {
    const totalChapters = currentSubject.chapters.length;
    const totalSubjects = python.subjects.length;

    if (currentChapterIndex < totalChapters - 1) {
      setCurrentChapterIndex(currentChapterIndex + 1);
    } else if (currentSubjectIndex < totalSubjects - 1) {
      setCurrentSubjectIndex(currentSubjectIndex + 1);
      setCurrentChapterIndex(0);
    } else {
      setIsFinalSlide(true);
      addMessage({
        role: "bot",
        text: "You have completed all subjects and chapters.",
      });
    }
  };

  // Function to handle the "Done" button action
  const handleDone = async () => {
    const result = python.subjects.map((subject) => ({
      subject: subject.subject,
      chapters: subject.chapters.map((chapter) => ({
        chapter: chapter.chapter,
        topics: chapter.topics.map((topic) => ({
          topic: topic,
          covered:
            selectedTopics[`${subject.subject}_${chapter.chapter}`]?.[topic] ||
            false,
        })),
      })),
    }));

    const jsonString = JSON.stringify(result, null, 2);
    addMessage({
      role: "bot",
      text: "You have completed the syllabus.",
    });
    console.log(jsonString);

    const refinedPrompt = `
Based on the following JSON, create a study plan and routine that prioritizes the topics which have not been covered. For each subject, provide a weekly schedule suggesting how many topics should be completed per week until all are finished. Please also include a summary of the total covered topics vs. uncovered topics for each subject. 

Here is the JSON data representing the current syllabus progress: 

${jsonString}

The output should be in a readable JSON format with two main sections: 
1. "summary": An overview of progress for each subject, showing how many topics have been covered vs. how many remain.
2. "routine": A weekly study plan for completing the remaining topics in each subject.

The "routine" section should include a title and a start/end time like this example:

{
  "title": "Math Exam",
  "start": "2024-09-04T15:00:00",
  "end": "2024-09-04T17:20:00"
}
`;

    try {
      const result = await model.generateContent(refinedPrompt);
      const response = result.response;
      const text = await response.text(); // Get the response text

      // Attempt to extract only the valid JSON from the response
      const jsonStart = text.indexOf("{"); // Find the start of the JSON block
      const jsonEnd = text.lastIndexOf("}"); // Find the end of the JSON block

      if (jsonStart !== -1 && jsonEnd !== -1) {
        // Extract the potential JSON portion
        const jsonString = text.substring(jsonStart, jsonEnd + 1);

        // Parse the extracted JSON string
        const jsonResponse = JSON.parse(jsonString);

        // Transform the structure of jsonResponse to the required format
        if (jsonResponse && Array.isArray(jsonResponse)) {
          jsonResponse.routine = jsonResponse.routine.map((item) => {
            const title = item.subject || "Math Exam"; // Use the subject or default title
            const start = "2024-09-04T15:00:00"; // Static or dynamically generated start time
            const end = "2024-09-04T17:20:00"; // Static or dynamically generated end time

            return {
              title,
              start,
              end,
            };
          });
        }

        setResponse(jsonResponse);

        console.log(jsonResponse);
      } else {
        throw new Error("JSON block not found in the response.");
      }
    } catch (error) {
      console.error("Error generating AI response:", error);
      setResponse("Error generating response");
    }
  };

  // Function to speak out text
  const speakOutLoud = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex-grow overflow-y-auto p-0" ref={chatContainerRef}>
        <div className="bg-white shadow-lg rounded-lg p-4 h-full scrollbar-hide overflow-y-scroll">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-4 p-2 w-fit rounded-lg ${
                msg.role === "bot"
                  ? "bg-blue-100 text-left mr-auto" // Bot messages aligned to the left
                  : "bg-green-100 text-right ml-auto" // User messages aligned to the right
              }`}
            >
              <p className="text-gray-800">{msg.text}</p>
            </div>
          ))}

          {/* Display checkboxes for selecting topics if current chapter exists */}
          {currentChapter && (
            <div className="mt-4 w-fit mr-auto bg-blue-300 rounded-lg p-3">
              <h3 className="text-lg font-semibold text-gray-700">
                Select topics from {currentChapter.chapter}
              </h3>
              <form className="mt-2">
                {currentChapter.topics.map((topic, index) => (
                  <label key={index} className="block mb-2">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={
                        selectedTopics[
                          `${currentSubject.subject}_${currentChapter.chapter}`
                        ]?.[topic] || false
                      }
                      onChange={() => handleTopicChange(topic)}
                    />
                    {topic}
                  </label>
                ))}
              </form>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white p-4 border-t border-gray-200">
        <div className="flex justify-between">
          {!isFinalSlide ? (
            <button
              onClick={handleNext}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleDone}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              Done
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
