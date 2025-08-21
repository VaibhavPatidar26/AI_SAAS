import React, { useContext } from 'react'
import FooterCard from './FooterCard'
import { assets, testimonialsData } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import FooterLast from './FooterLast'
import { px } from 'motion/react'
import { useRef } from 'react'


const FooterHome = ({ToolsScroll,toolref}) => {
  const { tokenChecker } = useContext(AppContext)

  return (
    <div className="flex flex-col w-full items-center justify-center px-6 pt-10 py-16 bg-gradient-to-b from-[#0f0f0f] via-[#111111] to-[#0f0f0f] relative overflow-hidden">

      {/* Blobs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-gray-500 via-gray-600 to-gray-800 opacity-20 blur-3xl rounded-full"></div>
      {/* <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-tr from-gray-600 via-gray-700 to-gray-900 opacity-20 blur-3xl rounded-full"></div> */}

      {/* Heading */}
      <div className="mb-3 animate-fade-in">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Customer{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400">
            Testimonials
          </span>
        </h1>
      </div>

      {/* Subheading */}
      <div className="mb-10 animate-fade-in delay-150">
        <h6 className="text-base md:text-lg text-gray-400">What our users are saying</h6>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-6xl px-4 animate-slide-up">
        {testimonialsData.map((item, index) => (
          <FooterCard
            key={index}
            image={item.image}
            role={item.role}
            stars={[...Array(item.stars)].map((_, i) => (
              <img key={i} src={assets.rating_star} className="w-5 h-5" />
            ))}
            text={item.text}
          />
        ))}
      </div>

      {/* CTA */}
      <div className="mt-16 text-center animate-fade-in delay-200">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
          See the{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400">
            Magic
          </span>
          , Try Now
        </h1>
        <button
          onClick={ToolsScroll}
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-lg font-semibold rounded-full px-5 py-3 hover:scale-105 hover:shadow-xl transition-all duration-300"
        >
          Explore Tools✨
        </button>
      </div>
     
    {/* <FooterLast></FooterLast> */}


    </div>
  )
}

export default FooterHome
