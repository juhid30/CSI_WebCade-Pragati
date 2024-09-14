import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../src/components/CodeEditor/theme.js";
import AnimCursor from "./anim/AnimCursor.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <ChakraProvider theme={theme}>
        <App />
        <AnimCursor/>
      </ChakraProvider>
    </React.StrictMode>
);

