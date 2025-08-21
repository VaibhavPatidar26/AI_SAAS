import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Result from './pages/ImageGenerator'
import Home from './pages/Home'
import BuyCredit from './pages/BuyCredit'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import ProtectedRoute from './utils/ProtectedRoute'
import BgRemover from './pages/BgRemover'
import ImageGenerator from './pages/ImageGenerator'
import FooterLast from './components/FooterLast'
import ImgUpscaler from './pages/ImgUpscaler'

function App() {
  return (
    <>
    <Navbar></Navbar>
   
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path='/imagegenerator' element={
        <ProtectedRoute>
           <ImageGenerator></ImageGenerator>
        </ProtectedRoute>
       }/>
      <Route path="/bgremover" element={
        <ProtectedRoute>
           <BgRemover></BgRemover>
        </ProtectedRoute>
       }/>
       <Route path='/imageupscaler' element={
      <ProtectedRoute>
         <ImgUpscaler></ImgUpscaler>
      </ProtectedRoute>  
     }></Route>
      <Route path="/buycredit" element={<BuyCredit></BuyCredit>}/>
      <Route path="/Login" element={<Login></Login>}/>
     </Routes>
     <FooterLast/>
    </>
  )
}

export default App