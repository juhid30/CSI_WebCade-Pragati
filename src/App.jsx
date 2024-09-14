import "./index.css"; // Import tailwind styles
import { Route, Routes } from "react-router-dom";

import "./App.css";
import Login from "./components/Login";

import Home from "./pages/home";
import ResumeUpload from "./components/ResumeUpload";
import ApplyForJob from "./components/ApplyForJob";
import DataCP from "./components/DataCP";
import Jobs from "./components/Jobs";
import ListJobs from "./components/ListJobs";

function App() {
  return (
    <div className="bg-white min-h-[100vh]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/getCP" element={<DataCP />} />
        <Route path="/login" element={<Login />} />
        <Route path="/apply" element={<ApplyForJob />} />
        <Route
          path="/upload-resume"
          element={<ResumeUpload studentId={"fKDUga9FWQtsXwVGd67u"} />}
        />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/create-job" element={<ListJobs/>} />
      </Routes>
    </div>
  );
}

export default App;
