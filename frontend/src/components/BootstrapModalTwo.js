// import React, { useEffect, useState } from 'react';

// const BootstrapModalTwo = () => {
//   const [modalDisplayed, setModalDisplayed] = useState(true);

//   useEffect(() => {
//     const modalElement = document.getElementById('exampleModal');
//     const modal = new window.bootstrap.Modal(modalElement);
//     const checkModal = localStorage.getItem("checkModal");

//     if(!checkModal){
//       if (modalDisplayed) {
//         modal.show();
//       } else {
//         modal.hide();
//       }
  
//       const hideHandler = () => {
//         setModalDisplayed(false);
//       };
  
//       modalElement.addEventListener('hidden.bs.modal', hideHandler);
//       localStorage.setItem('checkModal',true);
//       return () => {
//         modalElement.removeEventListener('hidden.bs.modal', hideHandler);
//       };
//      }

//   }, [modalDisplayed]);

//   const closeModal = () => {
//     setModalDisplayed(false);
//   };
 
//   return (
//     <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//       <div className="modal-dialog modal-dialog-centered">
//         <div className="modal-content">
//           <div className="modal-header">
//             <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
//           </div>
//           <div className="modal-body">
//             ...
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BootstrapModalTwo;
