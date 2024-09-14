import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App.jsx";
import "./index.css";

import AnimCursor from "./anim/AnimCursor.jsx";
import theme from "../src/components/CodeEditor/theme.js";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <AnimCursor />
        <App />
      </BrowserRouter>
      <BrowserRouter />
    </ChakraProvider>
  </React.StrictMode>
);
