"use client";
import React from "react";
import { CometCard } from "./comet-card";
import { Lock } from "lucide-react";

const LockedToolCard = ({ imgSrc, Heading }) => {
  return (
    <CometCard className="w-64 h-80">
      {/* Background Image */}
      <img
        src={imgSrc}
        alt={Heading}
        className="w-full h-full object-cover rounded-2xl opacity-50 blur-sm"
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-md rounded-2xl">
        {/* Lock in circle */}
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white/20 mb-3">
          <Lock size={28} className="text-white" />
        </div>

        {/* Text */}
        <p className="text-lg font-semibold text-white">Coming Soon</p>
        <p className="text-sm text-gray-300 mt-1">{Heading}</p>
      </div>
    </CometCard>
  );
};

export default LockedToolCard;
