const jwt = require("jsonwebtoken");
const Patient = require("../modules/Patient");
const Doctor = require("../modules/Doctor");
const Labtech = require("../modules/Labtech");
 
const requireAuth = async(req,res,next)=>{
  try {
  const {authorization} = req.headers;
  if(!authorization)
  {
    return res.status(401).json({error:"token required"});
  }

  const token = authorization;

    const {_id} = jwt.verify(token,process.env.TOKEN);
 
    req.user = await Doctor.findOne({_id});
    req.id =  await Doctor.findOne({_id}).select({_id});

    if (req.user===null) {
      req.user = await Patient.findOne({_id});
      req.id =  await Patient.findOne({_id}).select({_id});
    } 
    if (req.user===null) {
      req.user = await Labtech.findOne({_id});
      req.id =  await Labtech.findOne({_id}).select({_id});
    } 
    
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({error:"Error"});
  }
};

module.exports = requireAuth;