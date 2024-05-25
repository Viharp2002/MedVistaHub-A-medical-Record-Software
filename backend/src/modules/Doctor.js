const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const doctor_data = mongoose.Schema({
    nameOfEntity:{
       type: String
    },
    d_id: {
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
    city:{
        type: String
    },
    clinic_name:{
        type: String
    },
    image:{
        type: String
    },
    dob:{
        type: String
    }
});

doctor_data.pre("save",async function(next){
    if(this.isModified("password"))
    {
        this.password = await bcrypt.hash(this.password,10);
        next();
    }
})

const Doctor = new mongoose.model("doctor", doctor_data);
module.exports = Doctor;