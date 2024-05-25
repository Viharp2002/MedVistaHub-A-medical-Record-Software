import React, { useEffect, useState } from 'react';
import "../styles/page.css";
import { Link } from 'react-router-dom';
import Hospital1 from '../assests/hospital1.jpeg';
import Hospital2 from '../assests/hospital2.jpeg';
import Hospital3 from '../assests/hospital3.jpeg';
import Hospital4 from '../assests/hospital4.jpeg';
import Hospital5 from '../assests/hospital5.jpeg';
import Hospital6 from '../assests/hospital6.jpeg';
import Hospital7 from '../assests/hospital7.jpeg';
import Hospital8 from '../assests/hospital8.jpeg';
import Spinnerr from "../components/Spinnerr";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from './Spinner';
import { FaComments } from 'react-icons/fa';
import BootstrapModal from './BootstrapModal';
function ChatButton() {

  return (
    <div className="chat-button">
      {/* Use the chat icon within the button */}
      <button onClick={() => handleChatButtonClick()}>
        <FaComments />
      </button>
    </div>
  );
}

function handleChatButtonClick() {
  if (document.getElementById('vimch').style.display == "block") {
    document.getElementById('vimch').style.display = "none";
  }else{
    document.getElementById('vimch').style.display = "block";
  }
}

