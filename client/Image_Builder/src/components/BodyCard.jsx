import React from 'react';

const BodyCard = ({ img, title, description }) => {
  return (
    <div className="flex items-center gap-4 bg-[#111111] px-6 py-4 rounded-2xl shadow-md w-full max-w-lg border border-gray-800 hover:shadow-lg hover:scale-105 transition-all duration-300">
      {/* Icon */}
      <div className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full shrink-0">
        <img src={img} alt={title} className="w-5 h-5 object-contain" />
      </div>

      {/* Text */}
      <div>
        <h2 className="text-base font-semibold text-white">{title}</h2>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
    </div>
  );
};

export default BodyCard;
