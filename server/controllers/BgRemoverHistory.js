const express = require("express")
const BgRemoverModel = require("../models/BgRemoverModel")


async function BgRemoveHistory(req,res){
try{
  const userId = req.userId || req.body

    if(!userId){
        return res.json({
            message:"You need to login",
            success:false

        })
    }

    let BgRemHist = await BgRemoverModel.find({userId:userId}).sort({GenerationDate:-1})

    return res.json({
        message:"History fetched",
        success:true,
        BgRemHist:BgRemHist
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

module.exports = BgRemoveHistory