const express = require("express")
const imageGenHistModel = require("../models/ImgGenHistModel")
const userModel = require("../models/userModel")
const ImgGenHistModel = require("../models/ImgGenHistModel")

async function GenHistDelete(req,res){

     let userId = req.userId
    let {id} = req.params
try{


    if(!userId){
        return res.json({
            success:false,
            message:"user not found"
        })}

    if(!id){
        return res.json({
            success:false,
            message:"something went wrong"
        })}

        if(id && userId){
            await ImgGenHistModel.findByIdAndDelete({_id:id,userId:userId})
            return res.json({
                message:"history deleted",
                success:true
            })
            
        }
}
    

   catch(err){
    console.log(err)   
    return res.json({
        message:"Something went wrong",
        success:false,
    }) 

   }
    

    
}

module.exports = GenHistDelete