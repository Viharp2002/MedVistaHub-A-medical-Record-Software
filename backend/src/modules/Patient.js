const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const patient_data = mongoose.Schema({
    nameOfEntity:{
        type: String
     },
    p_id: {
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
    dob:{
        type: String
    }
});

patient_data.pre("save",async function(next){
    if(this.isModified("password"))
    {
        this.password = await bcrypt.hash(this.password,10);
        next();
    }
})

const Patient = new mongoose.model("patient", patient_data);
module.exports = Patient;