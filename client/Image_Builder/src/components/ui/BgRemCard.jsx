import React, { useState, useRef, useEffect } from "react";
import { useImageZoom } from "../../hooks/useImageZoom";
import { Download, Trash, ZoomIn } from "lucide-react";

const BgRemCard = ({ imageUrl, onDownload, onDelete, cardId, genDate, prompt }) => {
  const { openZoom } = useImageZoom(); // ✅ lowercase
  const [showButtons, setShowButtons] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const cardRef = useRef();

  // detect mobile screen
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Hide buttons on desktop when clicking outside
  useEffect(() => {
    if (!isMobile) {
      const handleClickOutside = (e) => {
        if (cardRef.current && !cardRef.current.contains(e.target)) {
          setShowButtons(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isMobile]);

  const handleToggleButtons = () => {
    if (!isMobile) setShowButtons((prev) => !prev);
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => !isMobile && setShowButtons(true)}
      onMouseLeave={() => !isMobile && setShowButtons(false)}
      onClick={handleToggleButtons}
      className="relative w-full aspect-[9/12] rounded-lg overflow-hidden shadow-lg cursor-pointer transition-transform duration-300 hover:scale-105"
    >
      <img
        src={imageUrl}
        alt="Generated"
        className="w-full h-full object-cover transition-transform duration-300 bg-white"
        draggable={false}
      />

      {/* Date Tag */}
      <div
        className="absolute top-2 left-1/2 -translate-x-1/2 z-20
                   bg-black/60 text-white text-xs px-2 py-1 rounded-md shadow
                   select-text pointer-events-auto"
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
      >
        {genDate}
      </div>

      {/* Desktop hover overlay with icons */}
      {!isMobile && (
        <div
          className={`absolute inset-0 z-10 bg-black/50 flex flex-col justify-end py-6 px-4 transition-opacity duration-300 ${
            showButtons ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="text-white text-lg mb-3">
            <h2>{prompt}</h2>
          </div>
          <div className="flex gap-6 justify-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                openZoom(imageUrl); // ✅ works now
              }}
              className="text-white p-2 rounded-full hover:bg-white/20"
            >
              <ZoomIn size={22} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDownload(imageUrl);
              }}
              className="text-white p-2 rounded-full hover:bg-white/20"
            >
              <Download size={22} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(cardId);
              }}
              className="text-red-500 p-2 rounded-full hover:bg-red-500/20"
            >
              <Trash size={22} />
            </button>
          </div>
        </div>
      )}

      {/* Mobile → persistent icons (always visible) */}
      {isMobile && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex gap-6 bg-black/60 px-3 py-2 rounded-full">
          <button
            onClick={(e) => {
              e.stopPropagation();
              openZoom(imageUrl);
            }}
            className="text-white p-2 rounded-full hover:bg-white/20"
          >
            <ZoomIn size={22} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDownload(imageUrl);
            }}
            className="text-white p-2 rounded-full hover:bg-white/20"
          >
            <Download size={22} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(cardId);
            }}
            className="text-red-500 p-2 rounded-full hover:bg-red-500/20"
          >
            <Trash size={22} />
          </button>
        </div>
      )}
    </div>
  );
};

export default BgRemCard;
