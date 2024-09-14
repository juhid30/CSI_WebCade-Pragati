import React, { useState, useEffect } from "react";
import { storage, db } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
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
    if (!resume || !studentDocId) return;

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

      if (response.status === 200) {
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
              console.log(response.data.details.profile);
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
      } else {
        console.error("Error uploading file:", response.statusText);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  useEffect(() => {
    // Fetch student document ID from localStorage
    const id = localStorage.getItem("studentDocId");
    if (id) setStudentDocId(id);
  }, []);

  return (
    <div className="h-[100%] overflow-hidden">
      <h2 className="text-xl font-semibold mb-4">Upload Your Resume</h2>
      <input type="file" onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        Upload
      </button>

      <h2 className="text-xl font-semibold mt-8 mb-4">Edit Your Details</h2>
      <form className="h-[60%] overflow-y-scroll scrollbar-hide">
        <label className="block mb-2">Name:</label>
        <input
          type="text"
          name="name"
          value={details.name}
          onChange={handleChange}
          className="border p-2 rounded mb-4 w-full"
        />

        <label className="block mb-2">GitHub:</label>
        <input
          type="text"
          name="github"
          value={details.github}
          onChange={handleChange}
          className="border p-2 rounded mb-4 w-full"
        />

        <label className="block mb-2">LinkedIn:</label>
        <input
          type="text"
          name="linkedin"
          value={details.linkedin}
          onChange={handleChange}
          className="border p-2 rounded mb-4 w-full"
        />

        <label className="block mb-2">Phone:</label>
        <input
          type="text"
          name="phone"
          value={details.phone}
          onChange={handleChange}
          className="border p-2 rounded mb-4 w-full"
        />

        <label className="block mb-2">Domain:</label>
        <input
          type="text"
          name="domain"
          value={details.domain}
          onChange={handleChange}
          className="border p-2 rounded mb-4 w-full"
        />

        <label className="block mb-2">Interests:</label>
        <select
          name="interests"
          multiple
          value={details.interests}
          onChange={handleInterestChange}
          className="border p-2 rounded mb-4 w-full"
        >
          {interestsOptions.map((interest) => (
            <option key={interest} value={interest}>
              {interest}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
};

export default ResumeUpload;
