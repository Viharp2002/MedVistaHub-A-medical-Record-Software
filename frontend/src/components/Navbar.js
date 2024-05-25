import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/navbar.css";

function Navbar(props) {
  const person = localStorage.getItem("person");
  return ( 
    <>
     <nav className="navbar navbar-expand-lg navbar-dark vimc" data-bs-dismiss="collapse">
      <div className="container-fluid">
        <h3 className="navbar-brandd" to="#">MedVistaHub</h3>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav vihar me-auto mb-2 mb-lg-0 text-center text-lg-left">
            <li className="nav-item">
              <Link className="nav-link" to="#"></Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link vihartwo active" aria-current="page" to="/" style={{ fontSize: "20px" }}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#"></Link>
            </li>
            {
              (person===null || person==='patient') &&
              <>
                <li className="nav-item">
                    <Link className="nav-link active vihartwo" to="/faq" style={{ fontSize: "20px" }}>FAQ</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="#"></Link>
                </li>
              </>
            }
            {
              props.auth ?
              <li className="nav-item">
                <Link className="nav-link vihartwo active" to="/dashboard" style={{ fontSize: "20px" }}>Dashboard</Link>
              </li>
              : ""
            }
            { 
              person==="Doctor" &&
             <li className="nav-item">
              <Link className="nav-link" to="#"></Link>
             </li>
             }
            {
              person==="Doctor" &&
              <li className="nav-item">
                    <Link className="nav-link active vihartwo" target='_blank' to="http://localhost:8501/" style={{ fontSize: "20px" }}>Predict</Link>
              </li>
            }
            {
              person &&
             <li className="nav-item">
              <Link className="nav-link" to="#"></Link>
             </li>
             }
             { (person==="patient" || person===null) &&
              <>
               <li className="nav-item">
                  <Link className="nav-link active vihartwo" to="/schemes" style={{ fontSize: "20px" }}>Schemes</Link>
                </li>
              
                <li className="nav-item">
                  <Link className="nav-link" to="#"></Link>
                </li>
              </>
            }
            {
              !props.auth ?
                // <li className="nav-item dropdown">
                //   <Link className="nav-link vihartwo dropdown-toggle active" to="#" style={{ fontSize: "20px" }} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                //     Login
                //   </Link> 
                //   <ul className="dropdown-menu">
                //     <li><Link className="dropdown-item" to="/login/patient">Citizen</Link></li>
                //     <li><Link className="dropdown-item" to="/login/Doctor">Doctor</Link></li>
                //     <li><Link className="dropdown-item" to="/login/Lab Technician">Lab Technician</Link></li>
                //   </ul>
                // </li>
                <li className="nav-item">
                  <Link className="nav-link active vihartwo" to="/login" style={{ fontSize: "20px" }}>Login</Link>
                </li>
                :
                <li className="nav-item dropdown">
                  <Link className="nav-link vihartwo dropdown-toggle active" to="#" style={{ fontSize: "20px" }} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    More
                  </Link> 
                  <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                    <li><Link className="dropdown-item" onClick={props.handleLogout}>Logout</Link></li>
                   </ul>
                </li>
            }
          </ul>
        </div>
      </div>
    </nav>       
    </>
  )
}

export default Navbar
