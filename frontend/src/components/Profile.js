import React, { useEffect, useState } from 'react';
import "../styles/profile.css";
import Spinner from './Spinner';

function Profile(props) {
    const token = localStorage.getItem("token");
    const person = localStorage.getItem("person");
    console.log(person);
    const[personData,setPersonData] = useState();
    const[spin,setSpin] = useState(false);

    useEffect(()=>{
        const getPatientName = async()=>{
          setSpin(true);
          const res = await fetch(`http://localhost:3605/entityName`,{
           method: 'GET',
           headers:{
            Authorization: token
          }
          })
      
          const data = await res.json();
    
          if (res.status===201) {
            setPersonData(data);
            setSpin(false);
          } else {
            setPersonData(null);
            setSpin(false);
          }
        };
        getPatientName();
    },[])
      
  return ( 
    <> 
    {!personData && <Spinner/>}
    <center>
      {
        personData &&
        person==='patient' && 
        <div className="custom-card mx-auto vicard" style={{ width: "400px", height: "500px", border: "1px solid #e0e0e0", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
            <img 
            src={personData && personData.image} 
            className="custom-card-img-top rounded-circle my-2" 
            alt="..."
            style={{ width: "60%", height: "12rem", objectFit: "cover", borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }}
            />
            <div className="custom-card-body" style={{ padding: "15px" }}>
            <h3 className="custom-card-title" style={{ marginBottom: "10px" }}>{personData && personData.nameOfEntity}</h3>
            <h4 className="custom-card-text my-4" style={{ fontSize: "14px" }}><span style={{color:"red"}}>Id:</span> {personData && personData.p_id}</h4>
            <h4 className="custom-card-text my-4" style={{ fontSize: "14px" }}><span style={{color:"red"}}>Email</span>: {personData && personData.email}</h4>
            <h4 className="custom-card-text my-4" style={{ fontSize: "14px" }}><span style={{color:"red"}}>Address:</span> {personData && personData.address}</h4>
            <h4 className="custom-card-text my-4" style={{ fontSize: "14px" }}><span style={{color:"red"}}>Contact:</span> {personData && personData.contact}</h4>
            <h4 className="custom-card-text my-4" style={{ fontSize: "14px" }}><span style={{color:"red"}}>DOB:</span> {personData && personData.dob}</h4>
            </div>
        </div>
       }
       {
        personData &&
        person==='Doctor' && 
        <div className="custom-card mx-auto vicard" style={{ width: "400px", height: "500px", border: "1px solid #e0e0e0", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
            <img 
            src={personData && personData.image} 
            className="custom-card-img-top rounded-circle my-2" 
            alt="..."
            style={{ width: "60%", height: "12rem", objectFit: "cover", borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }}
            />
            <div className="custom-card-body" style={{ padding: "15px" }}>
            <h3 className="custom-card-title" style={{ marginBottom: "10px" }}>{personData && personData.nameOfEntity}</h3>
            <h4 className="custom-card-text my-4" style={{ fontSize: "14px" }}><span style={{color:"red"}}>Id:</span> {personData && personData.p_id}</h4>
            <h4 className="custom-card-text my-4" style={{ fontSize: "14px" }}><span style={{color:"red"}}>Email</span>: {personData && personData.email}</h4>
            <h4 className="custom-card-text my-4" style={{ fontSize: "14px" }}><span style={{color:"red"}}>Address:</span> {personData && personData.address}</h4>
            <h4 className="custom-card-text my-4" style={{ fontSize: "14px" }}><span style={{color:"red"}}>Contact:</span> {personData && personData.contact}</h4>
            <h4 className="custom-card-text my-4" style={{ fontSize: "14px" }}><span style={{color:"red"}}>DOB:</span> {personData && personData.dob}</h4>
            </div>
        </div>
       }
       {
        personData &&
        person==='Lab Technician' && 
        <div className="custom-card mx-auto vicard" style={{ width: "400px", height: "500px", border: "1px solid #e0e0e0", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
            <img 
            src={personData && personData.image} 
            className="custom-card-img-top rounded-circle my-2" 
            alt="..."
            style={{ width: "60%", height: "12rem", objectFit: "cover", borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }}
            />
            <div className="custom-card-body" style={{ padding: "15px" }}>
            <h3 className="custom-card-title" style={{ marginBottom: "10px" }}>{personData && personData.nameOfEntity}</h3>
            <h4 className="custom-card-text my-4" style={{ fontSize: "14px" }}><span style={{color:"red"}}>Id:</span> {personData && personData.l_id}</h4>
            <h4 className="custom-card-text my-4" style={{ fontSize: "14px" }}><span style={{color:"red"}}>Email</span>: {personData && personData.email}</h4>
            <h4 className="custom-card-text my-4" style={{ fontSize: "14px" }}><span style={{color:"red"}}>Address:</span> {personData && personData.address}</h4>
            <h4 className="custom-card-text my-4" style={{ fontSize: "14px" }}><span style={{color:"red"}}>Contact:</span> {personData && personData.contact}</h4>
            <h4 className="custom-card-text my-4" style={{ fontSize: "14px" }}><span style={{color:"red"}}>DOB:</span> {personData && personData.dob}</h4>
            </div>
        </div>
       }
    </center>
  </>
  )
}

export default Profile
