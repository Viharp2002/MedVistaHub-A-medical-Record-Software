import { Routes, Route, useNavigate } from "react-router-dom";
import Login from './components/Login';
import Home from './components/Home';
import Navbar from './components/Navbar';
import ResetPassword from "./components/ResetPassword";
import { useState,useEffect } from "react";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
import Spinner from "./components/Spinner";
import Faq from "./components/Faq";
import MedicalHistory from "./components/MedicalHistory";
import Schemes from "./components/Schemes";
import Profile from "./components/Profile";
import ImageGov from "./components/ImageGov";
   
function App() { 
  const navigate = useNavigate();
  
  const [auth,setAuth] = useState();
  const[spin,setSpin] = useState(false);

  const handleLogout = () => {
    setSpin(true); 
    localStorage.removeItem("token");
    localStorage.removeItem("person");
    localStorage.removeItem("d_id");
    localStorage.removeItem("reason");
    setAuth(null);
    localStorage.clear();

    setTimeout(() => {
      setSpin(false);
    }, 1500);
    setTimeout(() => {
      navigate('/login');
    }, 1501);
  };

  useEffect(()=>{
    setAuth(localStorage.getItem("token"));
  },[auth]);

  return ( 
    <>
      <Navbar auth={auth} handleLogout={handleLogout}/>
      {spin && <Spinner/>}
      {
        !spin && <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/dashboard" element={<Dashboard handleLogout={handleLogout}/>} />
          <Route path="/resetPassword/:person/:p_id" element={<ResetPassword />}/>
          <Route path="/login" element={<Login setAuth={setAuth}/>} />
          <Route path="/faq" element={<Faq/>} />
          <Route path="/medicalH/:p_id/:t_name" element={<MedicalHistory/>} />
          <Route path="/schemes" element={<Schemes/>} />
          <Route path="/profile" element={<Profile handleLogout={handleLogout}/>} />
          <Route path="/imggov" element={<ImageGov/>} />
          </Routes> 
      }
      <Footer></Footer>
    </>
  );
}

export default App;
