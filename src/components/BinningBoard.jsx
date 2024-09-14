import React, { useState, useEffect } from "react";
import { db } from "../../firebase"; // Your Firebase configuration
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { classifyApplicants } from "../utils/categorizeApplicants"; // Import the classification function

const BinningBoard = () => {
  const [applicants, setApplicants] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobId, setJobId] = useState("abc"); // Set this to the job ID you're searching for
  const [interviewDate, setInterviewDate] = useState("");
  const [interviewTime, setInterviewTime] = useState("");

  useEffect(() => {
    const fetchApplicants = async () => {
      const applicantsCollection = collection(db, "Applications");
      const q = query(applicantsCollection, where("jobId", "==", jobId));
      const applicantSnapshot = await getDocs(q);
      const applicantList = applicantSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setApplicants(applicantList);
    };
    fetchApplicants();
  }, [jobId]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleScheduleInterview = async (applicantId, email) => {
    const applicantDocRef = doc(db, "Applications", applicantId);
    const recruiterId = "8r0Ugd00tQ3LxYxIc1pS"; // Adjust if needed
    const interviewDateTime = new Date(`${interviewDate}T${interviewTime}`);
    const meetingId = "123456789"; // Hardcoded meeting ID

    try {
      // Update the applicant's document to add the interview
      await updateDoc(applicantDocRef, {
        upcomingInterviews: arrayUnion({
          date: interviewDateTime,
          recruiterId,
          jobId,
          meetingId, // Add meeting ID
        }),
      });

      // Optionally, update the recruiter's document
      const recruiterDocRef = doc(db, "recruiterData", recruiterId);
      await updateDoc(recruiterDocRef, {
        upcomingInterviews: arrayUnion({
          applicantId,
          jobId,
          date: interviewDateTime,
          meetingId, // Add meeting ID
        }),
      });

      // Send email notification
      await sendEmailNotification(email, interviewDateTime);

      alert("Interview scheduled successfully!");
    } catch (error) {
      console.error("Error scheduling interview:", error);
      alert("Error scheduling interview. Please try again.");
    }
  };

  const sendEmailNotification = async (email, interviewDateTime) => {
    try {
      // Here, you would call a backend function or service to send the email.
      // For example, you might use Firebase Functions or an external service like SendGrid.
      // Replace this with your email-sending logic.
      console.log(
        `Sending email to ${email} with interview date ${interviewDateTime}`
      );
    } catch (error) {
      console.error("Error sending email notification:", error);
    }
  };

  const categorizedApplicants = classifyApplicants(applicants);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Applicants Dashboard</h2>

      <div className="flex gap-4 mb-6">
        <div
          className="flex-1 bg-blue-500 text-white p-4 rounded-lg shadow-lg cursor-pointer hover:bg-blue-600"
          onClick={() => handleCategoryClick("High")}
        >
          <h3 className="text-xl font-semibold">High</h3>
          <p className="text-lg">
            {categorizedApplicants.High.length} Applicants
          </p>
        </div>
        <div
          className="flex-1 bg-yellow-500 text-white p-4 rounded-lg shadow-lg cursor-pointer hover:bg-yellow-600"
          onClick={() => handleCategoryClick("Medium")}
        >
          <h3 className="text-xl font-semibold">Medium</h3>
          <p className="text-lg">
            {categorizedApplicants.Medium.length} Applicants
          </p>
        </div>
        <div
          className="flex-1 bg-red-500 text-white p-4 rounded-lg shadow-lg cursor-pointer hover:bg-red-600"
          onClick={() => handleCategoryClick("Low")}
        >
          <h3 className="text-xl font-semibold">Low</h3>
          <p className="text-lg">
            {categorizedApplicants.Low.length} Applicants
          </p>
        </div>
      </div>

      {selectedCategory && (
        <div>
          <h3 className="text-xl font-bold mb-4">
            {selectedCategory} Applicants
          </h3>
          {categorizedApplicants[selectedCategory].map((applicant) => (
            <div
              key={applicant.id}
              className="bg-gray-100 p-4 rounded-lg mb-4 shadow-md"
            >
              <p>
                <strong className="font-semibold">Name:</strong>{" "}
                {applicant.name}
              </p>
              <p>
                <strong className="font-semibold">Email:</strong>{" "}
                {applicant.email}
              </p>
              <p>
                <strong className="font-semibold">Resume:</strong>
                <a
                  href={applicant.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View Resume
                </a>
              </p>
              <div className="mt-4">
                <label className="block mb-2">Select Interview Date:</label>
                <input
                  type="date"
                  value={interviewDate}
                  onChange={(e) => setInterviewDate(e.target.value)}
                  className="border p-2 rounded-lg mb-2"
                />
                <label className="block mb-2">Select Interview Time:</label>
                <input
                  type="time"
                  value={interviewTime}
                  onChange={(e) => setInterviewTime(e.target.value)}
                  className="border p-2 rounded-lg"
                />
              </div>
              <button
                onClick={() =>
                  handleScheduleInterview(applicant.id, applicant.email)
                }
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
              >
                Schedule Interview
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BinningBoard;
