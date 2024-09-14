import React, { useState, useEffect } from "react";
import { storage, db } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import axios from "axios";

const ResumeUpload = ({ studentId }) => {
  const [resume, setResume] = useState(null);
  const [downloadURL, setDownloadURL] = useState("");
  const [studentDocId, setStudentDocId] = useState("");

  // Fetch student document ID from Firestore
  useEffect(() => {
    const fetchStudentData = async () => {
      if (studentId) {
        try {
          const q = collection(db, "studentData");
          const querySnapshot = await getDocs(q);

          let documentFound = false;

          querySnapshot.forEach((doc) => {
            if (doc.id === studentId) {
              setStudentDocId(doc.id);
              documentFound = true;
            }
          });

          if (!documentFound) {
            console.error("No document found with the given ID!");
          }
        } catch (error) {
          console.error("Error fetching documents:", error);
        }
      }
    };

    fetchStudentData();
  }, [studentId]);

  // Handle file selection
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setResume(e.target.files[0]);
    }
  };

  // Upload resume to Firebase Storage and update Firestore
  const handleUpload = async () => {
    if (!resume || !studentDocId) return;

    try {
      // First, hit the 5000 port to '/upload'
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
        console.log("Response from /upload:", response.data);

        // Proceed to upload the resume to Firebase Storage
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
              console.log("File available at", url);

              // Update the student's document with the resume URL and response from API
              const studentDocRef = doc(db, "studentData", studentDocId);
              await updateDoc(studentDocRef, {
                resume: url,
                responseData: response.data,
              });

              console.log(
                "Student document updated with resume URL and API response."
              );
            } catch (error) {
              console.error("Error updating document:", error);
            }
          }
        );
      } else {
        console.error("Failed to hit /upload endpoint");
      }
    } catch (error) {
      console.error("Error hitting /upload endpoint:", error);
    }
  };
  return (
    <div>
      <h2>Upload Your Resume</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!studentDocId}>
        Upload
      </button>

      {downloadURL && (
        <div>
          <p>Resume Uploaded Successfully!</p>
          <a href={downloadURL} target="_blank" rel="noopener noreferrer">
            View Resume
          </a>
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;
