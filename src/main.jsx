import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../src/components/CodeEditor/theme.js";


createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter/>
      <AnimCursor/>
        <App />
      </ChakraProvider>
  </React.StrictMode>
);
