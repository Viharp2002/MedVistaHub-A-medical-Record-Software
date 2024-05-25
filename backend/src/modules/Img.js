const mongoose = require("mongoose");

const imggov = mongoose.Schema({
     base64Image:{
      type: String
     }
});

const Img = new mongoose.model("imggov", imggov);
module.exports = Img;