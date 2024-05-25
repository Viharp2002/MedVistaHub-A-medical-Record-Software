import React, { useState,useEffect } from 'react';
import "../styles/faq.css";
import Spinner from './Spinner';

function Faq() {
  const[spin,setSpin] = useState(true);

    const [activeItems, setActiveItems] = useState(Array(9).fill(false)); // Change the size according to the number of FAQs

    const toggleFaq = (index) => {
        setActiveItems(prevItems => {
            const newItems = [...prevItems];
            newItems[index] = !newItems[index];
            return newItems;
        });
    };

    useEffect(()=>{
        setTimeout(() => {
          setSpin(false);
        }, 1000);
      },[])

    return (

    <> 
      <>
       {spin && <Spinner/>}
      </>    
      <> 
      {
        !spin &&
        <div className='vimm'>
            <h1 className='vih1'>Frequently Asked Questions</h1>
            <div className="faq-container">
                <div className={`faq ${activeItems[0] ? 'active' : ''}`}>
                    <h3 className="faq-title">What is a medical health record website?</h3>
                    <p className="faq-text"><ul><li>A medical health record website is an online platform where individuals can securely access, manage, and store their medical records digitally.</li></ul></p>
                    <button className="faq-toggle" onClick={() => toggleFaq(0)}>
                        {activeItems[0] ? (
                            <i className="fa fa-chevron-up"></i>
                        ) : (
                            <i className="fa fa-chevron-down"></i>
                        )}
                     </button>
                </div>
                <div className={`faq ${activeItems[1] ? 'active' : ''}`}>
                    <h3 className="faq-title">What are the benefits of using a medical health record website?</h3>
                    <p className="faq-text">Some benefits include:
                    <ul> 
                       <li>Easy access to medical history anytime, anywhere.</li>
                       <li>Improved communication between patients and healthcare providers.</li>
                       <li>Enhanced coordination of care among multiple healthcare professionals.</li>
                       <li>Reduction of paperwork and administrative burdens.</li>
                       <li>Better organization of health information for personal reference.</li>
                    </ul>
                    </p>
                    <button className="faq-toggle" onClick={() => toggleFaq(1)}>
                        {activeItems[1] ? (
                            <i className="fa fa-chevron-up"></i>
                        ) : (
                            <i className="fa fa-chevron-down"></i>
                        )}
                     </button>
                </div>
                <div className={`faq ${activeItems[2] ? 'active' : ''}`}>
                    <h3 className="faq-title">Is it secure to store my medical records online?</h3>
                    <p className="faq-text"><ul><li>Yes, reputable medical health record websites employ robust security measures, such as encryption and strict access controls, to protect your sensitive information from unauthorized access.</li></ul></p>
                    <button className="faq-toggle" onClick={() => toggleFaq(2)}>
                        {activeItems[2] ? (
                            <i className="fa fa-chevron-up"></i>
                        ) : (
                            <i className="fa fa-chevron-down"></i>
                        )}
                     </button>
                </div>
                <div className={`faq ${activeItems[3] ? 'active' : ''}`}>
                    <h3 className="faq-title">What types of medical records can I store on the website?</h3>
                    <p className="faq-text"><ul>You can store various types of medical records, including:
                    <li>Lab results</li>
                    <li>Imaging reports (X-rays, MRIs, CT scans)</li>
                    <li>Medication lists</li>
                    <li>Immunization records</li>
                    <li>Allergy information</li>
                    <li>Physician notes</li>
                    <li>Hospital discharge summaries</li></ul></p>
                    <button className="faq-toggle" onClick={() => toggleFaq(3)}>
                        {activeItems[3] ? (
                            <i className="fa fa-chevron-up"></i>
                        ) : (
                            <i className="fa fa-chevron-down"></i>
                        )}
                     </button>
                </div>
                <div className={`faq ${activeItems[4] ? 'active' : ''}`}>
                    <h3 className="faq-title">How can I add my medical records to the website?</h3>
                    <p className="faq-text"><ui><li>Typically, you can upload medical records directly to the website or authorize healthcare providers to electronically transmit your records to the platform.</li>
                     <li>Some websites also offer integrations with healthcare systems for seamless data transfer.</li></ui></p>
                    <button className="faq-toggle" onClick={() => toggleFaq(4)}>
                        {activeItems[4] ? (
                            <i className="fa fa-chevron-up"></i>
                        ) : (
                            <i className="fa fa-chevron-down"></i>
                        )}
                     </button>
                </div>
                <div className={`faq ${activeItems[5] ? 'active' : ''}`}>
                    <h3 className="faq-title">Can I share my medical records with healthcare providers?</h3>
                    <p className="faq-text"><ul><li>Yes, most medical health record websites allow you to share your records securely with healthcare providers, either by granting temporary access or by sending them specific records electronically.</li></ul></p>
                    <button className="faq-toggle" onClick={() => toggleFaq(5)}>
                        {activeItems[5] ? (
                            <i className="fa fa-chevron-up"></i>
                        ) : (
                            <i className="fa fa-chevron-down"></i>
                        )}
                     </button>
                </div>
                <div className={`faq ${activeItems[6] ? 'active' : ''}`}>
                    <h3 className="faq-title">How can I ensure the privacy of my medical records on the website?</h3>
                    <p className="faq-text"><ui><li>It's essential to choose a website that complies with relevant privacy regulations, such as HIPAA in the United States.</li>
                    <li>Additionally, you should use strong, unique passwords, enable two-factor authentication if available, and avoid sharing your login credentials with others.</li></ui></p>
                    <button className="faq-toggle" onClick={() => toggleFaq(6)}>
                        {activeItems[6] ? (
                            <i className="fa fa-chevron-up"></i>
                        ) : (
                            <i className="fa fa-chevron-down"></i>
                        )}
                     </button>
                </div>
                <div className={`faq ${activeItems[7] ? 'active' : ''}`}>
                    <h3 className="faq-title">What happens to my medical records if I stop using the website?</h3>
                    <p className="faq-text"><ui><li>Typically, you can download a copy of your medical records from the website before discontinuing your account.</li> 
                    <li>Additionally, some websites may offer options to transfer your records to another platform or provide instructions for securely deleting your data.</li></ui></p>
                    <button className="faq-toggle" onClick={() => toggleFaq(7)}>
                        {activeItems[7] ? (
                            <i className="fa fa-chevron-up"></i>
                        ) : (
                            <i className="fa fa-chevron-down"></i>
                        )}
                     </button>
                </div>
                <div className={`faq ${activeItems[8] ? 'active' : ''}`}>
                    <h3 className="faq-title">Is there a cost associated with using a medical health record website?</h3>
                    <p className="faq-text"><ul><li>It depends on the website. Some platforms offer free basic services with premium features available for a subscription fee.</li> 
                    <li>Others may operate on a subscription-only model. Be sure to review the pricing structure before signing up.</li></ul></p>
                    <button className="faq-toggle" onClick={() => toggleFaq(8)}>
                        {activeItems[8] ? (
                            <i className="fa fa-chevron-up"></i>
                        ) : (
                            <i className="fa fa-chevron-down"></i>
                        )}
                     </button>
                </div>
                <div className={`faq ${activeItems[9] ? 'active' : ''}`}>
                    <h3 className="faq-title">How can I get support if I have questions or encounter issues with the website?</h3>
                    <p className="faq-text"><ul><li>Most medical health record websites provide customer support channels, such as email, phone, or live chat, to assist users with any inquiries or technical difficulties they may experience.</li></ul></p>
                    <button className="faq-toggle" onClick={() => toggleFaq(9)}>
                        {activeItems[9] ? (
                            <i className="fa fa-chevron-up"></i>
                        ) : (
                            <i className="fa fa-chevron-down"></i>
                        )}
                     </button>
                </div>
             </div>
        </div>
      }
      </>
    </>
    );
}

export default Faq;
