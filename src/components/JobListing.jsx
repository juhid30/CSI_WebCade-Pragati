import React, { useState } from "react";
import axios from "axios";
import { db } from "../../firebase"; // Your Firebase configuration
import { calculateOverallRating } from "../utils/utils"; // Utility function
import { doc, getDoc, addDoc, collection } from "firebase/firestore";

const JobListingPage = ({ jobId, applicantId }) => {
  const [suitabilityText, setSuitabilityText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle text input change
  const handleInputChange = (e) => {
    setSuitabilityText(e.target.value);
  };

  // Handle job application submission
  const handleSubmitApplication = async () => {
    setIsSubmitting(true);

    try {
      // Step 1: Fetch resume score and strengths from the student's document in Firestore
      const applicantDocRef = doc(db, "studentData", applicantId);
      const applicantDoc = await getDoc(applicantDocRef);

      if (!applicantDoc.exists()) {
        throw new Error("Applicant document not found");
      }

      const applicant = applicantDoc.data();
      console.log(applicant);
      const resumeScore = applicant.responseData?.rating?.score || 7; // Fallback resume score if not found
      console.log(resumeScore);
      const strengths = applicant.responseData?.strengths || [
        "Teamwork",
        "Leadership",
        "Communication",
      ]; // Fallback strengths if not found
      console.log(strengths);
      const formData = new FormData();
      formData.append("input_text", suitabilityText);
      // Step 2: Get text score from the API
      const textResponse = await axios.post(
        "http://localhost:5000/upload_text",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            // Include any authorization token if required
          },
        }
      );
      console.log(textResponse.data.response);
      const textScore = textResponse.data.response.rating;
      console.log(textScore);
      const strengthsArray = Object.values(strengths);
      // Step 3: Calculate overall rating and top strengths
      const resumeScoreNumber = Number(resumeScore);
      const textScoreNumber = Number(textScore);
      const { overallRating, topStrengths } = calculateOverallRating(
        resumeScoreNumber,
        textScoreNumber,
        strengthsArray
      );
      console.log({ overallRating, topStrengths });

      // Step 4: Save the application in Firestore with overall rating and strengths
      await addDoc(collection(db, "Applications"), {
        jobId,
        applicantId,
        overallRating,
        topStrengths,
        suitabilityText,
        appliedAt: new Date(),
        resumeScore, // Include resume score for reference
        textScore,
        textResponse: textResponse.data, // Save the entire response for reference
      });

      alert("Application submitted successfully!");
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Error submitting application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Apply for Job</h2>

      {/* Text Input */}
      <textarea
        placeholder="Describe your suitability for this role"
        value={suitabilityText}
        onChange={handleInputChange}
        rows="5"
        cols="40"
      />

      {/* Submit Button */}
      <button onClick={handleSubmitApplication} disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Application"}
      </button>
    </div>
  );
};

export default JobListingPage;
