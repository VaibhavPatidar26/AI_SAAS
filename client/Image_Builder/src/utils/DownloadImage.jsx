import React from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

 const DownloadImage = async(Images) => {




  
  const response =await fetch(Images,{mode:"cors"})
  const blob = await response.blob()
  const link = document.createElement("a")
  link.href=URL.createObjectURL(blob)
  link.download="Generated_img.png"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(link.href)

    }
  

export default DownloadImage