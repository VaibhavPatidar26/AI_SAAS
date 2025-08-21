const jwt = require("jsonwebtoken")
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const userModel = require("../models/userModel")

async function registerUser(req, res) {
    try {
        console.log("BODY:",req.body)
        const { Name, email, password,ConfirmPassword } = req.body
        
        if (!Name || !email || !password || !ConfirmPassword ){
           return res.json({
                message: "field are required",
                success: false
            })
        }
        
        if(password !== ConfirmPassword){
            return res.json({
                message:"password and ConfirmPassword do not match",
                success:false
            })
        }

        let existingUser = await userModel.findOne({ email: email })
        if (existingUser) {
            return res.json({
                message: "user already exists,Try login"
            })
        }




        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const User = await userModel.create({
            Name: Name,
            email: email,
            password: hashedPassword,
        })

        const payload= {
            userId: User._id,
            password:hashedPassword
        }
        const token= jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:"1h"})
        console.log(token)
       
            return res.json({
            token:token,
            message:"user created",
            user:User.Name,
            success:true
        })
    }

   catch (error) {
    console.error("Error in registerUser:", error); 
    res.status(500).json({
        message: "Something went wrong",
        success: false
    });
}

}

async function LoginUser(req,res){
    try{
    const{email,password}=req.body;
    if(!email||!password){
       return res.json({
            message:"field missing",
            success:false
        })
    }

     let LoggedUser = await userModel.findOne({email:email})

     if(!LoggedUser){
     return   res.json({
            message:"create one account user not find"
        })
     }
        if(LoggedUser){
            const passMatch = await bcrypt.compare(password,LoggedUser.password)
            if(passMatch){
            const payload={
                userId: LoggedUser._id,
                email : email
            }
               const token=jwt.sign(payload,process.env.SECRET_KEY)
              return  res.json({
                    user:LoggedUser.Name,
                    message:"Logged in",
                    success:true,
                    token:token
                })
        
            }
            if(!passMatch){
               return res.json({
                    message:"incorrect password enter agian",
                    success:false,
                })
            }
        }
    }
    catch(error){
        res.json({
            message:"something went wrong",
        })
    }
}

async function CreditBalance(req,res){

            const {userId} = req.body
try{
            let user= await userModel.findById(userId)

            if(user){
                const RemainingCredit= user.credit
                const Name =user.Name
                res.json({
                    message:"user found",
                    success:true,
                    credit:RemainingCredit,
                    Name:Name
                }
                )
            }
            else{
                res.json({
                    message:"user not found",
                    success:false
                })
            }
        }
        catch(err){
            console.log(err)
            res.json({
                message:"internal server error",
                success:false
            })
        }
}




module.exports= {LoginUser,registerUser,CreditBalance}
