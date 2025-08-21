const express = require("express")
const ImgUpscalarModel = require("../models/ImgUpscalarModel")


async function ImgUpscaleHist(req,res){
try{
  const userId = req.userId || req.body

    if(!userId){
        return res.json({
            message:"You need to login",
            success:false

        })
    }

    let ImgUpscaleHist = await ImgUpscalarModel.find({userId:userId}).sort({GenerationDate:-1})

    return res.json({
        message:"History fetched",
        success:true,
        ImgUpscaleHist:ImgUpscaleHist
    })
}

  
    catch(err){
        console.log(err)
        return res.json({
            message:"Internal serval error",
            success:false
        })
    }
}

module.exports = ImgUpscaleHist