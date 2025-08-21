import React, { useState, useEffect, useContext } from 'react'
import useImgGenHistory from '../hooks/useImgGenHistory'
import { AppContext } from '../context/AppContext'
import { FocusCards } from '../components/ui/focus-cards'
import { apiDeleteGenHistory } from '../api/history'
import BgRemCard from '../components/ui/BgRemCard'
import DownloadImage from '../utils/DownloadImage'
const ImageGenHistory = () => {
  const { Images, token, backendUrl } = useContext(AppContext)
  const getHistory = useImgGenHistory()

  const [History, setHistory] = useState([])
  const [loading, setLoading] = useState(true) // loading state

  useEffect(() => {
    async function arrayassigner() {
      setLoading(true) // start loading
      let HistoryArr = await getHistory()
      setHistory(HistoryArr)
      setLoading(false) // finished loading
    }
    arrayassigner()
  }, [Images])

  const carddata = History.map((item) => ({
    key: item._id,
    title: item.Imageprompt,
    src: item.ImageUrl
  }))

  async function handleDelete(cardId) {
    await apiDeleteGenHistory(token, cardId, backendUrl)
    setHistory((prev) => prev.filter((item) => item._id !== cardId))
  }
  function handleDownload(url) {
      DownloadImage(url)
    }

  // render logic
  if (loading) {
    return <p className="text-white font-bold text-3xl text-center py-10">Fetching history...</p>
  }

  if (!History.length) {
    return <p className="text-white font-bold text-3xl text-center py-10">No History present.</p>
  }

  // return (
  //   <div className="w-screen flex justify-center py-10">
  //     <FocusCards cardsdata={carddata} showActions={true} onDelete={handleDelete} />
  //   </div>
  // )
 return (
  <div className="px-6 py-10 w-full max-w-6xl mx-auto">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {History.map((card) => (
        <BgRemCard
          key={card._id}
          cardId={card._id}
          imageUrl={card.ImageUrl}
          prompt={card.Imageprompt}
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

export default ImageGenHistory
