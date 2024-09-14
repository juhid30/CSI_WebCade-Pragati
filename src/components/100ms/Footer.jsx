import { useAVToggle } from "@100mslive/react-sdk";
import {
  useHMSActions,
  useHMSStore,
  selectIsConnectedToRoom,
} from "@100mslive/react-sdk";
import "./Footer.css";

function Footer() {
  const { isLocalAudioEnabled, isLocalVideoEnabled, toggleAudio, toggleVideo } =
    useAVToggle();
  const hmsActions = useHMSActions();
  const isConnected = useHMSStore(selectIsConnectedToRoom);

  const handleLeaveRoom = () => {
    if (isConnected) {
      hmsActions.leave();
    }
  };

  return (
    <div className="footer-container">
      <div className="control-bar flex">
        {isConnected && (
          <button onClick={handleLeaveRoom} className="btn-control btn-danger">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-log-out"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </button>
        )}
        <button className="btn-control" onClick={toggleAudio}>
          {isLocalAudioEnabled ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 14c1.656 0 3-1.344 3-3V7a3 3 0 0 0-6 0v4c0 1.656 1.344 3 3 3z"></path>
              <path d="M19 10v2c0 3.866-3.134 7-7 7s-7-3.134-7-7v-2"></path>
              <line x1="12" y1="19" x2="12" y2="23"></line>
              <line x1="8" y1="23" x2="16" y2="23"></line>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="1" y1="1" x2="23" y2="23"></line>
              <path d="M9 9v6a3 3 0 0 0 3 3c.65 0 1.25-.15 1.78-.42"></path>
              <path d="M19 10v2c0 3.866-3.134 7-7 7-.65 0-1.25-.15-1.78-.42"></path>
              <line x1="12" y1="19" x2="12" y2="23"></line>
              <line x1="8" y1="23" x2="16" y2="23"></line>
            </svg>
          )}
        </button>
        <button className="btn-control" onClick={toggleVideo}>
          {isLocalVideoEnabled ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M23 7l-7 5 7 5V7z"></path>
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="1" y1="1" x2="23" y2="23"></line>
              <path d="M21 15V9a2 2 0 0 0-2-2H7c-.596 0-1.136.26-1.49.68"></path>
              <path d="M3 3v18"></path>
              <path d="M7 7h10v10H7V7z"></path>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

export default Footer;
