const mongoose = require("mongoose")
const Schema = mongoose.Schema

let ImgGenHistModel = new Schema({

    userId:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:"User"
    },
  
    ImageUrl:{
        type:String,
        required:true
    },
    Imageprompt:{
        type:String,
        required:true
    },
    GenerationDate:{
        type:Date,
        default:Date.now
    }
})

module.exports= mongoose.model("ImgGenHist",ImgGenHistModel)