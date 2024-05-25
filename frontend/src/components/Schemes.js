import React from 'react';
import "../styles/schemes.css";
import mcard from "../assests/maacard.jpeg";
import ayush from "../assests/ayushman.jpeg";
import bima from "../assests/bima.png";
import cent from "../assests/cent.jpeg";
import bima2 from "../assests/bima2.jpeg";
import ins from "../assests/ins.jpeg";
import karunya from "../assests/karunya.jpeg";
import ysr from "../assests/ysr.jpeg";
import nirmaya from "../assests/nirmaya.png";
import pradhan from "../assests/pradhan.png";
import indra from "../assests/indra.jpeg";
import bha from "../assests/bha.jpeg";

function Schemes() {
        //Search Bar
        const handleSearch = (e) => {
            const namesFromdom = document.getElementsByClassName("search");
            const { value } = e.target;
            const searchQuery = value.toLowerCase();
            const ifnotfound = document.getElementById("found");
            
            let count = 0;
        
            for (const nameElement of namesFromdom) {
                let name = nameElement.textContent.toLowerCase();
                console.log(name);
                
                if (name.includes(searchQuery) || searchQuery === "") {
                    count = 1;
                    nameElement.style.display = "flex";
                    ifnotfound.style.visibility = "hidden";    
                } else {
                    nameElement.style.display = "none";
                 }
            }
        
            if (count === 0) {
                for (const nameElement of namesFromdom) {
                    nameElement.style.display = "none";
                    ifnotfound.style.visibility = "visible";    
                }
            }
        }
        
    return (
        <>
        <div>
            <center>
                <div className="search-container">
                    <form>
                        <div className="search-wrapper">
                            <input type="text" onInput={handleSearch} autoComplete='off' placeholder="Search..." name='search' className="search-input"/>
                            <button type="submit" disabled className="search-button">
                                <i className="fa fa-search"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </center>

            <h3 className="pd-4 text-center my-4" id="found">No, schemes are found.</h3>

            <div className="container my-4">
              <div className="row mb-2 my-4">
                   <div className="card search">
                        <div className="card-image">
                            <img src={mcard} alt="title" />
                        </div>
                        <div className="card-content">
                            <h2 className="card-title ">Mukhyamantri Amrutam Yojna</h2>
                            <p className="card-description">Apply before 1 April, 2025</p>
                            <a href='https://ma.gujarat.gov.in/' target="_blank"><button className="card-button">Explore</button></a>
                        </div>
                    </div>

                    <div className="card search">
                        <div className="card-image">
                            <img src={ayush} alt="title" />
                        </div>
                        <div className="card-content">
                            <h2 className="card-title ">Ayushman Bharat Yojna</h2>
                            <p className="card-description">Apply before 1 May,2024</p>
                            <a href="https://ayushmanbharat.mp.gov.in/" target='_blank'><button className="card-button">Explore</button></a>
                        </div>
                    </div>

                    <div className="card search">
                        <div className="card-image">
                            <img src={bima} alt="title" />
                        </div>
                        <div className="card-content">
                            <h2 className="card-title ">Aam Aadmi Bima Yojna</h2>
                            <p className="card-description">Apply before 31 June,2026</p>
                            <a href="https://www.myscheme.gov.in/schemes/aaby" target="_blank"><button className="card-button" >Explore</button></a>
                        </div>
                    </div>

                    <div className="card search">
                        <div className="card-image">
                            <img src={cent} alt="title" />
                        </div>
                        <div className="card-content">
                            <h2 className="card-title ">Central Government Health Scheme</h2>
                            <p className="card-description">Apply before 31 March,2024</p>
                            <a href="https://cghs.gov.in/CghsGovIn/faces/ViewPage.xhtml" target="_blank"><button className="card-button" >Explore</button></a>
                        </div>
                    </div>

                    <div className="card search">
                        <div className="card-image">
                            <img src={bima2} alt="title" />
                        </div>
                        <div className="card-content">
                            <h2 className="card-title ">Rashtriya Swashthya Bima Yojna</h2>
                            <p className="card-description">Apply before 31 August,2025</p>
                            <a href="https://www.policyx.com/hindi/health-insurance/articles/rashtriya-swasthya-bima-yojana-rsby/#:~:text=%E0%A4%B0%E0%A4%BE%E0%A4%B7%E0%A5%8D%E0%A4%9F%E0%A5%8D%E0%A4%B0%E0%A5%80%E0%A4%AF%20%E0%A4%B8%E0%A5%8D%E0%A4%B5%E0%A4%BE%E0%A4%B8%E0%A5%8D%E0%A4%A5%E0%A5%8D%E0%A4%AF%20%E0%A4%AC%E0%A5%80%E0%A4%AE%E0%A4%BE%20%E0%A4%AF%E0%A5%8B%E0%A4%9C%E0%A4%A8%E0%A4%BE%20%E0%A4%95%E0%A5%87%20%E0%A4%B2%E0%A4%BF%E0%A4%8F%20%E0%A4%AC%E0%A5%80%E0%A4%AE%E0%A4%BE%20%E0%A4%95%E0%A4%B5%E0%A4%B0%E0%A5%87%E0%A4%9C,%E0%A4%AF%E0%A5%8B%E0%A4%9C%E0%A4%A8%E0%A4%BE%20%E0%A4%AE%E0%A5%87%E0%A4%82%20%E0%A4%AD%E0%A5%80%20%E0%A4%B6%E0%A4%BE%E0%A4%AE%E0%A4%BF%E0%A4%B2%20%E0%A4%B9%E0%A5%88%E0%A5%A4" target="_blank"><button className="card-button" >Explore</button></a>
                        </div>
                    </div>

                    <div className="card search">
                        <div className="card-image">
                            <img src={ins} alt="title" />
                        </div>
                        <div className="card-content">
                            <h2 className="card-title ">Karmchari Bima Nigam Yojna</h2>
                            <p className="card-description">Apply before 20 May,2028</p>
                            <a href="https://labour.gov.in/hi/organizationsofmole/employees-state-insurance-scheme-esic" target="_blank"><button className="card-button" >Explore</button></a>
                        </div>
                    </div>

                    <div className="card search">
                        <div className="card-image">
                            <img src={karunya} alt="title" />
                        </div>
                        <div className="card-content">
                            <h2 className="card-title ">Karunya Health Scheme</h2>
                            <p className="card-description">Apply before 1 Dec,2025</p>
                            <a href="https://sha.kerala.gov.in/karunya-arogya-suraksha-padhathi/" target="_blank"><button className="card-button" >Explore</button></a>
                        </div>
                    </div>

                    <div className="card search">
                        <div className="card-image">
                            <img src={ysr} alt="title" />
                        </div>
                        <div className="card-content">
                            <h2 className="card-title ">YSR Health Care Trust</h2>
                            <p className="card-description">Apply before 31 June,2025</p>
                            <a href="https://www.ysraarogyasri.ap.gov.in/" target="_blank"><button className="card-button" >Explore</button></a>
                        </div>
                    </div>

                    <div className="card search">
                        <div className="card-image">
                            <img src={nirmaya} alt="title" />
                        </div>
                        <div className="card-content">
                            <h2 className="card-title ">Nirmaya Health Insurance Scheme</h2>
                            <p className="card-description">Apply before 1 June,2025</p>
                            <a href="https://thenationaltrust.gov.in/content/scheme/niramaya.php" target="_blank"><button className="card-button" >Explore</button></a>
                        </div>
                    </div>

                    <div className="card search">
                        <div className="card-image">
                            <img src={pradhan} alt="title" />
                        </div>
                        <div className="card-content">
                            <h2 className="card-title ">Pradhan Mantri Jan Arogya Yojna</h2>
                            <p className="card-description">Apply before 23 March,2026</p>
                            <a href="https://nha.gov.in/PM-JAY" target="_blank"><button className="card-button" >Explore</button></a>
                        </div>
                    </div>

                    <div className="card search">
                        <div className="card-image">
                            <img src={indra} alt="title" />
                        </div>
                        <div className="card-content">
                            <h2 className="card-title ">Janani Suraksha Yojna</h2>
                            <p className="card-description">Apply before 15 August,2024</p>
                            <a href="https://www.myscheme.gov.in/schemes/jsy" target="_blank"><button className="card-button" >Explore</button></a>
                        </div>
                    </div>

                    <div className="card search">
                        <div className="card-image">
                            <img src={bha} alt="title" />
                        </div>
                        <div className="card-content">
                            <h2 className="card-title ">Bhamashah Bima Yojna</h2>
                            <p className="card-description">Apply before 31 June,2025</p>
                            <a href="https://rajswasthya.nic.in/BSBY.htm" target="_blank"><button className="card-button" >Explore</button></a>
                        </div>
                    </div>
              </div>
            </div>
        </div>
        </>
    );
}

export default Schemes;
