import React, { useState, useEffect } from "react";
import { storage, db } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import axios from "axios";
import "../App.css";

const interestsOptions = [
  "Web Development",
  "Machine Learning",
  "UI/UX Design",
  "Data Science",
  "Cloud Computing",
];

const ResumeUpload = ({ onResumeUpload }) => {
  const [resume, setResume] = useState(null);
  const [downloadURL, setDownloadURL] = useState("");
  const [studentDocId, setStudentDocId] = useState("");
  const [details, setDetails] = useState({
    name: "",
    github: "",
    linkedin: "",
    phone: "",
    domain: "",
    interests: [],
    codechef: "",
    leetcode: "",
  });

  // Handle file selection
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setResume(e.target.files[0]);
    }
  };

  // Handle form changes
  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  // Handle interest changes
  const handleInterestChange = (e) => {
    const selectedInterests = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setDetails({ ...details, interests: selectedInterests });
  };

  // Upload resume to Firebase Storage and update Firestore
  const handleUpload = async () => {
    if (!resume) return;

    try {
      const formData = new FormData();
      formData.append("file", resume);

      const response = await axios.post(
        "http://localhost:5000/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data && response.data.details) {
        const resumeEvaluation = response.data.details.profile;
        setDetails({
          ...details,
          name: resumeEvaluation.name || "",
          phone: resumeEvaluation.contact_no || "",
          linkedin: resumeEvaluation.linkedin_link || "",
        });
      }

      const storageRef = ref(storage, `resumes/${studentDocId}.pdf`);
      const uploadTask = uploadBytesResumable(storageRef, resume);

      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          console.error("Upload failed:", error);
        },
        async () => {
          try {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            setDownloadURL(url);

            const studentDocRef = doc(db, "studentData", studentDocId);
            await updateDoc(studentDocRef, {
              resume: url,
              responseData: response.data.response.resume_evaluation,
            });

            alert("Resume uploaded successfully!");
          } catch (error) {
            console.error("Error uploading resume:", error);
          }
        }
      );
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  // Handle form submit to update Firestore
  const handleSubmit = async (e) => {
    e.preventDefault();

    const studentDocRef = doc(db, "studentData", studentDocId);
    try {
      await updateDoc(studentDocRef, {
        name: details.name,
        github: details.github,
        linkedin: details.linkedin,
        phone: details.phone,
        domain: details.domain,
        interests: details.interests,
        codechef: details.codechef,
        leetcode: details.leetcode,
      });

      alert("Details updated successfully!");
    } catch (error) {
      console.error("Error updating details:", error);
    }
  };

  useEffect(() => {
    // Fetch student document ID from localStorage
    const id = localStorage.getItem("studentDocId");
    if (id) setStudentDocId(id);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 p-6">
      {/* Upload Resume Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Upload Your Resume
        </h2>
        <div className="border-dashed border-2 border-blue-500 p-6 rounded-lg">
          <input
            type="file"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
        <button
          onClick={handleUpload}
          className="mt-4 w-full p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300"
        >
          Upload Resume
        </button>
      </div>

      {/* Edit Details Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Edit Your Details
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name:
            </label>
            <input
              type="text"
              name="name"
              value={details.name}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              GitHub:
            </label>
            <input
              type="text"
              name="github"
              value={details.github}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              LinkedIn:
            </label>
            <input
              type="text"
              name="linkedin"
              value={details.linkedin}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone:
            </label>
            <input
              type="text"
              name="phone"
              value={details.phone}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Domain:
            </label>
            <input
              type="text"
              name="domain"
              value={details.domain}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Interests:
            </label>
            <select
              name="interests"
              multiple
              value={details.interests}
              onChange={handleInterestChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              {interestsOptions.map((interest) => (
                <option key={interest} value={interest}>
                  {interest}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              CodeChef Username:
            </label>
            <input
              type="text"
              name="codechef"
              value={details.codechef}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              LeetCode Username:
            </label>
            <input
              type="text"
              name="leetcode"
              value={details.leetcode}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full p-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all duration-300"
          >
            Save Details
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResumeUpload;
