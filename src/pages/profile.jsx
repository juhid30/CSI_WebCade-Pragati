import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase.js"; // Ensure correct Firestore instance is imported

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch user data from Firestore
  const fetchUserData = async () => {
    try {
      const docRef = doc(db, "studentData", "fKDUga9FWQtsXwVGd67u"); // Reference to the specific document
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserData(docSnap.data()); // Extract the document data and set it in state
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching document:", error);
    } finally {
      setLoading(false); // Set loading to false once data is fetched
    }
  };

  useEffect(() => {
    fetchUserData(); // Fetch the user data when the component is mounted
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="text-center mt-10">No data found for this user.</div>
    );
  }
  console.log(userData.responseData);

  const { name, email, age, university, responseData } = userData;
  const { key_qualifications_and_experience, summary } = responseData;
  const { project_experience, technical_skills } =
    key_qualifications_and_experience;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-3xl font-bold text-center mb-8">User Profile</h1>

      {/* Displaying the user data */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <p className="text-lg font-semibold">Name:</p>
          <p className="text-gray-700">{name}</p>
        </div>
      </div>

      <div className="mt-8">
        <p className="text-lg font-semibold mb-2">Summary:</p>
        <p className="text-gray-600 leading-relaxed">{summary}</p>
      </div>

      {/* Displaying the project experience */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-indigo-600 mb-4">
          Project Experience
        </h2>
        <ul className="list-disc list-inside">
          {project_experience.map((project, index) => (
            <li key={index} className="text-gray-700 mb-2">
              {project}
            </li>
          ))}
        </ul>
      </div>

      {/* Displaying the technical skills */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-indigo-600 mb-4">
          Technical Skills
        </h2>
        <ul className="flex flex-wrap gap-2">
          {technical_skills.map((skill, index) => (
            <li
              key={index}
              className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium"
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
