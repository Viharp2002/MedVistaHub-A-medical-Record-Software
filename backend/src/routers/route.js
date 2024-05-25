const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const multer = require("multer");
 
app.use(express.json());
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './files')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now()
    cb(null, uniqueSuffix + file.originalname)
  }
})
   
const upload = multer({ storage: storage })

const router = new express.Router();

const Patient = require('../modules/Patient');
const Doctor = require('../modules/Doctor');
const Labtech = require('../modules/Labtech');
const Visit = require('../modules/Visit');
const Chat = require('../modules/Chat');
const Img = require('../modules/Img');

const requireAuth = require("../middlewares/auth");
 
const createToken = (_id)=>{
    return  jwt.sign({_id},process.env.TOKEN)
};
 
router.get("/",(req,res)=>{
    console.log(1);
});

//chatbot-store in database
router.post("/storeChat",async(req,res)=>{
   const{message,person} = req.body;

   try {
    const data = new Chat({message,person});
    await data.save();
    res.status(201).json({message:"ok"});
   } catch (error) {
    console.log(error);
    res.status(401).json({error:error});
   }
});
//chatbot-get chat from database
router.get('/getChat',async(req,res)=>{
   try {
   const data = await Chat.find({}, { "message": 1,"person":1, "_id": 0 })
   res.status(201).json(data);
  } catch (error) {
    console.log(error);
    res.status(401).json({error:error});
  }
}); 
 
//Contact me (appointment)
router.post('/contactMe',async(req,res)=>{
  const{fname,adate,email,selectedDoctor} = req.body;
    try {
      const datat = await Doctor.findOne({nameOfEntity:selectedDoctor});
      const emailid = datat.email;

      let mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "artechoSolution@gmail.com",
          pass: "sljcozabamikyhsr",
        }
      });

      mailTransporter.verify(function (error, success) {
        if (error) {
          return res.status(500).json({ error: "Internal Server Error" });
        } else {
          
          let details = {
            from: "artechoSolution@gmail.com",
            to: emailid,
            subject: "Welcome to MedVistaHub - Gujarat Medical Council: Online doctor consultation",
            text: `The Gujarat Medical Council (GMC) is a Statutory body established under the provisions of the Gujarat Medical Council Act, 1967 (Gujarat ACT NO. 10 OF 1968).` + `\n`+ `The GMC consists of the following members, (1) Six members elected by the Registered Practitioners, (2) Five members are nominated by the Government of Gujarat and (3) One member from each University established by law in the State which has a medical faculty.` + `\n` + `The President and the Vice-President of the GMC are elected by the Members of the Council from amongst themselves, as per the provisions of the Gujarat Medical Council Act, 1967.` + `\n` + `The Executive Committee consists of President as ex-officio member and Six other members of the Council who shall be elected, in the prescribed manner.`+ `\n` + `\n`  + `\n` + `Name: ${fname}`+'\n'+`Email: ${email}` + `\n` + `Appointment date: ${adate}`,
          };

          mailTransporter.sendMail(details, (err) => {
            if (err) {
              console.error("Error sending email:", err);
              return res.status(500).json({ error: "Internal Server Error" });
            } else {
              console.log("Email is sent successfully");
              return res.status(201).json({ success: "Email is sent successfully" });
            }
          });
        }
      });

      res.status(201).json({message:"ok"});
    } catch (error) {
      console.log(error);
      res.status(401).json({error:error});
    }
});

//Get Profile of Patient and name of doctor. Also, the image of home page
router.get('/getPatientInfo/:value',async(req,res)=>{
  const value = req.params.value;
   
  try {
    const data = await Patient.findOne({p_id:value});
    res.status(201).json(data);
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: error });
  }
});
router.get('/getDoctorName',requireAuth,async(req,res)=>{
  res.status(201).json(req.user);
}); 
router.get('/getHomeImg',async(req,res)=>{
   try {
    const data = await Img.find();
    const val = data[0].base64Image;
    res.status(201).json({val})
   } catch (error) {
    console.log(error);
    res.status(401).json({error:error});
   }
});

//Get medical-precaution,medication to patient profile
router.get('/getPatientInfo/:p_id/:t_name', async (req, res) => {
  try {
    const data = await Visit.findOne({
      p_id: req.params.p_id,
      'tests.t_name': req.params.t_name
    });

    if (!data) {
      return res.status(404).json({ message: 'Patient information not found' });
    }

    // Filtering the specific test
    const test = data.tests.find(test => test.t_name === req.params.t_name);
    console.log(test);

    if (!test) {
      return res.status(404).json({ message: 'Test information not found' });
    }

    res.status(200).json(test);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get Patient Medical History
router.get('/getVisitRecords/:value',async(req,res)=>{
  const p_id = req.params.value;
  try {
    const data = await Visit.find({p_id:p_id});
    res.status(201).json(data);
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: error });
  }
});
router.get('/getVisitRecord/:d_id',async(req,res)=>{
  const d_id = req.params.d_id;
  try {
    const data = await Visit.find({d_id:d_id});
    res.status(201).json(data);
  } catch (error) {
    console.log(error);
    res.status(201).json({error:error});
  }
});

// Get Lab Details
router.get('/getLabRecords',async(req,res)=>{
  try {
    const data = await Visit.find();
    res.status(201).json(data);
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: error });
  }
});

