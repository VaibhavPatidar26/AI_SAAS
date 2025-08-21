import React, { useEffect, useState, useContext } from 'react'
import BgRemCard from "../components/ui/BgRemCard"
import DownloadImage from '../utils/DownloadImage';
import { apiDeleteBgRemHistory, apiDeleteImgUpsHistory } from '../api/history';
import { AppContext } from '../context/AppContext';
import axios from 'axios';

const ImgUpsHistory = () => {
  const [History, setHistory] = useState([])
  const [loading, setLoading] = useState(true)   // ✅ track loading state
  const { token, backendUrl,upscaleImg } = useContext(AppContext)

  async function fetchBgHistory() {
    try {
      let response = await axios.get(
        `${backendUrl}api/history/ImgupsHist`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      console.log(response)
      return response.data.ImgUpscaleHist
    } catch (error) {
      console.error("Error fetching history:", error)
      return []
    }
  }

  useEffect(() => {
    async function arrayassigner() {
      setLoading(true) // start loading
      let HistoryArr = await fetchBgHistory()
      console.log(HistoryArr)
      setHistory(HistoryArr)

      setLoading(false) // stop loading
      
    }
    arrayassigner()
  }, [upscaleImg])

  async function handleDelete(cardId) {
    await apiDeleteImgUpsHistory(token, cardId, backendUrl)
    setHistory((prev) => prev.filter((item) => item._id !== cardId))
  }

  function handleDownload(url) {
    DownloadImage(url)
  }

  // ✅ Conditional UI
  if (loading) {
    return (
      <p className="text-white font-bold text-3xl text-center py-10">
        Fetching history...
      </p>
    )
  }

  if (!History.length) {
    return (
      <p className="text-white font-bold text-3xl text-center py-10">
        No history available
      </p>
    )
  }

 return (
  <div className="px-6 py-10 w-full max-w-6xl mx-auto">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {History.map((card) => (
        <BgRemCard
          key={card._id}
          cardId={card._id}
          imageUrl={card.UpscaledImg}
          onDelete={handleDelete}
          onDownload={handleDownload}
         genDate={new Date(card.GenerationDate).toLocaleString("en-IN", {
  timeZone: "Asia/Kolkata",
  year: "numeric",
  month: "short",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
})}

        />
      ))}
    </div>
  </div>
)
}

export default ImgUpsHistory
