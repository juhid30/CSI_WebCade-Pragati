import React, { useState, useEffect } from "react";
import axios from "axios";
import { storage } from "../../firebase";
import { getDownloadURL, ref } from "firebase/storage";

const ApplyForJob = ({ setRating }) => {
  const [textContent, setTextContent] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [resumeBlob, setResumeBlob] = useState(null); // Store the blob of the resume
  const [strengths, setStrengths] = useState([
    "Demonstrates excellent problem-solving skills.",
    "Shows strong leadership abilities.",
    "Has a deep understanding of machine learning.",
  ]);

  useEffect(() => {
    // Fetch the resume file from Firebase Storage
    const fetchResume = async () => {
      const studentId = "fKDUga9FWQtsXwVGd67u"; // Replace with actual student ID
      const resumeRef = ref(storage, `resumes/${studentId}.pdf`);

      try {
        const url = await getDownloadURL(resumeRef);
        setResumeUrl(url);

        // Fetch the resume as a blob
        const resumeBlob = await fetch(url).then((res) => res.blob());
        setResumeBlob(resumeBlob);
      } catch (error) {
        console.error("Error fetching resume:", error);
      }
    };

    fetchResume();
  }, []);

  const handleTextChange = (event) => {
    setTextContent(event.target.value);
  };

  const handleSubmit = async () => {
    if (!resumeBlob || !textContent) {
      alert("Please provide both resume and text content.");
      return;
    }

    try {
      // Create a FormData instance for the resume
      const resumeFormData = new FormData();
      resumeFormData.append("file", resumeBlob, "resume.pdf"); // Add the blob as a file with a name

      // Upload the resume
      const resumeResponse = await axios.post("/upload", resumeFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (resumeResponse.status !== 200) {
        throw new Error("Failed to upload resume.");
      }

      const resumeScore = resumeResponse.data.score;

      // Upload the text content
      const textResponse = await axios.post(
        "/upload_text",
        {
          input_text: textContent,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (textResponse.status !== 200) {
        throw new Error("Failed to upload text.");
      }

      const textScore = textResponse.data.score;

      // Calculate the overall rating (using only resume and text scores)
      const overallRating = calculateOverallRating(resumeScore, textScore);
      setRating(overallRating);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  // Function to calculate the overall rating
  function calculateOverallRating(resumeScore, textScore) {
    // Define weights
    const W1 = 0.7; // Weight for resume score
    const W2 = 0.3; // Weight for text score

    // Normalize resume score (out of 10) to 100
    const normalizedResumeScore = Math.min(Math.max(resumeScore * 10, 0), 100);

    // Normalize text score (out of 5) to 100
    const normalizedTextScore = Math.min(Math.max(textScore * 20, 0), 100);

    // Calculate weighted average of resume and text scores
    const overallRating = normalizedResumeScore * W1 + normalizedTextScore * W2;

    return overallRating;
  }

  return (
    <div>
      <textarea
        value={textContent}
        onChange={handleTextChange}
        placeholder="Enter text content here"
        rows="5"
        cols="40"
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>

      {/* Display the top 3 strengths */}
      <div>
        <h3>Top 3 Strengths:</h3>
        <ul>
          {strengths.slice(0, 3).map((strength, index) => (
            <li key={index}>{strength}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ApplyForJob;
