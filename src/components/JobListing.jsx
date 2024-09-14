import React, { useState } from "react";
import axios from "axios";
import { db } from "../../firebase"; // Your Firebase configuration
import { calculateOverallRating } from "../utils/utils"; // Utility function

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
      // Step 1: Fetch resume score (assuming it's already stored in Firestore for the applicant)
      const resumeDoc = await db
        .collection("Applicants")
        .doc(applicantId)
        .get();
      const resumeScore = resumeDoc.data().resumeScore || 80; // Fallback resume score if not found

      // Step 2: Get text score from Flask API
      const textResponse = await axios.post(
        "http://localhost:5000/upload_text",
        {
          text: suitabilityText,
        }
      );
      const textScore = textResponse.data.rating;

      // Step 3: Calculate overall rating and top strengths
      const strengths = resumeDoc.data().strengths || [
        "Teamwork",
        "Leadership",
        "Communication",
      ]; // Fallback strengths if not found
      const { overallRating, topStrengths } = calculateOverallRating(
        resumeScore,
        textScore,
        strengths
      );

      // Step 4: Save the application in Firestore with overall rating and strengths
      await db.collection("Applications").add({
        jobId,
        applicantId,
        overallRating,
        topStrengths,
        suitabilityText,
        appliedAt: new Date(),
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
