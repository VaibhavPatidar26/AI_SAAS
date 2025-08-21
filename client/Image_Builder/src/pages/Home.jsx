import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'
import HeaderHome from '../components/HeaderHome'
import BodyHome from '../components/BodyHome'
import FooterHome from '../components/FooterHome'
import { useRef } from 'react'
const Home = () => {
const toolsref=useRef(null)
function ToolsScroll(){
toolsref.current.scrollIntoView({behavior:"smooth"})
}

  return (
    <>
    <HeaderHome toolsref={toolsref} ToolsScroll={ToolsScroll}></HeaderHome>
    <BodyHome></BodyHome>
    <FooterHome toolref={toolsref} ToolsScroll={ToolsScroll}></FooterHome>
    </>
  
  )
}

export default Home