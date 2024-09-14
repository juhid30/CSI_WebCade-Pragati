import { useState } from "react";
import reactLogo from "./assets/logo.svg";
import viteLogo from "/vite.svg";
import "./index.css"; // Import tailwind styles

import "./App.css";
import Login from "./components/Login";
import ListJobs from "./components/ListJobs";
import Navbar from "./components/Navbar";
import BinningPage from "./components/BinningPage";

function App() {
  return (
    <>
      <ListJobs />
      {/* <BinningPage /> */}
    </>
  );
}

export default App;
