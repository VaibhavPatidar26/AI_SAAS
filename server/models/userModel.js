const mongoose = require("mongoose")
const Schema= mongoose.Schema

const UserModel= new Schema({

    Name:{
        type: String,
        required:"true"   
    },
    email:{
        type: String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    credit:{
        type:Number,
        default:5,
    }
})

module.exports=mongoose.model("user",UserModel)