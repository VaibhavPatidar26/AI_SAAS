const express= require("express")
const axios = require("axios")
const userModel = require("../models/userModel")
const ImgGenHistModel = require("../models/ImgGenHistModel")
const cloudinary = require("cloudinary").v2


async function PollinationImgGen(req,res){
    try{

    
    const {userId,prompt} = req.body

    if(!prompt||!userId){
        try{
            return res.json({
            messsage:"userId or prompt not found",
            success:false
        }) 
        }
       catch(err){
        console.log(err)
        return res.json({
            message:"internal server error",
            success:false
        })
       }
    }

    let user = await userModel.findById(userId)
    if(user.credit<=0){
        return res.json({
            message:"No Credit Left",
            success:false
        })
    }
    else{

       const encoded = encodeURIComponent(prompt);
  const url = `https://image.pollinations.ai/prompt/${encoded}?width=512&height=512&nologo=true`;

  const response = await axios.get(url,{responseType:"arraybuffer"})

  const base64Image = Buffer.from(response.data,"binary").toString("base64")
  const resultImage = `data:image/png;base64,${base64Image}`;
const uploadResult = await cloudinary.uploader.upload(
  resultImage, 
  { folder: "user_images" }
);
const finalImage= uploadResult.secure_url
console.log(finalImage);

user.credit=user.credit-1

await ImgGenHistModel.create({
      userId:userId,
  Imageprompt:prompt,
  ImageUrl:finalImage
})



await user.save()

return res.json({
    message:"image generated successfully",
    success:true,
    credit:user.credit,
    finalImage
})

    }
    }
    catch(err){
        console.log(err)
        return res.json({
            message:"internal server error",
            success:false
        })
    }
}

module.exports = PollinationImgGen