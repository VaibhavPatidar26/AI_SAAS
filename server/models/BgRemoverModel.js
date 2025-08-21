const mongoose = require("mongoose")
const Schema = mongoose.Schema

let BgRemoverModel = new Schema({

    userId:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:"User"
    },
  
    
   
   BgRemovedUrl:{
        type:String,
        required:true
    },
    GenerationDate:{
        type:Date,
        default:Date.now
    }
})

module.exports= mongoose.model("BgRemoverHist",BgRemoverModel)