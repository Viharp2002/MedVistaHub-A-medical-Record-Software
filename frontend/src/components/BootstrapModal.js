import React, { useEffect, useState } from 'react';
import modalImage from "../assests/modal.png";
import "../styles/bootstrapModal.css";

const BootstrapModal = () => {
  const [modalDisplayed, setModalDisplayed] = useState(true);
  const [img, setImg] = useState(null);

  useEffect(() => {
    const modalElement = document.getElementById('exampleModal');
    const modal = new window.bootstrap.Modal(modalElement);
    const checkModal = localStorage.getItem("checkModal");

    if(!checkModal){
      if (modalDisplayed) {
        modal.show();
      } else {
        modal.hide();
      }
  
      const hideHandler = () => {
        setModalDisplayed(false);
      };
  
      modalElement.addEventListener('hidden.bs.modal', hideHandler);
      localStorage.setItem('checkModal',true);
      return () => {
        modalElement.removeEventListener('hidden.bs.modal', hideHandler);
      };
     }

  }, [modalDisplayed]);

  const closeModal = () => {
    setModalDisplayed(false);
  };

  useEffect(()=>{
    const getImage = async()=>{
      try {
        const res = await fetch('http://localhost:3605/getHomeImg', {
          method: 'GET',
      })
      const data = await res.json();
      
      if (res.status===201) {
         setImg(data.val);
      } else {
        alert("not");
      }
    } catch (error) {
        console.log(error);
    }
    }
    getImage();
  },[])
  return (
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <img id='vihSp' src={img ? img : modalImage} alt="Modal"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BootstrapModal;
