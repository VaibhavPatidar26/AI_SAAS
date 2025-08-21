import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { FiUpload } from "react-icons/fi";
import { Loader2 } from "lucide-react";
import CompareDemo from "../UI/ImageGenerator/Compare";
import DotBackgroundDemo from "../components/ui/DotBackground";
import Tools from "../components/Tools";
import DownloadImage from "../utils/DownloadImage";
import SegmentedTabs from "../components/ui/segmentedTabs";
import BgRemHistory from "./BgRemHistory";
import { toast } from "react-toastify";
import { useImageZoom } from "../hooks/useImageZoom";

const BgRemover = () => {
  const { openZoom } = useImageZoom();
  const [loading, setLoading] = useState(false);
  const { backendUrl, token, Image, setImage } = useContext(AppContext);
  const [file, setFile] = useState(null);
  const [activeTab, setactiveTab] = useState("example");

  // Save processed image to localStorage
  useEffect(() => {
    if (Image) {
      localStorage.setItem("final_bg_image", Image);
    }
  }, [Image]);

  useEffect(() => {
    const savedImage = localStorage.getItem("final_bg_image");
    if (savedImage) {
      setImage(savedImage);
    }
  }, []);

  // Submit handler
  async function submitHandler(e) {
    e.preventDefault();
    if (!file) {
      toast.error("⚠️ Please select a file first!");
      return;
    }

    setLoading(true);
    const form = new FormData();
    form.append("file", file);

    try {
      const { data } = await axios.post(backendUrl + "api/users/upload", form, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {
        setImage(data.finalImage);
        toast.success("✅ Background removed successfully!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("🚨 Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-6 p-50 text-center relative overflow-hidden bg-[#171717]">

      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl text-white font-bold relative bottom-10">
          REMOVE BACKGROUND
        </h1>
        <p className="text-gray-400 mt-2 font-bold relative bottom-8">
          Upload an image and remove its background in 1 click.
        </p>
      </div>

      {/* Upload + Preview Section (mirror of ImgUpscaler) */}
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-8 items-center">
        <form
          onSubmit={submitHandler}
          className="w-full flex flex-col items-center gap-6"
        >
          {file ? (
            <div className="w-full flex flex-col md:flex-row gap-6">
              {/* Upload shrinks (Preview) */}
              <div className="w-full md:w-1/3">
                <div className="relative w-full aspect-[3/4] bg-neutral-900 rounded-xl border-2 border-dashed border-gray-500 flex items-center justify-center overflow-hidden">
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Preview"
                    className="object-contain w-full h-full"
                  />
                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setFile(null);
                      toast.info("🗑️ File removed");
                    }}
                    className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm shadow-md"
                  >
                    Remove
                  </button>
                </div>
                {/* Process Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`mt-4 w-full px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 text-base transition ${
                    loading
                      ? "bg-gray-600 cursor-not-allowed text-white"
                      : "bg-blue-600 hover:bg-blue-500 text-white shadow-md"
                  }`}
                >
                  {loading && <Loader2 className="animate-spin w-5 h-5" />}
                  {loading ? "Processing..." : "Remove Background"}
                </button>
              </div>

              {/* Output beside it */}
              <div className="w-full md:w-2/3 aspect-[21/9] bg-neutral-900 rounded-xl border-2 border-dashed border-gray-500 flex items-center justify-center relative overflow-hidden">
                {Image ? (
                  <>
                    <img
                      src={Image}
                      alt="Processed"
                      className="object-contain w-full h-full bg-white"
                      onClick={() => openZoom(Image)}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        DownloadImage(Image);
                        toast.success("📥 Image downloaded!");
                      }}
                      className="absolute bottom-4 right-4 bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg text-sm shadow-md"
                    >
                      Download
                    </button>
                  </>
                ) : (
                  <h1 className="font-semibold text-lg sm:text-2xl text-gray-400 text-center">
                    Your Image Will Appear Here
                  </h1>
                )}
              </div>
            </div>
          ) : (
            // Upload full width when no file
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center justify-center w-full max-w-3xl aspect-[4/1] rounded-xl border-2 border-dashed border-white bg-blue-600 cursor-pointer hover:bg-blue-500 transition"
            >
              <FiUpload className="text-white text-5xl mb-3" />
              <p className="text-white font-medium">
                Click, paste, or drop an image here
              </p>
              <input
                id="file-upload"
                type="file"
                name="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                  toast.info("📂 File selected successfully");
                }}
              />
            </label>
          )}
        </form>
      </div>

      {/* Tabs */}
      <div className="font-bold text-5xl p-4 text-white flex justify-center">
        <SegmentedTabs
          tabs={[
            { key: "example", label: "EXAMPLE" },
            { key: "history", label: "YOUR HISTORY" },
          ]}
          value={activeTab}
          onChange={setactiveTab}
          activeStyle="light"
        />
      </div>

      <div className="w-full max-w-6xl mx-auto p-5 flex justify-center">
        {activeTab === "example" ? (
          <DotBackgroundDemo>
            <CompareDemo />
          </DotBackgroundDemo>
        ) : (
          <BgRemHistory />
        )}
      </div>

      {/* Tools */}
      <div className="w-6xl">
        <h1 className="font-bold text-5xl text-white">TOOLS</h1>
        <Tools />
      </div>
    </div>
  );
};

export default BgRemover;
