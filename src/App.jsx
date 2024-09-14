import "./index.css"; // Import tailwind styles
import { Route, Routes } from "react-router-dom";

import "./App.css";
import Login from "./components/Login";

import Home from "./pages/home";
import ResumeUpload from "./components/ResumeUpload";
import DataCP from "./components/DataCP";
import Layout from "./components/layout";
import ApplyForJob from "./components/ApplyForJob";

function App() {
  return (
    <div className="bg-white min-h-[100vh]">
      <Routes>
        <Route path="/home" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/datacp" element={<Layout />}>
          <Route index element={<DataCP />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/apply" element={<ApplyForJob />} />
        <Route
          path="/upload-resume"
          element={<ResumeUpload studentId={"fKDUga9FWQtsXwVGd67u"} />}
        />
      </Routes>
    </div>
  );
}

export default App;
