const express= require("express")
const app = express()
const mongoose = require("mongoose")
const razorpayInstance = require("../config/razorpayConfig")
const crypto = require("crypto")
const userModel = require("../models/userModel")

async function createOrder(req,res){
    try{
        const {amount} = req.body
 const options= {
    amount:amount * 100,
    receipt: "receipt_"+ Date.now(),
    currency: "INR"
 }

 razorpayInstance.orders.create(options,(err,order)=>{
        if(!err){
            return res.json(order)
        }
        else{
           return res.send(err)
        }
 })
    }
 


catch(err){
    return res.json({
        message:"something went wrong",
        success: false
    })
}

}

async function paymentVerification(req,res){

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature,userId,credits } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    // ✅ Payment verified successfully
   
         

    let user=await userModel.findById(userId)
    if(user){
        user.credit = user.credit + credits
        await user.save()
        console.log(user)
        return res.json({ message:"credits added successfully",success: true });
    }



  } else {
    return res.status(400).json({ success: false });
  }
}
 




module.exports = {createOrder,paymentVerification}