import React, { useState } from 'react';
import Spinner from './Spinner';
import '../styles/ImageGov.css'; // Import CSS file for styling

function ImageGov() {
  const [base64Image, setBase64Image] = useState('');
  const [spin, setSpin] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setBase64Image(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async() => {
    setSpin(true);
        try {
            const res = await fetch('http://localhost:3605/uploadImg', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ base64Image })
        })
        const data = await res.json();
        if (res.status===201) {
            setTimeout(() => {
                setSpin(false);       
            }, 1500);
            setTimeout(() => {
                window.location.reload();
            }, 1501);
        } else {
            setTimeout(() => {
                setSpin(false);       
            }, 1500);
            setTimeout(() => {
                alert("Invalid credentials")
            }, 1502);
        }
        } catch (error) {
            console.log(error);
        }

};

  return (
    <div className="containerb">

    <center><div className="detail">    
     <label>Certificate:</label>
     <input type="file" id="certificate" onChange={handleImageChange} />
     <span id="certificate_file">Upload image</span>
    </div></center>
      {base64Image && (
        <div className="preview-container">
          <h2 className="preview-heading">Preview:</h2>
          <div className="image-wrapper">
            <img src={base64Image} alt="Converted to Base64" className="preview-image" />
          </div>
          <button onClick={handleSubmit} className="submit-button">Submit</button>
        </div>
      )}
    </div>
  );
}

export default ImageGov;
