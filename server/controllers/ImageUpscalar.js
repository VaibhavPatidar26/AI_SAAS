const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const FormData = require("form-data");
const cloudinary = require("../config/clodinary");
const userModel = require("../models/userModel");
const fs = require("fs");
const ImgUpscalarModel = require("../models/ImgUpscalarModel");

async function ImageUpscalar(req, res) {
  try {
    const userId = req.userId;
    const file = req.file;

    if (!userId) {
      return res.json({
        message: "User not found",
        success: false
      });
    }

    if (!file) {
      return res.json({
        message: "File not uploaded",
        success: false
      });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({
        message: "User not found",
        success: false
      });
    }
     if(user.credit<=0){
            return res.json({
                message:"No credits left",
                success:false
            })}

    // Prepare form data
    const form = new FormData();
    form.append("image_file", fs.createReadStream(file.path));
    form.append("target_width", 2048);
    form.append("target_height", 2048);

    // Call ClipDrop API
    const response = await axios.post(
      "https://clipdrop-api.co/image-upscaling/v1/upscale",
      form,
      {
        headers: {
          ...form.getHeaders(),
          "x-api-key": process.env.CLIPDROP_API_KEY
        },
        responseType: "arraybuffer"
      }
    );

    // Convert API response to base64
    const base64image = Buffer.from(response.data, "binary").toString("base64");
    const resultImage = `data:image/png;base64,${base64image}`;

    // Upload to Cloudinary
    const uploadimage = await cloudinary.uploader.upload(resultImage, {
      folder: "image_upscalar"
    });

    const finalImage = uploadimage.secure_url;

    // Deduct credit
    user.credit = user.credit - 1;

    // Save to DB
    await ImgUpscalarModel.create({
      userId: userId,
      UpscaledImg: finalImage
    });

    await user.save();

    // Delete temp file (optional)
    fs.unlinkSync(file.path);

    return res.json({
      message: "Image generated",
      success: true,
      finalImage: finalImage
    });
  } catch (error) {
    console.error("Error in ImageUpscalar:", error.message);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message
    });
  }
}

module.exports = ImageUpscalar;
