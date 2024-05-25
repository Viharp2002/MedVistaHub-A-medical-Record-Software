import React, { useState ,useEffect} from 'react';
import { pdfjs } from 'react-pdf';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/dashboard.css';
import axios from "axios";
import Spinner from './Spinner';
import BootstrapModalTwo from './BootstrapModalTwo';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// This line is important to set up workerSrc path
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

function Dashboard(props) {
  const navigate = useNavigate();

  const[user,setUser] = useState([]);
  const[user2,setUser2] = useState([]);
  const[user3,setUser3] = useState([]);
  const[userv,setUserv] = useState([]);
  const[user4,setUser4] = useState([]);
  const[file,setFile] = useState(null);
 
  const[d_name,setD_name] = useState('');
  const[t_name,setT_name] = useState();
  const[t_namee,setT_namee] = useState('');
  const[precaution,setPrecaution] = useState('');
  const[medication,setMedication] = useState('');
  const[t_date,setT_date] = useState('');
  const[disease,setDisease] = useState('');
  const[clinic_name,setClinic_name] = useState('');
  const[p_id,setP_id] = useState('');
  const[spin,setSpin] = useState(true);
  const[spinn,setSpinn] = useState(false);
  const [selectedDiseases, setSelectedDiseases] = useState([]);
  
    const person = localStorage.getItem('person');
    const reason = localStorage.getItem('reasonDoctor');
    const token = localStorage.getItem('token');
    const d_id = localStorage.getItem('d_id');
    const l_id = localStorage.getItem('l_id');
    const p_idd = localStorage.getItem('p_id');
 
    useEffect(()=>{
      setTimeout(() => {
        setSpin(false);
      }, 1000);
    },[])


    // **********************************************Doctor****************************************************
    let countId=0,countIdTest=0,countIdLab=0;
    const detailsFormShow = ()=>{
      if (document.getElementById('showButt').innerHTML == 'Add Details') {
        document.getElementById('showMed').style.display = 'block';
        document.getElementById('showVisit').style.display = 'none';
        document.getElementById('showProfile').style.display = 'none';
        document.getElementById('showButt').innerHTML = ' Go back';
        document.getElementById('showButt').classList.add('fa','fa-arrow-left');
        document.getElementById('showBut').innerHTML = 'Add Visit';
        document.getElementById('showBut').classList.remove('fa','fa-arrow-left');
      } else {
        document.getElementById('showMed').style.display = 'none';
        document.getElementById('showProfile').style.display = 'block';
        document.getElementById('showButt').innerHTML = 'Add Details';
        document.getElementById('showButt').classList.remove('fa','fa-arrow-left');
      }
    }
    const visitFormShow = ()=>{
       if (document.getElementById('showBut').innerHTML == 'Add Visit') {
         document.getElementById('showVisit').style.display = 'block';
         document.getElementById('showMed').style.display = 'none';
         document.getElementById('showProfile').style.display = 'none';
         document.getElementById('showBut').innerHTML = ' Go back';
         document.getElementById('showBut').classList.add('fa','fa-arrow-left');
         document.getElementById('showButt').innerHTML = 'Add Details';
         document.getElementById('showButt').classList.remove('fa','fa-arrow-left');
       } else {
         document.getElementById('showVisit').style.display = 'none';
         document.getElementById('showProfile').style.display = 'block';
         document.getElementById('showBut').innerHTML = 'Add Visit';
         document.getElementById('showBut').classList.remove('fa','fa-arrow-left');
       }
    };
    const handleSearchFind = async(e)=>{
      const value = e.target.value;
      
      try {
        const res = await fetch('http://localhost:3605/getPatientInfo/' + value, {
          method: 'GET',
       })
      const data = await res.json();
       
      if (data) {
        setUser(data);
        document.getElementById('showProfile').style.display = 'block';
        document.getElementById('showBut').style.display = 'inline-block';
        document.getElementById('showButt').style.display = 'inline-block';
        document.getElementById('showNoData').style.display = 'none';
        document.getElementById('showBut').innerHTML = 'Add Visit';
        document.getElementById('showBut').classList.remove('fa','fa-arrow-left');
        document.getElementById('showButt').innerHTML = 'Add Details';
        document.getElementById('showButt').classList.remove('fa','fa-arrow-left');
      } else {
        document.getElementById('showProfile').style.display = 'none';
        document.getElementById('showBut').style.display = 'none';
        document.getElementById('showButt').style.display = 'none';
        document.getElementById('showVisit').style.display = 'none';
        document.getElementById('showMed').style.display = 'none';
        document.getElementById('showNoData').style.display = 'block';
      }
      } catch (error) {
        console.log(error);
      }
    };
    const handleSearchTest = async(e)=>{
      const value = e.target.value;

      try {
        const res = await fetch('http://localhost:3605/getVisitRecords/' + value, {
          method: 'GET',
          headers:{
            Authorization: token
          }
      })
      const data = await res.json();
      if (value.length===1) {
        setUser2(user4);
        document.getElementById('showTab').style.display = 'block';   
        document.getElementById('showNoDataTest').style.display = 'none';   
       }
      else{
        if (data.length>0) {
          setUser2(data);
          document.getElementById('showTab').style.display = 'block';   
          document.getElementById('showNoDataTest').style.display = 'none';   
        } else {
          document.getElementById('showTab').style.display = 'none';  
          document.getElementById('showNoDataTest').style.display = 'block';   
        }
      }
      } catch (error) {
        console.log(error);
      }
    }
    useEffect(()=>{
      const handleSearchTestAll = async(e)=>{  
         setSpin(true);
        try {
          const res = await fetch('http://localhost:3605/getVisitRecord/' + d_id, {
            method: 'GET',
            Authorization: token
        })
        const data = await res.json();
  
        if (data.length>0) {
          setSpin(false);
          setUser4(data);
          document.getElementById('showTab').style.display = 'block';   
          document.getElementById('showNoDataTest').style.display = 'none';   
        } else {
          setSpin(false);
          setUser2([])
          document.getElementById('showTab').style.display = 'none';   
          document.getElementById('showNoDataTest').style.display = 'block';   
        }
        } catch (error) {
          setSpin(false);
          console.log(error);
        }
      }
        handleSearchTestAll();
      setT_date(new Date().toLocaleDateString("en-US"));
    },[])
    const handleVisit = async (e) => {
      e.preventDefault();
      if (selectedDiseases.length===0) {
        alert('Select at least one test');
      } else {
        setSpinn(true);
        const p_id = user.p_id;
        const p_name = user.nameOfEntity;
        const dob = user.dob;
        const gender = user.gender;
        const contact = user.contact;
        const email = user.email;
        const stat = 'Remaining';
    
        // Assuming selectedDiseases is an array of test names
        const tests = selectedDiseases.map(t_name => ({
            t_name,
            t_date,
            stat
        }));
    
        try {
            const res = await fetch('http://localhost:3605/uploadVisit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    p_id,p_name,dob,gender,contact,email,d_name,clinic_name,tests,d_id
                })
            });
    
            const data = await res.json();
            setSelectedDiseases([]);
    
            if (res.status === 201) {  
              setSpinn(false);
              alert("Test submitted successfully");
              window.location.reload();
            } else {                
              setSpinn(false);
              alert("Test not submitted");
              window.location.reload();
            }
       } catch (error) {
            console.log(error);
        } 
      }
  }
    const handleDetails = async(e)=>{
      e.preventDefault(); 

      setSpinn(true);
      if (t_namee==='') {
        alert("Select test name");
      } 
      if (!file) {
        alert("Select file first");
      }
      else {
        
      const formData = new FormData();
      formData.append('file', file);
      formData.append('medication', medication);
      formData.append('p_id', user.p_id);
      formData.append('precaution', precaution);
      formData.append('t_namee', t_namee);
      formData.append('disease', disease);
  
      try {
        const res = await axios.post('http://localhost:3605/medicalPrec',
        formData,
        {
          headers: {"Content-Type": "multipart/form-data"}
        });
        
        if (res.status===201) {
          setSpinn(false);
          alert("Submitted");
          window.location.reload();
        } else {
          setSpinn(false);
          alert("not Submitted");
        }
        } 
         catch (error) {
          setSpinn(false);
          console.log(error);
         }
      }
    }
    useEffect(()=>{
       const findDoctorName = async()=>{
            const res = await fetch(`http://localhost:3605/getDoctorName`, {
              method: 'GET',
              headers:{
                "Authorization": token
              }
          })
          const data = await res.json();
          setD_name(data.nameOfEntity);   
          setClinic_name(data.clinic_name);  
       };
       if (person==='Doctor') {
         findDoctorName();
       }
    },[]);
    const showPDF = (report)=>{
       window.open(`http://localhost:3605/files/${report}`,"_blank","noreferrer")
    };
    const handleDiseaseSelect = (e) => {
      const selectedDisease = e.target.value;
      if (!selectedDiseases.includes(selectedDisease)) {
        setSelectedDiseases([...selectedDiseases, selectedDisease]);
      }
      // Remove the line below, as it's updating t_name with only the latest selected disease
      // setT_name(selectedDisease);
      console.log(selectedDiseases)
    };
    
     
    //***********************************************Patient**************************************************
    useEffect(()=>{
      const findPatientHistory = async()=>{
        setSpin(true);
        const res = await fetch(`http://localhost:3605/getTableForPatient/${p_idd}`, {
          method: 'GET'
      })
      const data = await res.json(); 
      if (data.length>0) {
        setUserv(data);
        setSpin(false);
      } else {
        setUser3([]);
        setSpin(false);
      }
      };
      if (person==='patient') {
        findPatientHistory();
      }
    },[]);
    //*********************************************Lab Technician*********************************************
    
    const [hiddenRows, setHiddenRows] = useState([]);
    const [selectedTest, setSelectedTest] = useState(Array(user3.length).fill(null));
    
    useEffect(() => {
      setSpin(true);
      const handleSearchLabTech = async () => {
        try {
          const res = await fetch('http://localhost:3605/getLabRecords', {
            method: 'GET',
            headers: {
              Authorization: token
            }
          });
          const data = await res.json();
    
          if (data.length > 0) {
            setUser3(data);
            setSpin(false);
          } else {
            setUser3([]);
            setSpin(false);
          }
        } catch (error) {
          console.log(error);
          setSpin(false);
        }
      };
    
      handleSearchLabTech();
    }, []);

    const updateSelectedTest = (recordIndex, testName) => {
      setSelectedTest(prevState => {
        const updatedSelectedTest = [...prevState];
        updatedSelectedTest[recordIndex] = testName;
        return updatedSelectedTest;
      });
    }; 
     
     const handleReportSubmit = async (recordIndex) => {
      setSpin(true);
      const formData = new FormData();
    
      formData.append('t_name', selectedTest[recordIndex]);
      formData.append('file', file);
      formData.append('t_namee',t_name);
      formData.append('p_id',p_id);
      formData.append('l_id',l_id);
      
      try {
        const res = await axios.post('http://localhost:3605/uploadPDF', formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        
        if (res.status === 201) {
          setSpin(false);
          alert("Submitted");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          setSpin(false);
          alert("Not Submitted");
        }
      } catch (error) {
        setSpin(false);
        console.log("Axios Error:", error.response ? error.response.data : error.message);
        alert(`Please submit a valid report`);
      }
    };
    let count = 1;
  return (
    <> 
    <>
      {spin && <Spinner/>} 
    </>
    <> 
    {
     !spin && person === 'patient'?
      
     user3.length>0 ?
      <div className='tableContainer'>
      <table className='customTable'>
        <thead>
          <tr>
            <th>Id <i className='fa fa-arrow-up'></i></th>
            <th>Date Visited</th>
            <th>Test</th>
            <th>Clinic</th>
            <th>Doctor Name</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {userv.
          flatMap((data, index) => 
          (
            data.tests.map((disease,i)=>(
              <tr key={index}>
                <td>{++countIdTest}</td>
                <td>{disease.t_date}</td>
                <td>{disease.t_name}</td>
                <td>{data.clinic_name}</td>
                <td>{data.d_name}</td>
                <td>
                   <button className='detailsButton'><Link to={`/medicalH/${data.p_id}/${disease.t_name}`} style={{color:"white"}}>Details</Link></button> 
                </td>
              </tr>
            )
          ))
           )}
        </tbody>
      </table>
      </div>
      :
      <>
        <center><h2 style={{marginTop:"18rem", color:"red"}}>No records found</h2></center>
        <center><h4>(Once you visit any doctor, it will be shown here )</h4></center>
      </>
      :

      !spin && person === 'Doctor'?
      <>  
      <center><h1 style={{fontFamily: "cursive"}} className='my-4'>MedVistaHub - {reason}</h1></center>
      {
        reason === 'find' && 
      <>
        {/* Search Bar  */}
        <div className='searchVihu'>
        <div className="search-container">
          <input autoComplete='off' type="text" name='search' onInput={handleSearchFind} className="search-bar" placeholder="Search by Patient Id..."/>
          <i className="search-icon">&#128269;</i>
        </div>
        </div>

        <div className='nodataVihar' id='showNoData'>
          <div className="no-data-container">
            <div className="no-data-icon">&#128542;</div>
            <div className="no-data-message">No patient found</div>
          </div>
        </div>

        {/* Profile Card */}
       <center><div className='profileVi' id='showProfile'>
        <div className="profile-card">
        <img src={user.image} alt="Profile Picture" className="profile-img"/>
        <div className="profile-details">
            <div className="profile-header">
                <h2>{user.nameOfEntity}</h2>
            </div>
            <ul>
                <li><strong>Id:</strong> {user.p_id}</li>
                <li><strong>Gender:</strong> {user.gender}</li>
                <li><strong>Address:</strong> {user.address}</li>
                <li><strong>Contact:</strong> {user.contact}</li>
                <li><strong>Email:</strong> {user.email}</li>
                <li><strong>Date of Birth:</strong> {user.dob}</li>
            </ul>
        </div>
        </div>
       </div></center>
        
        {/* Add Visit Form */}
        <center style={{marginTop:"4vh"}}><Link id='showBut' className="btn1" onClick={visitFormShow}>Add Visit</Link>
        <Link id='showButt' className="btn1" onClick={detailsFormShow}>Add Details</Link></center> 

       <div className='vihmhar' id='showMed'> 
        <div className="containerVis">
            <h2 className='bvih'>Medical Record Form</h2>
            <form>
                <div className="form-group">
                    <label for="disease_affected">Test Done:</label>
                    <select className="inputVi" id="testName" name="testName" onChange={(e)=>setT_namee(e.target.value)} required>
              <option value="">Select Test Name</option>
              <option value="Asthama">Asthama</option>
              <option value="Bronchitis">Bronchitis</option>
              <option value="Bronchitis">Bronchitis</option>
              <option value="Breast Cancer">Breast Cancer</option>
              <option value="Cancer">Cancer</option>
              <option value="Diabetes">Diabetes</option>
              <option value="Epilepsy">Epilepsy</option>
              <option value="Fibromyalgia">Fibromyalgia</option>
              <option value="Glaucoma">Glaucoma</option>
              <option value="Hypertension">Hypertension</option>
              <option value="Influenza">Influenza</option>
              <option value="Jaundice">Jaundice</option>
              <option value="Kidney stones">Kidney stones</option>
              <option value="Leukemia">Leukemia</option>
              <option value="Malaria">Malaria</option>
              <option value="Narcolepsy">Narcolepsy</option>
              <option value="Osteoporosis">Osteoporosis</option>
              <option value="Parkinson's disease">Parkinson's disease</option>
              <option value="Quinsy (tonsillitis)">Quinsy (tonsillitis)</option>
              <option value="Rheumatoid arthritis">Rheumatoid arthritis</option>
              <option value="Schizophrenia">Schizophrenia</option>
              <option value="Tuberculosis">Tuberculosis</option>
              <option value="Ulcerative colitis">Ulcerative colitis</option>
              <option value="Varicella (Chickenpox)">Varicella (Chickenpox)</option>
              <option value="Whooping cough">Whooping cough</option>
              <option value="Xeroderma (dry skin)">Xeroderma (dry skin)</option>
              <option value="Yellow fever">Yellow fever</option>
              <option value="Zika virus">Zika virus</option>
              {/* Add more options as needed */}
                    </select>
                </div>
                <div className="form-group">
                    <label for="precaution">Disease affected:</label>
                    <input type="text" placeholder='Disease affected...' onChange={(e)=>setDisease(e.target.value)} id="disease" name="disease"/>
                </div>
                <div className="form-group">
                    <label for="precaution">Precaution:</label>
                    <textarea id="precaution" placeholder='Enter precuation...' onChange={(e)=>setPrecaution(e.target.value)}  name="precaution" rows="4"></textarea>
                </div>
                <div className="form-group">
                    <label for="certificate">Certificate:</label>
                    <input type="file" required onChange={(e)=>setFile(e.target.files[0])} id="certificate" name="certificate"/>
                </div>
                <div className="form-group">
                    <label for="medication">Medication:</label>
                    <textarea id="medication" placeholder='Enter medication...' onChange={(e)=>setMedication(e.target.value)} name="medication" rows="4"></textarea>
                </div>
                <div className="form-group">
                    <button type="submit" onClick={handleDetails} className="btn">Submit</button>
                </div>
            </form>
        </div>
       </div>
        
        <div className='formD' id='showVisit'>
          <form className='formVihar' onSubmit={handleVisit}>
          <div className='container'>
           <div className='row'> 
            <div className='col'>
              <div  > 
                  <h5 className='viH5'>Patient Information</h5>
                  <label className="labelVi"  for="patientID">Patient ID:</label>
                  <input className="inputVi" readOnly type="text" id="patientID" name="patientID" value={user.p_id}/>

                  <label className="labelVi"  for="patientName">Patient Name:</label>
                  <input className="inputVi" readOnly  type="text" id="patientName" name="patientName" value={user.nameOfEntity}/>

                  <label className="labelVi"  for="dob">Date of Birth:</label>
                  <input className="inputVi" readOnly  type="text" id="dob" name="dob" value={user.dob}/>

                  <label className="labelVi"  for="gender">Gender:</label>
                  <input className="inputVi" readOnly  type="text" id="dob" name="dob" value={user.gender}/>

                  <label className="labelVi"  for="contact">Contact Information:</label>
                  <input className="inputVi"  type="tel" id="contact" name="contact" placeholder="Phone number" readOnly value={user.contact}/>
                  <input className="inputVi"  type="email" id="email" name="email" placeholder="Email" readOnly value={user.email}/>
              </div>
             </div>
     
             <div className='col'>  
              <div>
                <h5 className='viH5'>Test Information</h5>
                <label className="labelVi" htmlFor="testName">Test Name:</label>
                <select className="inputVi" id="testName" name="testName" onChange={handleDiseaseSelect} required>
                  <option value="">Select Test Name</option>
                  <option value="">Select Test Name</option>
                  <option value="Asthama">Asthama</option>
                  <option value="Bronchitis">Bronchitis</option>
                  <option value="Bronchitis">Bronchitis</option>
                  <option value="Breast Cancer">Breast Cancer</option>
                  <option value="Cancer">Cancer</option>
                  <option value="Diabetes">Diabetes</option>
                  <option value="Epilepsy">Epilepsy</option>
                  <option value="Fibromyalgia">Fibromyalgia</option>
                  <option value="Glaucoma">Glaucoma</option>
                  <option value="Hypertension">Hypertension</option>
                  <option value="Influenza">Influenza</option>
                  <option value="Jaundice">Jaundice</option>
                  <option value="Kidney stones">Kidney stones</option>
                  <option value="Leukemia">Leukemia</option>
                  <option value="Malaria">Malaria</option>
                  <option value="Narcolepsy">Narcolepsy</option>
                  <option value="Osteoporosis">Osteoporosis</option>
                  <option value="Parkinson's disease">Parkinson's disease</option>
                  <option value="Quinsy (tonsillitis)">Quinsy (tonsillitis)</option>
                  <option value="Rheumatoid arthritis">Rheumatoid arthritis</option>
                  <option value="Schizophrenia">Schizophrenia</option>
                  <option value="Tuberculosis">Tuberculosis</option>
                  <option value="Ulcerative colitis">Ulcerative colitis</option>
                  <option value="Varicella (Chickenpox)">Varicella (Chickenpox)</option>
                  <option value="Whooping cough">Whooping cough</option>
                  <option value="Xeroderma (dry skin)">Xeroderma (dry skin)</option>
                  <option value="Yellow fever">Yellow fever</option>
                  <option value="Zika virus">Zika virus</option>
                  {/* Add more options as needed */}
                </select>
                {/* Selected diseases list */}
              <label className="labelVi" htmlFor="selectedDiseases">Selected tests:<button className='btn btn-primary btn-sm' onClick={(e)=>{e.preventDefault(); setSelectedDiseases([])}}>Clear</button> </label>
              <textarea className="textareaVi" placeholder='Tests to be selected' id="selectedDiseases" name="selectedDiseases" rows="4" value={selectedDiseases.join(', ')}></textarea>
              <label className="labelVi" htmlFor="testDate">Test Date:</label>
              <input className="inputVi" type="text" readOnly id="testDate" name="testDate" value={new Date().toLocaleDateString("en-US")}/>

                <label className="labelVi" for="orderingDoctor">Ordering Doctor:</label>
                <input className="inputVi" type="text" id="orderingDoctor" name="orderingDoctor" readOnly value={d_name}/>
                
                <label className="labelVi" for="clinic_name">Clinic Name:</label>
                <input className="inputVi" type="text" id="clinic_name" name="clinic_name" value={clinic_name} readOnly/>
                
              </div>
             </div>
            </div>
          </div>

          {/* <Submit Button  */}
          <button type="submit" className="submit-btn">Submit</button>
          </form>
        </div>
      </>
      }
        {/* {reason==='test' && user4.length===0 && <Spinner/>} */}
      {
        reason === 'test' &&
        <>
        {
          user4.length > 0 ?
          <>
            {/* Search Bar  */}
        <div className='searchVihu'>
            <div className="search-container">
              <input autoComplete='off' type="text" name='search' onInput={handleSearchTest} className="search-bar" placeholder="Search by Patient Id..."/>
              <i className="search-icon">&#128269;</i>
            </div>
        </div>
   
        <div className='nodataVihar' id='showNoDataTest'>
          <div className="no-data-container">
            <div className="no-data-icon">&#128542;</div>
            <div className="no-data-message">No patient found</div>
          </div>
        </div>

        <div className="custom-container" id='showTab'>
        <div className="table-responsive py-5 mx-auto my-4">
          <table className="table table-bordered table-hover table-sm">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Id <i className='fa fa-arrow-up'></i></th>
                <th scope="col">Name</th>
                <th scope="col">Id</th>
                <th scope="col">Id (Lab Technician)</th>
                <th scope="col">Test Name</th>
                <th scope="col">Visited date</th>
                <th scope="col">Report</th>
               </tr>
            </thead>
            <tbody>
              {
                user2.length <= 0 &&
                user4
                  .sort((a, b) => {
                    // Sort by report presence first
                    const hasReportA = !!a.report;
                    const hasReportB = !!b.report;

                    if (hasReportA && !hasReportB) return -1;
                    if (!hasReportA && hasReportB) return 1;

                    return new Date(b.currentDate) - new Date(a.currentDate);
                  })
                  .flatMap((data, index) =>
                    data.tests ? (
                      data.tests.map((test, i) => (
                        <tr key={`${index}-${i}`}>
                          <th scope="row">{++countId}</th>
                          <td>{data.p_name}</td>
                          <td>{data.p_id}</td>
                          <td>{data.l_id}</td>
                          <td>{test.t_name}</td>
                          <td>{test.t_date}</td>
                          <td>
                            {test.report ? (
                              <a href="#" onClick={() => showPDF(test.report)}>
                                Download
                              </a>
                            ) : (
                              "Not Uploaded yet"
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr key={index}>
                        <th scope="row">{++countId}</th>
                        <td>{data.p_name}</td>
                        <td>Not Provided</td>
                        <td>{data.currentDate}</td>
                        <td>Not Uploaded yet</td>
                      </tr>
                    )
                  )
              }

              {
                      user2.length>0 && user2
                      .sort((a, b) => {
                        // Sort by report presence first
                        const hasReportA = !!a.report;
                        const hasReportB = !!b.report;

                        if (hasReportA && !hasReportB) return -1;
                        if (!hasReportA && hasReportB) return 1;
                        
                        return new Date(b.currentDate) - new Date(a.currentDate)        
                      })
                      
                      .map((data, index) => 
                      data.tests.map((disease,i)=>(
                        <tr key={`${index}-${i}`}>
                          <th scope="row">{++countId}</th>
                          <td>{data.p_name}</td>
                          <td>{data.p_id}</td>
                          <td>{data.l_id}</td>
                          <td>{disease.t_name}</td>
                          <td>{disease.t_date}</td>
                          <td>
                            {disease.report ? (
                              <a href="#" onClick={() => showPDF(disease.report)}>
                                Download
                              </a>
                            ) : (
                              "Not Uploaded yet"
                            )}
                          </td> 
                        </tr>
                      ))
                  )
            }
            </tbody>
          </table>
        </div>
        </div>
          </>
          :
          <>
            <center><h2 style={{marginTop:"16rem", color:"red"}}>No reports found</h2></center>
            <center><h4>(Once labtech uploads them, it will be shown here )</h4></center>
          </>
        }
        </>
      }
      </>
      :
           
      !spin && <>
      <h1 className="text-center pt-4" style={{fontFamily: "cursive"}}>MedVistaHub Laboratory</h1>

      <>
      {user3.length > 0 ? (
        <div className="custom-container">
          <div className="table-responsive py-5 mx-auto my-4">
            <table className="table table-bordered table-hover table-sm">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Id <i className='fa fa-arrow-up'></i></th>
                  <th scope="col">Test Name</th>
                  <th scope="col">Patient Id</th>
                  <th scope="col">Assigned by</th>
                  <th scope="col">Send Report</th>
                </tr>
              </thead>
              <tbody>
                {user3
                  .sort((a, b) => {
                    if (a.stat === 'Remaining' && b.stat !== 'Remaining') return -1;
                    if (a.stat !== 'Remaining' && b.stat === 'Remaining') return 1;
                    return 0;
                  })
                  .flatMap((record, recordIndex) =>
                    record.tests.map((test, testIndex) => (
                      <tr key={`${recordIndex}-${testIndex}`}>
                        <td>{count++}</td>
                        <td>{test.t_name}</td>
                        <td>{record.p_id}</td>
                        <td>{record.d_name} ({record.d_id})</td>
                        <td>
                          {test.stat === 'Remaining' ? (
                            <input type="file" onChange={(e) => { setFile(e.target.files[0]); setT_name(test.t_name); setP_id(record.p_id); setSelectedTest(recordIndex, test.t_name) }} accept="application/pdf" />
                          ) : (
                              hiddenRows.includes(recordIndex) ? null : <span>*report has been sent*</span>
                            )}
                          <center><input type="file" className='hidvi' onChange={(e) => { setFile(e.target.files[0]); setP_id(record.p_id); setT_name(test.t_name); setSelectedTest(recordIndex, test.t_name) }} accept="application/pdf" /></center>
                        </td>
                        <td>
                          {test.stat === 'Remaining' ? (
                            <button className="btn btn-primary" onClick={() => {handleReportSubmit(recordIndex); setT_name(test.t_name); setP_id(record.p_id); setSelectedTest(test.t_name)}}>Submit</button>
                          ) : (
                              <>
                                {hiddenRows.includes(recordIndex) ? (
                                  <button className="btn btn-primary" onClick={() => { handleReportSubmit(recordIndex); setP_id(record.p_id); setT_name(test.t_name); setSelectedTest(recordIndex, test.t_name)}}>Submit</button>
                                ) : (
                                    <>
                                      <button className="btn btn-danger vihloo" data-bs-toggle="modal" data-bs-target={`#exampleModal-${recordIndex}-${testIndex}`}>Edit</button>
                                      <button className="btn btn-warning vihloo" onClick={() => showPDF(test.report)}>View</button>
                                    </>
                                  )}
                              </>
                            )}
                            {/* Modal */}
                          <div className="modal fade" id={`exampleModal-${recordIndex}-${testIndex}`} tabIndex="-1" aria-labelledby={`exampleModalLabel-${recordIndex}-${testIndex}`} aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h1 className="modal-title fs-5" id={`exampleModalLabel-${recordIndex}-${testIndex}`}>Change file for {test.t_name}</h1>
                                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                  <label for="type">Choose Report: </label>
                                  <input type="file" onChange={(e) => { setFile(e.target.files[0]); setP_id(record.p_id); updateSelectedTest(recordIndex, test.t_name) }} accept="application/pdf" />
                                </div>
                                <div className="modal-footer">
                                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                  <button type="button" onClick={() => {handleReportSubmit(recordIndex)}} className="btn btn-primary">Submit</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
    <>
      <center><h2 style={{ marginTop: "16rem", color: "red" }}>No tests found</h2></center>
      <center><h4>(Once doctors upload them, they will be shown here )</h4></center>
    </>
  )}
      </>

      </>
    }
    </>
    <ToastContainer 
      position="top-center"
      autoClose={2000}
      newestOnTop
      closeOnClick={true}
      rtl={false}
      draggable
      pauseOnHover={false}
      theme="colored"/>
    </>
  )
}
export default Dashboard