import YouTube from "react-youtube";
import "./TrailerModal.css";

interface TrailerModalProps {
  videoId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const TrailerModal = ({
  videoId,
  isOpen,
  onClose,
}: TrailerModalProps) => {
  if (!isOpen || !videoId) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}></button>

        <div className="modal-video-wrapper">
          <YouTube
            videoId={videoId}
            opts={{
              width: "100%",
              height: "600px",
              playerVars: { autoplay: 1 },
            }}
          />
        </div>
      </div>
    </div>
  );
};
