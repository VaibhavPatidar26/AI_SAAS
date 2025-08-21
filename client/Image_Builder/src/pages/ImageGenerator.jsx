import React, { useState, useContext, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import FocusCardsDemo from '../UI/ImageGenerator/ExampleCard'
import { DotBackgroundDemo } from '../components/ui/DotBackground'
import Tools from "../components/Tools"
import DownloadImage from '../utils/DownloadImage'
import ImageGenHistory from './ImageGenHIstory'
import SegmentedTabs from '../components/ui/segmentedTabs'
import { ImageZoomProvider,useImageZoom } from '../hooks/useImageZoom'

const ImageGenerator = () => {
  const { imageGenerator, Images, setImages, userhistory } = useContext(AppContext)
  const [Loading, SetLoading] = useState(false)
  const [alpha, setalpha] = useState("")
  const [activeTab, setactiveTab] = useState("examples")
  const {openZoom} = useImageZoom()
  async function ImageClickHandler() {
    try {
      if (!alpha.trim()) {
        return toast.error("⚠️ Please enter a prompt first!")
      }
      SetLoading(true)
      toast.info("✨ Generating your image...")

      let result = await imageGenerator(alpha)
      if (result) {
        setImages(result)
        localStorage.setItem("finalImage", result)
        //toast.success("✅ Image generated successfully!")
      }
      await userhistory()
      SetLoading(false)
    } catch (err) {
      console.log(err)
      toast.error("❌ Failed to generate image. Try again!")
      SetLoading(false)
    }
  }

  function handleDownload(img) {
    try {
      DownloadImage(img)
      toast.success("📥 Image downloaded!")
    } catch {
      toast.error("❌ Download failed")
    }
  }

  return (
    <>
      <div className='flex flex-col justify-center items-center min-h-screen px-6 p-50 text-center relative overflow-hidden bg-[#171717] '>
        <div>
          <h1 className='text-5xl text-white font-bold relative bottom-10'>TEXT TO IMAGE</h1>
          <h5 className='text-white py-5 relative bottom-10 font-bold'>
            A Leap Forward in AI Image Generation
          </h5>
        </div>

        {/* Prompt Form */}
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault()
            }}
          >
            <div className="flex items-center bg-[#20242c] rounded-2xl p-1 md:w-3xl">
              <input
                type="text"
                disabled={Loading}
                value={alpha}
                onChange={(e) => setalpha(e.target.value)}
                placeholder="Enter your prompt"
                className="flex-1 text-gray-400 placeholder-gray-500 rounded-2xl px-4 py-3 outline-none"
              />

              <button
                type="submit"
                onClick={ImageClickHandler}
                className="bg-[#1e3973] hover:bg-[#25468d] relative right-2 text-gray-300 font-medium px-6 py-2 rounded-xl"
                disabled={Loading}
              >
                {Loading ? "Generating..." : "Generate"}
              </button>
            </div>
          </form>
        </div>

        {/* Output */}
        <div>
          {Images ? (
            <div className='md:w-2xl flex flex-col justify-between items-center rounded-2xl p-5 relative top-5 gap-5'>
              <img className="object-contain rounded-2xl" src={Images} alt="Generated" onClick={()=>openZoom(Images)}/>
              <button
                onClick={() => handleDownload(Images)}
                type="button"
                className='bg-gradient-to-r from-cyan-500 to-teal-500 
                  text-white font-semibold 
                  px-5 py-2 rounded-xl 
                  shadow-md shadow-cyan-900/40 
                  hover:from-cyan-400 hover:to-teal-400 
                  hover:shadow-cyan-700/50 
                  transition-all duration-300 ease-in-out 
                  w-40'
              >
                Download
              </button>
            </div>
          ) : (
            <p className="text-gray-400 mt-5 font-medium">Your image will appear here</p>
          )}
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-6 my-8">
          <SegmentedTabs
            tabs={[
              { key: "examples", label: "EXAMPLES" },
              { key: "history", label: "YOUR HISTORY" },
            ]}
            value={activeTab}
            onChange={setactiveTab}
            activeStyle="light"
          />
        </div>

        <div className="w-screen flex justify-center py-10 ">
          {activeTab === "examples" ? (
            <FocusCardsDemo />
          ) : (
            <ImageGenHistory />
          )}
        </div>

        {/* More Tools */}
        <div className='w-6xl'>
          <DotBackgroundDemo>
            <h1 className='text-white font-bold text-5xl'>MORE TOOLS</h1>
            <Tools />
          </DotBackgroundDemo>
        </div>
      </div>
    </>
  )
}

export default ImageGenerator
