import "./index.css"; // Import tailwind styles
import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "../firebase"; // Import Firebase auth

import "./App.css";
import Login from "./components/Login";
import Home from "./pages/home";
import ResumeUpload from "./components/ResumeUpload";
import ApplyForJob from "./components/ApplyForJob";
import DataCP from "./components/DataCP";
import Jobs from "./components/Jobs";
import ListJobs from "./components/ListJobs";

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // This listener checks if the user is already logged in (from a previous session)
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is logged in, so set the user state
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user)); // Optionally store in localStorage for any additional use
      } else {
        // User is logged out, navigate to login page
        navigate("/login");
        setUser(null);
        localStorage.removeItem("user"); // Clear local storage if needed
      }
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, [navigate]);

  return (
    <div className="bg-white min-h-[100vh]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/getCP" element={<DataCP />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/apply" element={<ApplyForJob />} />
        <Route
          path="/upload-resume"
          element={<ResumeUpload studentId={"fKDUga9FWQtsXwVGd67u"} />}
        />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/create-job" element={<ListJobs />} />
      </Routes>
    </div>
  );
}

export default App;
