const mongoose = require("mongoose");

const visit_data = mongoose.Schema({
    p_id:{
        type: String
    },
    p_name:{
        type: String
    },
    dob:{
        type: String
    },
    gender:{
        type: String
    }, 
    contact:{
        type: String
    },
    email:{
        type: String
    },
    tests: [{
        t_name:{
            type: String
        },
        t_date:{
            type: String
        },
        report:{
            type: String
        },
        stat:{
            type: String
         },
         certificate:{
            type:String
        },
        medication:{
            type:String
        },
        precaution:{
            type:String
        },
        disease:{
            type:String
        }
    }],
    d_name:{
        type: String
    },
    clinic_name:{
        type: String
    },
    currentDate: {
        type: Date,
        default: Date.now,
    },
    d_id:{
      type: String
    },
    l_id:{
        type: String
    }
});

const Visit = new mongoose.model("visit", visit_data);
module.exports = Visit;