//Get medical table for patient
router.get('/getTableForPatient/:p_idd',async(req,res)=>{
   try {
    const p_id = req.params.p_idd;
    const data = await Visit.find({p_id:p_id});
    res.status(201).json(data);
   } catch (error) {
    console.log(error);
    return res.status(401).json({ error: error });
   }
}); 

//Upload Visit data and Get Test Results
router.post('/uploadVisit',async(req,res)=>{
  // const{t_name,t_date,d_name,des,respiratory_rate,
  //   pef,fev1,oxy_sat,sym_or_obs} = req.body; 
  try {
     const data = new Visit(req.body);
     await data.save();
     res.status(201).json({success: "ok"});
   } catch (error) {
    console.log(error);
    return res.status(401).json({ error: error });
   }
}); 
router.post('/uploadPDF', upload.single('file'), async (req, res) => {
  try {
    var t_name = req.body.t_name;
    var t_namee = req.body.t_namee;
    var p_id = req.body.p_id;
    var l_id = req.body.l_id;
    
    if (t_name === 'undefined') {
      t_name = t_namee;
    }
   
      if (!req.file) {
          return res.status(400).json({ error: 'No file uploaded' });
      }

      const report = req.file.filename;

      // Update the report and stat for the specific t_name in the tests array
      const data = await Visit.updateOne(
          {"p_id":p_id, "tests.t_name": t_name },
          {
              $set: {
                  "l_id":l_id,
                  "tests.$.report": report,
                  "tests.$.stat": 'Success'
              }
          }
      );
      res.status(201).json({ success: "success" });
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});
router.post('/medicalPrec', upload.single('file'), async (req, res) => {
  try {
    const t_namee = req.body.t_namee;
    const p_id = req.body.p_id;
    const precaution = req.body.precaution;
    const disease = req.body.disease;
    const medication = req.body.medication;
    const certificate = req.file.filename;
 
    const data = await Visit.updateOne(
      {"p_id":p_id, "tests.t_name": t_namee },
      {
          $set: {
              "tests.$.certificate": certificate,
              "tests.$.precaution": precaution,
              "tests.$.medication": medication,
              "tests.$.disease": disease,
          }
      }
  );
    res.status(201).json({ success: "success" });

  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: error });
  }
});
router.post('/uploadImg',async(req,res)=>{
  try {
    const data = await Visit.updateOne(
      {"_id":"6639f98ae3043b14be5f0b3c"},
      {
          $set: {
              "base64Image": req.body.base64Image
          }
      }
  );  
    res.status(201).json({ success: "success" });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: error });
  }
});
 
//Get doctors and pateint
router.get("/doctorList/:city",async(req,res)=>{
  const {city} = req.params;
  try {
    const data = await Doctor.find({city},"nameOfEntity");
    res.status(201).json(data);
   } catch (error) {
    console.log(error);
    return res.status(401).json({ error: error });
   }
});
router.get("/entityName",requireAuth,async(req,res)=>{
  try {
    res.status(201).json(req.user);
   } catch (error) {
    console.log(error);
    return res.status(401).json({ error: error });
   }
});

//Login/Register
router.post("/login",async(req,res)=>{
    const { p_id, password, person } = req.body;

    if (!p_id || !password) {
      return res.status(401).json({message:"Fill"})
    }

  if (person === "Doctor") {
    const Doctor_data = await Doctor.findOne({ d_id: p_id });
    try {
      if (Doctor_data) {
        const passwordDoctor = await bcrypt.compare(password, Doctor_data.password);
        if (passwordDoctor) {
            const token = createToken(Doctor_data._id);
            return res.status(201).json({ token});
        } else {
          return res.status(401).json({ error: "Invalid credentials of Doctor" });
        }
      } else {
        return res.status(401).json({ error: "Doctor does not exist" });
      }
    } catch (error) {
      console.log("err:", error);
    }
  } else if (person === "patient") {
    try {
      const patient = await Patient.findOne({ p_id });

      if (patient) {
        const passwordPat = await bcrypt.compare(password, patient.password);

        if (passwordPat) { 
            const token = createToken(patient._id);
            return res.status(201).json({ token});
        } else {
          return res.status(401).json({ error: "Invalid credentials of Citizen" });
        }
      } else {
        return res.status(401).json({ error: "Citizen does not exist" });
      }
    } catch (error) {
      console.log("err:", error);
    }
  } else if (person === "Lab Technician") {
    try {
      const labtech = await Labtech.findOne({ l_id:p_id });

        if (labtech) {
          const passwordLabTech = await bcrypt.compare(password,labtech.password);
        if (passwordLabTech) {
            const token = createToken(labtech._id);
            return res.status(201).json({ token });
        } else {
          return res.status(401).json({ error: "Invalid credentials of Lab Technician" });
        }
      } else {
        res.status(401).json({ error: "Lab Technician does not exist" });
      }
    } catch (error) {
      console.log("err:", error);
    }
  }
});
router.post("/register", async (req, res) => {
    try {
      const {p_id,password,l_id,d_id,person,nameOfEntity,dob,email,image,contact,address,gender,age} = req.body;   
      let data;
      if (person==='Lab Technician') {
       data = new Labtech({l_id, password, nameOfEntity});
      }
      else if(person==='Doctor'){
       data = new Doctor(req.body);
      }
      else {   
       data = new Patient({p_id, password, nameOfEntity, dob, email,image,contact,address,gender,age});
      }

      const token = createToken(data._id);

      await data.save();
      res.status(201).json({token});
    } catch (error) {
      console.log("error in register : ", error);
      res.status(422).json({ error: "Fill the details appropriately" });
    }
});

