import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./index.css"; // Import tailwind styles

import "./App.css";
import Login from "./components/Login";
import ListJobs from "./components/ListJobs";

function App() {
  return (
    <>
      <ListJobs />
    </>
  );
}

export default App;
