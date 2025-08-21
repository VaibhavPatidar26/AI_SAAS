 if(password == ConfirmPassword){
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
                                success:true
                            })
       }
       else{
        return res.json({
            message:"password do not match",
            success:false
        })
       }






       