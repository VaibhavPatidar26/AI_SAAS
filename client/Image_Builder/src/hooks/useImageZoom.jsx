// src/hooks/useImageZoom.js
import { useContext, createContext, useState } from "react";

const ImageZoomContext = createContext();

export const ImageZoomProvider = ({ children }) => {
  const [zoomSrc, setZoomSrc] = useState(null);

  const openZoom = (src) => setZoomSrc(src);
  const closeZoom = () => setZoomSrc(null);

  return (
    <ImageZoomContext.Provider value={{ openZoom }}>
      {children}

      {/* Zoom Modal */}
      {zoomSrc && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={closeZoom}
        >
          <img
            src={zoomSrc}
            alt="Zoomed"
            className="max-w-[90%] max-h-[90%] rounded-lg shadow-lg transition-transform duration-300"
          />
        </div>
      )}
    </ImageZoomContext.Provider>
  );
};

export const useImageZoom = () => useContext(ImageZoomContext);
