import React from "react";

const FooterLast = () => {
  return (
    <div className="bg-[#0e0e0e]">
      {/* Divider */}
      <div className="border-t border-[#8b8585] w-full mb-6"></div>

      {/* Footer Content */}
<div className="flex flex-col md:flex-row items-center md:items-center justify-center md:justify-evenly w-full gap-8 md:gap-0 px-6 py-6 md:-translate-y-10 md:h-50">
        {/* Brand Section */}
        <div className="text-white text-center md:text-left">
          <h1 className="font-semibold text-[#898d8d] mb-2">Quick Ai</h1>
          <ul className="space-y-2">
            <li className="text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer">
              Tools
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="text-white text-center md:text-left">
          <h1 className="font-semibold text-[#898d8d] mb-2">Contact us</h1>
          <ul className="space-y-2">
            <li className="text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer break-all">
              support@example.com
            </li>
          </ul>
        </div>

        {/* Social Section */}
        <div className="text-white text-center md:text-left">
          <h1 className="font-semibold text-[#898d8d] mb-2">Social</h1>
          <ul className="space-y-2">
            <li className="text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer">
             <a href="https://github.com/VaibhavPatidar26" target="_blank">Github </a> 
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FooterLast;
