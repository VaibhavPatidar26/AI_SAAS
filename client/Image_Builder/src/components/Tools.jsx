import React from 'react';
import CometCardDemo from './OptionCard';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import LockedToolCard from './ui/LockedCard';
const Tools = () => {
  const navigate = useNavigate();
const {token} = useContext(AppContext)
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-4">
        <CometCardDemo
          imgSrc="https://imgv3.fotor.com/images/side/Fotor-AI-image-generator-from-text-with-simple-prompt.jpg"
          Heading="Text to Image"
          onClick={() => {
            try{
              if(token){
              navigate('/imagegenerator');
              return
              }
              toast.error("You need to Login")
              navigate("/login")
            }
            catch(err){
              console.log(err)
              toast.error(err)
            }
            console.log('card clicked');
           
          }}
        />
        <CometCardDemo
          imgSrc="https://www.techsmith.com/wp-content/uploads/2024/09/camtasia_video-background-remover_hero.png"
          Heading="Background Remover"
          onClick={()=>{
            try{
              if(token){
                 navigate("/bgremover")
                 return
              }
             toast.error("You need to Login")
             navigate("/login")
            }
            catch(err){
              console.log(err)
              toast.error(err)
            }
            
          }}
        />
        <CometCardDemo
          imgSrc="https://vmake.ai/_next/image?url=https%3A%2F%2Fkapkap-common.stariidata.com%2Fmaterial%2F67f793d3360356948SxUqNtUfu3666.png&w=1200&q=85"
          Heading="Image Upgrader"
          onClick={()=>{
             try{
              if(token){
                 navigate("/imageupscaler")
                 return
              }
             toast.error("You need to Login")
             navigate("/login")
            }
            catch(err){
              console.log(err)
              toast.error(err)
            }
          }}
        />

          



      </div>


<div className="flex flex-col gap-10 md:flex-row justify-center items-center px-4 mt-6">
  <LockedToolCard
    imgSrc="https://cdn-icons-png.flaticon.com/512/4712/4712109.png"
    Heading="Replace Background"
  />
  <LockedToolCard
    imgSrc="https://cdn-icons-png.flaticon.com/512/2659/2659360.png"
    Heading="Object Remover"
  />
  <LockedToolCard
    imgSrc="https://cdn-icons-png.flaticon.com/512/1007/1007959.png"
    Heading="Remove Text"
  />
</div>

    </div>
  );
};

export default Tools;
