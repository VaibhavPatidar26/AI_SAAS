const mongoose = require("mongoose")
const Schema = mongoose.Schema

let ImageUpscalarModel = new Schema({

    userId:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:"User"
    },
  
    
   
   UpscaledImg:{
        type:String,
        required:true
    },
    GenerationDate:{
        type:Date,
        default:Date.now
    }
})

module.exports= mongoose.model("ImgUpscalarHist",ImageUpscalarModel)