//Reset Password
router.post("/sendMail", async (req, res) => {
  const { person, email } = req.body;
   try {
    let findEmail;
    if (person === 'Doctor') {
      findEmail = await Doctor.findOne({ email });
     } else if (person === 'Lab Technician') {
      findEmail = await Labtech.findOne({ email });
    } else {
      findEmail = await Patient.findOne({ email });
    }
    if (!findEmail || findEmail===null) {
      return res.status(402).json({ error: "Email is not registered with the system!" });
    } else {
      const uid = String(findEmail._id);

      let mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "artechoSolution@gmail.com",
          pass: "sljcozabamikyhsr",
        }
      });

      mailTransporter.verify(function (error, success) {
        if (error) {
          return res.status(500).json({ error: "Internal Server Error" });
        } else {
          
          let details = {
            from: "artechoSolution@gmail.com",
            to: req.body.email,
            subject: "Welcome to MedVistaHub - Gujarat Medical Council: Reset your password through this link",
            text: `The Gujarat Medical Council (GMC) is a Statutory body established under the provisions of the Gujarat Medical Council Act, 1967 (Gujarat ACT NO. 10 OF 1968). The GMC consists of the following members, (1) Six members elected by the Registered Practitioners, (2) Five members are nominated by the Government of Gujarat and (3) One member from each University established by law in the State which has a medical faculty. The President and the Vice-President of the GMC are elected by the Members of the Council from amongst themselves, as per the provisions of the Gujarat Medical Council Act, 1967. The Executive Committee consists of President as ex-officio member and Six other members of the Council who shall be elected, in the prescribed manner.`  + `\n` + `http://localhost:3000/resetPassword/${person}/${uid}`,
          };

          mailTransporter.sendMail(details, (err) => {
            if (err) {
              console.error("Error sending email:", err);
              return res.status(500).json({ error: "Internal Server Error" });
            } else {
              console.log("Email is sent successfully");
              return res.status(201).json({ success: "Email is sent successfully" });
            }
          });
        }
      });
    }
  } catch (error) {
    console.error("Error in sending email:", error);
    return res.status(401).json({ error: "Email does not exist" });
  }
});
router.post("/resetPassword",async(req,res)=>{
   const{password,confirmPassword, person,p_id} = req.body;
   
   try {
    if (password !== confirmPassword) {
      return res.status(401).json({ message: "Passwords are not matching" });
    }
    if(!password || !confirmPassword){
      return res.status(401).json({ message: "Fill details" });
    } 
    else {
      if (person === "patient") {
        bcrypt
          .hash(password, 10)
          .then((hash) => {
            Patient.findByIdAndUpdate({ _id: p_id }, { password: hash })
              .then((u) => res.status(201).json({ success: "done" }))
              .catch((err) => res.status(401).json({ error: err }));
          })
          .catch((err) => res.status(401).json({ error: err }));
      } else if (person === "Doctor") {
        bcrypt
          .hash(password, 10)
          .then((hash) => {
            Doctor.findByIdAndUpdate({ _id: p_id }, { password: hash })
              .then((u) => res.status(201).json({ success: "done" }))
              .catch((err) => res.status(401).json({ error: err }));
          })
          .catch((err) => res.status(401).json({ error: err }));
      } else if (person === "Lab Technician") {
        bcrypt
          .hash(password, 10)
          .then((hash) => {
            Labtech.findByIdAndUpdate({ _id: p_id }, { password: hash })
              .then((u) => res.status(201).json({ success: "done" }))
              .catch((err) => res.status(401).json({ error: "error1" }));
          })
          .catch((err) => res.status(401).json({ error: "error2" }));
      }
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: error });
  }
}); 
module.exports = router;