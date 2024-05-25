import React from 'react';
import "../styles/footer.css";

function Footer() {
  return (
    <>
      <img src="https://i.ibb.co/ZLHbWJz/footer.png" className="footer_image"/>
        <footer>
        <div className="column">
        <a className="footer_title">MedVistaHub</a>
        <a>Gujarat Medical Council - Granted by Gujarat Ministry of Health and motivated by All India Association of Medical</a>
        <a href="#" title="Facebook"><i className="fa fa-facebook"></i></a>
        <a href="#" title="Instagram"><i className="fa fa-instagram"></i></a>
        <a href="#" title="Twitter"><i className="fa fa-twitter"></i></a>
        </div>
        <div className="column">
        <a className="footer_title">OTHER LINKS</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms & Conditions</a>
        <a href="#">Ticket</a>
        <a href="#">Contact Us</a>
        </div>
        <div className="column">
        <a className="footer_title">SHORT CUT</a>
        <a href="">Our Services</a>
        <a href="">Our Blog</a>
        <a href="">Our Projects</a>
        <a href="">About Us</a>
        </div>
        <div className="column">
        <a className="footer_title">LATEST NEWS</a>
        <a href="" title="Lorem ipsum dolor sit amet"><img src="https://source.unsplash.com/50x50/?medical,hospital"/></a>
        <a href="" title="Lorem ipsum dolor sit amet"><img src="https://source.unsplash.com/50x50/?medical,doctor"/></a>
        <a href="" title="Lorem ipsum dolor sit amet"><img src="https://source.unsplash.com/50x50/?medical,medicine"/></a>
        <a href="" title="Lorem ipsum dolor sit amet"><img src="https://source.unsplash.com/50x50/?medical,nurse"/></a>
        <a href="" title="Lorem ipsum dolor sit amet"><img src="https://source.unsplash.com/50x50/?medical,injection"/></a>
        </div>
        <div className="column">
        <a className="footer_title">GET IN TOUCH</a>
        <a title="Address"><i className="fa fa-map-marker"></i>  3rd Floor States Council House, Near Cancer Hospital, Civil Hospital Campus, Patel Society, Asarwa, Ahmedabad, Gujarat 380016, India.</a>
        <a href="emailto:" title="Email"><i className="fa fa-envelope"></i> medvistahub@gmail.com</a>
        </div>


        <div className="sub-footer">
        © CopyRights 2024 MedVistaHub || All rights reserved
        </div>
        </footer> 
    </>
  )
}

export default Footer
