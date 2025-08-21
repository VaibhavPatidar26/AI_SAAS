const express = require("express")
const {LoginUser,registerUser, CreditBalance} = require("../controllers/Auth")
const BuyCredit = require("../controllers/BuyCredit")
const isLoggedIn = require("../middlewares/isLoggedIn")
const userRouter = express.Router()
const Userhistory= require("../controllers/ImageGenHistory")
const upload = require("../config/multer")
const BgRemover = require("../controllers/BgRemover")
const ImageUpscalar = require("../controllers/ImageUpscalar")

userRouter.get("/",(req,res)=>{
    res.send("this is user")
})

userRouter.post("/register",registerUser)
userRouter.post("/login",LoginUser)
userRouter.post("/credit",isLoggedIn,CreditBalance)
userRouter.get("/history",isLoggedIn,Userhistory)
userRouter.post("/BuyCredit/order",isLoggedIn,BuyCredit.createOrder)
userRouter.post("/BuyCredit/verify",isLoggedIn,BuyCredit.paymentVerification)
userRouter.post("/upload",isLoggedIn,upload.single("file"),BgRemover)
userRouter.post("/upscalar/upload",isLoggedIn,upload.single("file"),ImageUpscalar)
module.exports= userRouter