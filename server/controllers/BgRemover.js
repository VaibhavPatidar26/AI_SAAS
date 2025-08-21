const upload = require("../config/multer");
const axios = require("axios");
const cloudinary = require("../config/clodinary");
const form_data = require("form-data");
const fs = require("fs");
const userModel = require("../models/userModel");
const BgRemoverModel = require("../models/BgRemoverModel");

async function Bgremover(req, res) {
    let file = req.file;
    let userId = req.userId || req.body.userId;

    if (!file) {
        return res.json({
            message: "file missing",
            success: false
        });
    }

    try {
        let user = await userModel.findById(userId);


        if(user.credit<=0){
            return res.json({
                message:"No credits left",
                success:false
            })
        }
        if (!user) {
            return res.json({
                message: "user not found",
                success: false
            });
        }

      
  //-----------------------------------------------------------------------------------------------------
        /*
        return res.json({
            message: "Debug successful",
            userId: userId,
            user: user,
            success: true
        });
        */

        // const response = {
        //     Name: "vaibhav patidar",
        //     data: "this is a dummy object",
        //     purpose: "debug mode",
        //     mode: "development mode"
        // };
        // console.log(response);
        // return res.json({
        //     message: "image generated",
        //     finalresponse: response,
        //     success: true
        // });

//----------------------------------------------------------------------------------------------------------
       
        const form = new form_data();
        form.append("image_file", fs.createReadStream(file.path));

  
        const response = await axios.post("https://clipdrop-api.co/remove-background/v1", form, {
            headers: {
                ...form.getHeaders(),
                "x-api-key": process.env.CLIPDROP_API_KEY
            },
            responseType: "arraybuffer"
        });

       
        const base64image = Buffer.from(response.data, "binary").toString("base64");
        const resultImage = `data:image/png;base64,${base64image}`;

      
        const uploadResult = await cloudinary.uploader.upload(resultImage, { folder: "user_images" });
        const finalImage = uploadResult.secure_url;



        
    
        user.credit = user.credit - 1;


        await BgRemoverModel.create({
            userId:userId,
            BgRemovedUrl:finalImage

        })
      
        await user.save();


// return res.json({
//   message: "image generated",
//   finalImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMZxbcf0q_FokNKqf6j9jevITmlBTUFJlKsg&s",
//   success: true
// });



        return res.json({
            message: "image generated",
            finalImage: finalImage,
            success: true
        });

    } catch (err) {
        console.log("Error in Bgremover:", err);
        return res.json({
            message: "something went wrong",
            success: false
        });
    }
}

module.exports = Bgremover;
