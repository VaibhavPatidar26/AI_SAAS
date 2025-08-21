import React from 'react'
import BodyCard from './BodyCard'
import { stepsData } from '../assets/assets'

const BodyHome = () => {
  return (
    <div className="flex flex-col justify-center items-center py-16 bg-gradient-to-b from-[#0f0f0f] via-[#111111] to-[#0f0f0f] relative overflow-hidden">

      {/* Blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-gray-500 via-gray-600 to-gray-800 opacity-20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-tr from-gray-600 via-gray-700 to-gray-900 opacity-20 blur-3xl rounded-full"></div>

      {/* Heading */}
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
          How it{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400">
            Works
          </span>
        </h1>
        <h6 className="mt-3 text-base md:text-lg text-gray-400">
          Transform words into stunning images effortlessly
        </h6>
      </div>

      {/* Steps Section */}
      <div className="flex flex-wrap justify-center gap-8 max-w-5xl px-6 animate-slide-up">
        {stepsData.map((item, index) => (
          <div
            className="animate-fade-in"
            style={{ animationDelay: `${index * 150}ms` }}
            key={index}
          >
            <BodyCard
              img={item.icon}
              title={item.title}
              description={item.description}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default BodyHome
