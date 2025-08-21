import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react'; // Optional icon (or use ↓↑ Unicode)

const Dropdown = () => {
  const [explore, setexplore] = useState(false);

  function exploreClickHandler() {
    setexplore((previous) => !previous);
  }

  return (
    <div className="relative inline-block text-left w-full max-w-xs">
      <button
        onClick={exploreClickHandler}
        className="flex items-center justify-between w-full px-5 py-3 text-sm font-semibold text-gray-800 bg-white border border-gray-300 rounded-xl shadow-sm hover:bg-gray-50 transition duration-200"
      >
        <span className='flex flex-col text-center align-middle items-center'>Explore More</span>
        <span className={`transition-transform duration-300 ${explore ? 'rotate-180' : ''}`}>
          {explore ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </span>
      </button>

      <div
        className={`absolute left-0 w-full mt-2 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-300 ease-out z-50 
        ${explore ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
      >
        <div className="py-2">
          <a
            href="#"
            className="block px-5 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
          >
            Dashboard
          </a>
          <a
            href="#"
            className="block px-5 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
          >
            Settings
          </a>
          <a
            href="#"
            className="block px-5 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
          >
            Help Center
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;

