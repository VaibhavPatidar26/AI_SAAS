const express = require("express")
const mongoose = require("mongoose")
const BgRemoverModel = require("../models/BgRemoverModel")

async function BgRemHistDelete(req,res){

let {id} = req.params
let userId = req.userId
try{
if(!id){
    return res.json({
        message:"something went wrong",
        success:false
    })}

if(!userId){
    return res.json({
        message:"user not find",
        success:false
    })
}

if(id && userId){

        await BgRemoverModel.findByIdAndDelete({_id:id,userId:userId})
        return res.json({
            message:"history deleted",
            success:true
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

module.exports = BgRemHistDelete