function Home(props) {
  const token = localStorage.getItem('token');
    
  const person = localStorage.getItem("person");
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [getChat,setGetChat] = useState([]);
   
  const handleMessageSend = async() => {
    if (inputValue.trim() !== "") {
      setMessages([...messages, inputValue]);
      setInputValue(""); // Clear input field
    }
    const message = inputValue;
    const res = await fetch('http://localhost:3605/storeChat',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({message,person})
    })

    await res.json();

    if (res.status===201) {
     } else {
        alert("not done");
    }
  }; 

  useEffect(()=>{
    const getPatientName = async()=>{
      const res = await fetch(`http://localhost:3605/patientName`,{
       method: 'GET',
       headers:{
        Authorization: token
      }
      })
  
      const data = await res.json();

      if (res.status===201) {
        setPatient(data);
      } else {
        setPatient(null);
      }
    };

    getPatientName();
    console.log(patient)
  },[])
  
  useEffect(()=>{
      const handleGetMessage = async()=>{
        try {
            const res = await fetch('http://localhost:3605/getChat/', {
              method: 'GET',
          })
          const data = await res.json();
          
          if (res.status===201) {
            setGetChat(data);
          } else {
            alert("not");
          }
        } catch (error) {
            console.log(error);
        }
      } ;
      
      handleGetMessage();
    },[messages,setMessages,inputValue,setInputValue,getChat,setGetChat])

  const[fname,setFname] = useState("")
  const[email,setEmail] = useState("")
  const[city,setCity] = useState("Select city")
  const[selectedDoctor, setSelectedDoctor] = useState("Select the nearest doctor");
  const[doctor,setDoctor] = useState([])
  const[patient,setPatient] = useState("")
  const[adate,setAdate] = useState("") 
  const [spin,setSpin] = useState(false)
  const[spinn,setSpinn] = useState(true);

  useEffect(() => {
    doctorList();
  }, [city]);
  
  const doctorList = async()=>{
    if (city != "Select city") {
      const res = await fetch(`http://localhost:3605/doctorList/${city}`,{
       method: 'GET'
      })
  
      const data = await res.json();
  
      setDoctor(data);
    }else{
      setDoctor([]);
    }  
 };

   useEffect(()=>{
    setTimeout(() => {
      setSpinn(false);
    }, 1000);
  },[])

  const contactMe = async()=>{
    setSpin(true); 
     
    if (patient!==null) {
      setFname(patient.nameOfEntity);
      setEmail(patient.email);
    }
    try {
      console.log(fname);
      const res = await fetch('http://localhost:3605/contactMe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({fname,email,adate,selectedDoctor,city})
    })
    await res.json();
     
    if (res.status===201) {  
      setSpin(false)
      toast.success("We have received your message");         
       
      setEmail("");
      setFname("");
      setCity("");
      setDoctor([]);
      setAdate("");
    } else {
      setSpin(false)
      toast.error("Sorry! try again");
    }
    } catch (error) {
      console.log(error);
      setSpin(false);
    }
  }

  //past date blur
  const getCurrentDate =()=> {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();

    if (month < 10) {
        month = '0' + month;
    }
    if (day < 10) {
        day = '0' + day;
    }

    return `${year}-${month}-${day}`;
}
  return (
    <> 
     <>
     { (person===null || person==='patient') && 
      <BootstrapModal/>
     }
      {spinn && <Spinner/>}
     </>
     {!spinn && <>  
       {
          person === null &&
          <>
          <div className="containerV">
            <section>
            <em>WELCOME !!</em>
            <h1>We aim to enhance the productivity of medical sector</h1>
            <h4>From streamlined lab operations to comprehensive healthcare ecosystem, we take care of our patients.</h4>
            <Link to='/login' className='btn1'>Login</Link>
            </section>
          </div> 
          </>
          }

        {
            person ==='Doctor' &&
            <>
            <div className="containerV">
            <section>
            <em>WELCOME DOCTOR</em>
            <h1>Find your activity</h1>
            <h4>Doctors are dedicated healers, combining expertise</h4>
            <h4>and empathy to safeguard and improve lives.</h4>
            <Link to="/dashboard" className="btn1" onClick={()=>{localStorage.setItem("reasonDoctor",'test')}}>Test Results</Link>
            <Link to="/dashboard" className="btn1" onClick={()=>{localStorage.setItem("reasonDoctor",'find')}}>Find Patient</Link>
            </section>
            </div>    
            </>
          }
          
          {
            person === 'Lab Technician' &&
            <>
            <div className="containerV">
            <section>
            <em>WELCOME LAB TECHNICIAN</em>
            <h1>Take the world's best quality Treatment</h1>
            <h4>Newly uploaded tests will be shown on priority bases. Communicate with doctors if any misunderstanding happens.</h4>
            <Link to="/dashboard" className="btn1">Visit</Link>
            </section>
            </div>
            </>
          }

          {  
            person === 'patient' &&
            <>
            <div className="containerV">
            <section>
            <em>WELCOME CITIZEN</em>
            <h1>Explore beneficial schemes</h1>
            <h4>Explore the government schemes and take the maximum benefits of them. Don't forget to apply before the due date.</h4>
            <Link to="/schemes" className="btn1">Explore schemes</Link>
            </section>
            </div>
            </>
          }  

          {
            (person == "patient" || person==null) &&
            <section className="section1">
            <table>
            <tr>
            <td>
            <div className="form">
            <h4>REQUEST FOR YOUR</h4>
            <h1>Consultation</h1>
            {
            patient ? <input type="text" name="fname" value={patient.nameOfEntity} id="fname" disabled maxlength="60" required /> :<input type="text" name="fname" onChange={(e)=>setFname(e.target.value)} id="fname" placeholder='Name' maxlength="60" required />
            }
            {
            patient ?<input type="email" name="email" id="email" disabled={patient?true:false}  value={patient?patient.email:""} maxlength="100" required />  :<input type="email" name="email" onChange={(e)=>setEmail(e.target.value)} id="email" disabled={patient?true:false}  value={patient?patient.email:""} placeholder="Email" maxlength="100" required />
            }
            <select name="city" value={city} onChange={(e)=>setCity(e.target.value)}>
              <option value="Select city">Select city</option>
              <option value="Ahmedabad">Ahmedabad</option>
              <option value="Anand">Anand</option>
              <option value="Amreli">Amreli</option>
              <option value="Arvalli">Arvalli</option>
              <option value="Bharuch">Bharuch</option>
              <option value="Bhavnagar">Bhavnagar</option>
              <option value="Bhuj">Bhuj</option>
              <option value="Baroda">Baroda</option>
              <option value="Banaskatha">Banaskatha</option>
              <option value="Dwarka">Dwarka</option>
              <option value="Dahod">Dahod</option>
              <option value="Gandhinagar">Gandhinagar</option>
              <option value="Himmatnagar">Himmatnagar</option>
              <option value="Idar">Idar</option>
              <option value="Junagadh">Junagadh</option>
              <option value="Jamnagar">Jamnagar</option>
              <option value="Kutch">Kutch</option>
              <option value="Kheda">Kheda</option>
              <option value="Mehsana">Mehsana</option>
              <option value="Morbi">Morbi</option>
              <option value="Nadiad">Nadiad</option>
              <option value="Porbandar">Porbandar</option>
              <option value="Rajkot">Rajkot</option>
              <option value="Surat">Surat</option>
              <option value="Surendranagar">Surendranagar</option>
              <option value="Sabarkantha">Sabarkantha</option>
              <option value="Valsad">Valsad</option>
              <option value="Vapi">Vapi</option>
              <option value="Vadodra">Vadodra</option>
            </select>
            <select name="service" value={selectedDoctor} onChange={(e)=>setSelectedDoctor(e.target.value)}>
              <option value="Select the nearest doctor">Select the nearest doctor</option>
              {
                Array.isArray(doctor) && doctor.length > 0 ? (
                  doctor.map((doctor, index) => (
                    <option value={doctor.nameOfEntity} key={index}>{doctor.nameOfEntity}</option>
                  ))
                ) : (
                  <option value="No doctors found">No doctors found</option>
                )
              }
            </select>

            <input type="date" name="date" onChange={(e)=>setAdate(e.target.value)} min={getCurrentDate()}  id="date" placeholder="" required />
            <ToastContainer 
                  position="top-center"
                  autoClose={2000}
                  newestOnTop
                  closeOnClick={true}
                  rtl={false}
                  draggable
                  pauseOnHover={false}
                  theme="colored"/>
            {spin &&<Spinnerr/>}
            {
              !spin && <button type="submit" className="btn2" id='vihus' onClick={contactMe}>BOOK APPOINTMENT</button>
            }
            </div>
            </td>
            <td>
            <em>CONTACT US</em>
            <h1>Get better care for your health</h1>
            <p>If you require guidance or advice, reaching out for a consultation can be a valuable step. Contacting a professional or expert in the relevant field allows you to discuss your concerns, ask questions, and receive personalized insights or recommendations.</p>
            <p>Whether seeking legal advice, medical expertise, or business consultation, reaching out to the right contact ensures that you can make informed decisions and navigate challenges effectively.</p>
            </td>
            </tr>
            </table>
            </section>
          }
          <section className="section2">
          <div className="cards">
          <div className="card">
          <i className="fa fa-medkit"></i>
          <h1>Qualified Doctors</h1>
          <p>Empowering health through expertise, qualified doctors heal with precision and compassion.</p>
          </div>
          <div className="card">
          <i className="fa fa-certificate"></i>
          <h1>Certified Services</h1>
          <p>Experience peace of mind with our certified services, ensuring excellence in every aspect.</p>
          </div>
          <div className="card">
          <i className="fa fa-stethoscope"></i>
          <h1>Advanced Equipment</h1>
          <p>Unlocking possibilities with technology, our advanced equipment sets new standards in precision.</p>
          </div>
          <div className="card">
          <i className="fa fa-heartbeat"></i>
          <h1>Emergency Service</h1>
          <p>Our emergency service is a lifeline in critical moments, prioritizing your well-being with urgency.</p>
          </div>
          </div>
          </section>

          <section className="section3">
          <div className="cards">
          <div className="cardV">
          <section>
          <h1>Laboratory Services</h1>
          <h4>Precision meets innovation in our laboratory services, delivering accurate results to drive health and research forward.</h4>
          </section>
          </div>
          <div className="cardV">
          <section>
          <h1>General Treatment</h1>
          <h4>Comprehensive care for holistic well-being, our general treatment ensures personalized solutions.</h4>
          </section>
          </div>
          <div className="cardV">
          <section>
          <h1>Orthopedician</h1>
          <h4>Restoring mobility, our orthopedicians specialize in precision care, providing expert solutions for bone and joint health.</h4>
          </section>
          </div>
          </div>
          <div className="content">
          <h1>We are well experienced doctors</h1>
          <p>Your wealth of experience in medicine undoubtedly enhances the quality of care you provide to your patients. Your dedication to the field is commendable, and I'm here to assist with any information or support you may need.</p>
          </div>
          </section>

          <section className="section4">
          <div className="title_header">
          <h1>Our Gallery Portfolio</h1>
          </div>
          <div className="row">
          <div className="column">
          <img src={Hospital1} style={{width:"100%"}} onclick="openModal();currentSlide(1)" className="hover-shadow cursor"/>
          </div>
          <div className="column">
          <img src={Hospital2} style={{width:"100%"}} onclick="openModal();currentSlide(2)" className="hover-shadow cursor"/>
          </div>
          <div className="column">
          <img src={Hospital3} style={{width:"100%"}} className="hover-shadow cursor"/>
          </div>
          <div className="column">
          <img src={Hospital4} style={{width:"100%"}} className="hover-shadow cursor"/>
          </div>
          <div className="column">
          <img src={Hospital5} style={{width:"100%"}} className="hover-shadow cursor"/>
          </div>
          <div className="column">
          <img src={Hospital6} style={{width:"100%"}} className="hover-shadow cursor"/>
          </div>
          <div className="column">
          <img src={Hospital7} style={{width:"100%"}} className="hover-shadow cursor"/>
          </div>
          <div className="column">
          <img src={Hospital8} style={{width:"100%"}} className="hover-shadow cursor"/>
          </div>
          </div>
          </section>    
          
          {(person==='Doctor' || person==='Lab Technician') && <ChatButton />}

        {
          (person==='Doctor' || person==='Lab Technician') &&
          <div className="chat-container" id='vimch'>
            <div className="chat-box">
                <center>Messages are end-to-end encrypted</center>
              <div className="chat-message received">
                {getChat
                .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
                .map((messagee, index) => (
                  <div key={index} className={`chat-message ${messagee.person === person ? 'sent' : 'received'}`}>
                    {messagee.message.trim() !== '' ? (
                      <div className="message-content">{messagee.message}</div>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); }}>
              <input
                type="text"
                value={inputValue}
                name="messageInp" id="messageInp"
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                autoComplete= "off"
              />
              <button type="submit" onClick={handleMessageSend} id="send-button">Send</button>
            </form>
          </div>
        }
     </>}
     </>
  )
}

export default Home
