const mongoose = require("mongoose");

const chat_data = mongoose.Schema({
     message:{
        type: String
     },
     person:{
        type: String
     }
});

const Chat = new mongoose.model("chat", chat_data);
module.exports = Chat;