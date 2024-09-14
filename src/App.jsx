import { useState } from "react";
import reactLogo from "./assets/logo.svg";
import viteLogo from "/vite.svg";
import "./index.css"; // Import tailwind styles

import "./App.css";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import CalendarC from "./components/Calendar";
import CodingPlatform from "./components/CodingPlatform";

function App() {
  return(
      <CodingPlatform />
  );
}

export default App;
