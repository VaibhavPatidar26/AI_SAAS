import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import CometCardDemo from './OptionCard'
import Tools from './Tools'

const HeaderHome = ({ toolsref, ToolsScroll }) => {
 
  const { tokenChecker } = useContext(AppContext)

  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-6 pt-25 text-center relative overflow-hidden bg-gradient-to-b from-[#0f0f0f] via-[#111111] to-[#0f0f0f]">

      {/* Subtle blobs */}
      <div className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-br from-gray-500 via-gray-600 to-gray-800 opacity-20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-gradient-to-tr from-gray-600 via-gray-700 to-gray-900 opacity-20 rounded-full blur-3xl animate-pulse delay-150"></div>

      {/* Badge */}
      <div className="mb-6 animate-fade-in">
        <h1 className="inline-block text-sm md:text-base font-medium rounded-full px-6 py-2 bg-white/5 border border-white/10 shadow-sm tracking-wide uppercase text-gray-300">
          All-in-One AI Creativity Suite <span className="ml-1">🚀</span>
        </h1>
      </div>

      {/* Heading */}
      <div className="mb-6 animate-slide-up">
        <h2 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight text-white">
          Transform Your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400">
            Ideas
          </span>{" "}
          into Stunning{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400">
            AI Creations
          </span>
        </h2>
      </div>

      {/* Subtext */}
      <div className="max-w-2xl mb-10 text-gray-400 text-lg md:text-xl leading-relaxed animate-fade-in delay-200">
        <p>
          From image generation to background removal and image upscaling –
          experience the next level of AI-powered creativity in one place.
        </p>
      </div>

      {/* CTA Button */}
      <div className="animate-bounce-slow">
        <button
          onClick={ToolsScroll}
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-lg font-semibold rounded-full px-8 py-4 hover:scale-105 hover:shadow-xl transition-all duration-300"
        >
          Explore Tools✨
        </button>
      </div>

      {/* Secondary Tagline */}
      <div className="mt-8 text-gray-500 text-sm md:text-base animate-fade-in delay-300">
        No limits to your imagination – Generate. Remove. Upgrade.
      </div>

      {/* Cards */}
     <div className='w-7xl' ref={toolsref}>
      <Tools></Tools>
     </div>
    </div>
  )
}

export default HeaderHome
