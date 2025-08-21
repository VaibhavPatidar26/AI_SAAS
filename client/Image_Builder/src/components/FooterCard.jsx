import React from 'react'

const FooterCard = ({ image, name, role, stars, text }) => {
  return (
    <div className="bg-[#111111] rounded-2xl p-6 max-w-sm w-full text-center shadow-md border border-gray-800 hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out">
      
      {/* Avatar */}
      <div>
        <img
          src={image}
          alt={name}
          className="w-20 h-20 mx-auto rounded-full mb-4 object-cover border-2 border-gray-700 shadow-sm"
        />
      </div>

      {/* Name */}
      <div className="text-lg font-semibold text-white mb-1">{name}</div>

      {/* Role */}
      <div className="text-sm text-gray-400 mb-3">{role}</div>

      {/* Stars */}
      <div className="flex justify-center gap-1 mb-4">
        {stars}
      </div>

      {/* Testimonial */}
      <div className="text-gray-300 text-base leading-relaxed">{text}</div>
    </div>
  )
}

export default FooterCard
