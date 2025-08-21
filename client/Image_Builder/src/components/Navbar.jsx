import React, { useState, useContext, act, useEffect } from 'react';
import { assets } from '../assets/assets';
import { Link, Navigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Value } from '@radix-ui/react-select';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {


  const navigate = useNavigate()



  const { User, token, credit, handleLogout,isLogout,setIsLogout } = useContext(AppContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeState, setactiveState] = useState("")
  const displayuser = localStorage.getItem("user") || User

  useEffect(() => {
    if (activeState === "Image Generation") navigate("/imagegenerator");
    if (activeState === "Background Remover") navigate("/bgremover");
    if (activeState === "Image Upscaler") navigate("/imageupscaler");


  }, [activeState])

  return (

    <div className="w-full px-6 py-4 border-b border-gray-800 bg-[#171717] fixed z-50">

      {/* Logo */}
      <div className='max-w-7xl mx-auto align-middle px-6 flex items-center justify-between'>


        <div className="flex items-center space-x-2">
          <Link to="/">
            <img src={assets.logo_icon} alt="logo" className="h-8 w-auto" />
          </Link>
          <span className="text-xl font-semibold bg-gradient-to-r from-gray-100 via-gray-300 to-gray-400 bg-clip-text text-transparent">
            imagify
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Select Dropdown */}
          <Select value="" onValueChange={(prev) => {
            setactiveState(prev)
          }}>
            <SelectTrigger className="w-[180px] rounded-md border border-gray-700 bg-[#1a1a1c] px-3 py-2 text-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 transition">
              <SelectValue placeholder="Tools" />
            </SelectTrigger>

            <SelectContent className="bg-[#1a1a1c] border border-gray-700 shadow-lg rounded-md">
              <SelectItem className="px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white transition" value="Image Generation">
                Image Generation
              </SelectItem>
              <SelectItem className="px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white transition" value="Background Remover">
                Background Remover
              </SelectItem>
              <SelectItem className="px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white transition" value="Image Upscaler">
                Image Upscaler
              </SelectItem>
            </SelectContent>
          </Select>

          {token ? (
            <>
              {/* Credits */}
              <div className="flex items-center bg-[#1f1f21] rounded-full px-4 py-2 space-x-2 shadow-sm border border-gray-700">
                <div className="bg-gradient-to-tr from-gray-400 to-gray-200 text-black p-1 rounded-full">
                  <svg className="w-4 h-4" fill="black" viewBox="0 0 24 24">
                    <path d="M12 2L14.09 8.26L20 9.27L15.5 13.97L16.91 20L12 16.9L7.09 20L8.5 13.97L4 9.27L9.91 8.26L12 2Z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-300">
                  Credits left: {credit}
                </span>
              </div>

              {/* Username + Logout */}
              <div className="relative group inline-block">
                <button className="text-gray-300 font-medium hover:text-white transition">
                  Hi! {displayuser}
                </button>
                <div className="absolute left-0 mt-2 w-full opacity-0 scale-y-0 group-hover:opacity-100 group-hover:scale-y-100 transition-all duration-200 origin-top transform">
                  <button
                    onClick={handleLogout}
                    className="w-full bg-red-500 text-white px-4 py-2 rounded shadow-md hover:bg-red-600"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </>
          ) : (
            <Link to="/Login">
              <button className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 text-black text-sm font-medium px-6 py-2 rounded-full hover:opacity-90 transition cursor-pointer">
                Login
              </button>
            </Link>
          )}

          {/* Pricing */}
          <Link to="/BuyCredit">
            <button className="text-gray-400 text-sm font-medium hover:text-white transition cursor-pointer">
              Pricing
            </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-md border border-gray-700 hover:bg-gray-800"
          >
            <svg
              className="w-6 h-6 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-[#0e0e0f] border-t border-gray-800 shadow-md flex flex-col items-start px-6 py-4 space-y-4 md:hidden">
            {token ? (
              <>
                <div className="flex items-center bg-[#1f1f21] rounded-full px-4 py-2 space-x-2 shadow-sm border border-gray-700">
                  <div className="bg-gradient-to-tr from-gray-400 to-gray-200 text-black p-1 rounded-full">
                    <svg className="w-4 h-4" fill="black" viewBox="0 0 24 24">
                      <path d="M12 2L14.09 8.26L20 9.27L15.5 13.97L16.91 20L12 16.9L7.09 20L8.5 13.97L4 9.27L9.91 8.26L12 2Z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-300">
                    Credits left: {credit}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white w-full px-4 py-2 rounded shadow-md hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/Login" className="w-full">
                <button className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 text-black w-full text-sm font-medium px-6 py-2 rounded-full hover:opacity-90 transition">
                  Login
                </button>
              </Link>
            )}

            <Link to="/BuyCredit" className="w-full">
              <button className="text-gray-400 text-sm font-medium hover:text-white transition">
                Pricing
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
  ;

export default Navbar;
