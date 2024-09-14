import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App.jsx";
import "./index.css";

import AnimCursor from "./anim/AnimCursor.jsx";
import theme from "../src/components/CodeEditor/theme.js";
import { HMSRoomProvider } from "@100mslive/react-sdk";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <HMSRoomProvider>
          <AnimCursor />
          <App />
        </HMSRoomProvider>
      </BrowserRouter>
      <BrowserRouter />
    </ChakraProvider>
  </React.StrictMode>
);
