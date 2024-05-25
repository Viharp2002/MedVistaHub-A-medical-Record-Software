const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const labtech_data = mongoose.Schema({
    nameOfEntity:{
        type: String
     },
    l_id: {
        type: String,
    },
    password: {
        type: String,
    },
    email:{
        type: String
    },
    image:{
        type: String
    },
    contact:{
        type: String
    },
    address:{
        type: String
    },
    gender:{
        type: String
    },
    age:{
        type: String
    },
    image:{
        type: String
    },
    dob:{
        type: String
    }
});

labtech_data.pre("save",async function(next){
    if(this.isModified("password"))
    {
        this.password = await bcrypt.hash(this.password,10);
        next();
    }
})

const Labtech = new mongoose.model("labtech", labtech_data);
module.exports = Labtech;