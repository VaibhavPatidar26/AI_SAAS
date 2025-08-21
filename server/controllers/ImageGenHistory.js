const express = require("express")
const app = express()
const userModel = require("../models/userModel")
const axios = require("axios")
const mongoose = require("mongoose")
const ImgGenHistModel = require("../models/ImgGenHistModel")

async function ImageGenHistory(req,res){
     const {userId} = req.body
try{
    if (userId) {
        let user = await userModel.findById(userId);
        console.log("from request",userId,typeof userId)
        if (!user) {
            return res.json({
                success: false,
                message: "User not found"
            });
        }

        let ImgGenhistory = await ImgGenHistModel.find({userId:userId}).sort({GenerationDate:-1})
        
        
        console.log(ImgGenhistory)

        return res.json({
            success: true,
            message: "History fetched successfully",
            ImgGenhistory
        });
    } else {
        return res.json({
            success: false,
            message: "User ID is required"
        });
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

module.exports = ImageGenHistory