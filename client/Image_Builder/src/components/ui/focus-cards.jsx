"use client";;
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import DownloadImage from "../../utils/DownloadImage";

export const Card = React.memo(({ card, index, hovered, setHovered, showActions,onDelete }) => (
  <div
    onMouseEnter={() => setHovered(index)}
    onMouseLeave={() => setHovered(null)}
    className={cn(
      "rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden h-60 md:h-96 w-full transition-all duration-300 ease-out",
      hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
    )}
  >
    <img
      src={card.src}
      alt={card.title}
      className="object-cover absolute inset-0 w-full h-full"
    />

    <div
      className={cn(
        "absolute inset-0 bg-black/50 flex flex-col justify-end py-8 px-4 transition-opacity duration-300",
        hovered === index ? "opacity-100" : "opacity-0"
      )}
    >
      <div className="text-xl md:text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200">
        {card.title}
      </div>

      {/* Only render buttons if showActions is true */}
     {showActions && hovered === index && (
  <div className="mt-4 flex gap-4 justify-center">
    <button
      className="bg-red-700 hover:bg-red-600 text-white font-semibold px-5 py-2 rounded-lg shadow-md shadow-black/40 transition-all duration-300 ease-in-out"
      onClick={()=>{return onDelete(card)
      }}
    >
      Delete
    </button>
    <button
      className="bg-neutral-800 hover:bg-neutral-700 text-gray-200 font-semibold px-5 py-2 rounded-lg shadow-md shadow-black/40 transition-all duration-300 ease-in-out"
      onClick={() => DownloadImage(card.src)}
    >
      Download
    </button>
  </div>
)}

    </div>
  </div>
));


Card.displayName = "Card";

export function FocusCards({ cardsdata, showActions = false,onDelete }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto md:px-8 w-full">
      {cardsdata.map((card, index) => (
        <Card 
          key={card.key}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
          showActions={showActions} // pass the prop
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
