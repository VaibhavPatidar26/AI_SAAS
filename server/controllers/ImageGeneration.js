const express=require("express")
const app=express()
const userModel = require("../models/userModel")
const ImgGenHistModel = require("../models/ImgGenHistModel")
const form_data = require("form-data")
const { default: axios } = require("axios")
const cloudinary = require("../config/clodinary")


async function ImageGeneration(req,res){
            const {userId,prompt} = req.body

    try{

    if(!prompt || !userId){
      return  res.json({
            message:"prompt or userId needed",
            success:false
        })
    }
   
    let User = await userModel.findById(userId)


    if(User.credit <= 0){
     return res.status(403).json({
            message:"No Credit Left",
            success:false
        })
    } 

else{


    var form = new form_data()
    form.append("prompt",prompt)

    const data = await axios.post("https://clipdrop-api.co/text-to-image/v1",form,{
       headers: {
     'x-api-key': process.env.CLIPDROP_API_KEY,},
      responseType:"arraybuffer"
  
})


const base64Image=Buffer.from(data.data,"binary").toString("base64")
const resultImage = `data:image/png;base64,${base64Image}`


const uploadResult = await cloudinary.uploader.upload(
  resultImage, 
  { folder: "user_images" }
);
const finalImage = uploadResult.secure_url;
console.log(finalImage);


User.credit = (User.credit || 0) - 1;

// Initialize history if it doesn't exist
await ImgGenHistModel.create({
  userId:userId,
  Imageprompt:prompt,
  ImageUrl:finalImage
})




await User.save();

return res.json({
    message:"Image Generated",
    success:true,
    credit:User.credit,
    finalImage,
   
})
}
}
catch(error){
    console.log(error)
   return res.json({
        message:"something went wrong",
        success:false,
    })
}
}

module.exports=ImageGeneration