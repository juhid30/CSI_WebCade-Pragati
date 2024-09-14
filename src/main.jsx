import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import App from "./App.jsx";
import "./index.css";
import theme from "../src/components/CodeEditor/theme.js";
import AnimCursor from "./anim/AnimCursor";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter />
      <AnimCursor />
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
