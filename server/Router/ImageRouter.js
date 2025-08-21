const express = require("express")
const ImageRouter=express.Router()
//const ImageGeneration = require("../controllers/ImageGeneration")
const isLoggedIn = require("../middlewares/isLoggedIn")
const PollinationImgGen = require("../controllers/PollinationImgGen")
const ImageUpscalar = require("../controllers/ImageUpscalar")
const upload = require("../config/multer")
//ImageRouter.post("/generateImage",isLoggedIn,ImageGeneration)
ImageRouter.post("/generateImage",isLoggedIn,PollinationImgGen)

module.exports=ImageRouter