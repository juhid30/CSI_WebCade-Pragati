import React, { useState, useEffect } from "react";
import JoinForm from "./JoinForm";
import {
  selectIsConnectedToRoom,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";
import Message from "./Message";
import Conference from "./Conference";
import Footer from "./Footer";
import axios from "axios";
import "./Webcam.css";

function WebCam() {
  const [moves, setMoves] = useState([]); // Array to store unique moves
  const [error, setError] = useState(null);
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const hmsActions = useHMSActions();

  useEffect(() => {
    window.onunload = () => {
      if (isConnected) {
        hmsActions.leave();
      }
    };
  }, [hmsActions, isConnected]);

  return (
    <>
      {isConnected ? (
        <>
          <div className="meetuipage flex flex-row bg-gray-900">
            <div className="meetuipage flex flex-row">
              <div className="bablu flex flex-col">
                <Conference />

                <Footer />
              </div>
            </div>
          </div>
        </>
      ) : (
        <JoinForm />
      )}
      {/* <Message /> */}
    </>
  );
}

export default WebCam;
