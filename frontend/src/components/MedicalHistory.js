import React, { useEffect, useState } from 'react';
import "../styles/medicalHistory.css";
import { useParams } from 'react-router-dom';
import { pdfjs } from 'react-pdf';

// This line is important to set up workerSrc path
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
 
function MedicalHistory() { 
    const {p_id,t_name} = useParams();
    const[med,setMed] = useState()
    const[temporary,setTemporary] = useState(null)

    useEffect(()=>{
    const getPrecaution = async()=>{
        const res = await fetch(`http://localhost:3605/getPatientInfo/${p_id}/${t_name}`, {
          method: 'GET',
       })
 
       const data = await res.json();
       setMed(data);
        
        setTemporary(data.certificate);
    }

    getPrecaution();
    },[]);
    
    const showPDF = (certificate) =>{
       window.open(`http://localhost:3605/files/${certificate}`,"_blank","noreferrer")
    }
    return (
    <>
    {
        temporary ?
        <div className='bigv'>
            <div class="containerVih">
                <h2 className='vihuuu'>Medical Record Details</h2>
                <div class="detail">
                    <label>Test done:</label>
                    <span id="test_name">{t_name}</span>
                </div>
                <div class="detail">
                    <label>Diagnosis found:</label>
                    <span id="disease_name">{med && med.disease===""?"None":med.disease}</span>
                </div>
                <div class="detail">
                    <label>Precaution:</label>
                    <textarea id="precaution" rows="4" disabled value={med && med.precaution===""?"None":med.precaution}></textarea>
                </div>
                <div class="detail">
                    <label>Medication:</label>
                    <textarea id="medication" rows="4" disabled value={med && med.medication===""?"None":med.medication}></textarea>
                </div> 
                <div class="detail">
                    <label>Certificate:</label>
                    <input type="file" id="certificate" onClick={()=>showPDF(med.certificate)}  />
                    <span id="certificate_file">Certificate File Here</span>
                </div>
            </div>
        </div>
        :
        <>
        <center><h2 style={{marginTop:"18rem", color:"red"}}>No details found</h2></center>
        <center><h4>(Once doctor add information, it will be shown here )</h4></center>
      </>
    } 
    </>
  )
}

export default MedicalHistory