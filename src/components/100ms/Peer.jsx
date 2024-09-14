import { useVideo } from "@100mslive/react-sdk";
import "./Peer.css";

function Peer({ peer }) {
  const { videoRef } = useVideo({
    trackId: peer.videoTrack,
  });
  return (
    <div className="peer-container">
      <video
        ref={videoRef}
        className={`peer-video ${peer.isLocal ? "local" : ""}`}
        autoPlay
        muted
        playsInline
      />
      <div className="peer-overlay">
        <div className="peer-name">
          {/* {peer.name} {peer.isLocal ? "You" : ""} */}
        </div>
      </div>
    </div>
  );
}

export default Peer;
