import React, {useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Form, Input, Modal,Select} from 'antd';
import '../styles/login.css';
import Spinner from './Spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import logo from '../assests/logo.jpg';
import doctor from '../assests/doctor.jpg';
import labtech from '../assests/labtech.jpg';
import citizen from '../assests/citizen.jpg';

const { Option } = Select;
export default function Login(props) {
    const [person,setPerson] = useState("patient");
    const navigate = useNavigate()
    const [p_id, setP_id] = useState('')
    const [password, setPassword] = useState('')
    const [spin,setSpin] = useState(false)
 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [email, setEmail] = useState('')
    const showModal = () => { setIsModalOpen(true); };
    const handleCancel = () => { setIsModalOpen(false); };

    const handleOk = async (e) => {
        setSpin(true);
        const res = await fetch('http://localhost:3605/sendMail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, person })
        })
        await res.json();

        if (res.status===201) {
            setSpin(false);
             
            toast.success("Email is sent successfully");
            handleCancel();            
        }
        else if(res.status===402){
            setSpin(false);
            toast.error("Email is not registered");
            handleCancel();
        }

    };
 
    const handleLogin = async()=>{
        setSpin(true);
        try {
            const res = await fetch('http://localhost:3605/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ p_id, password, person })
        })
        const data = await res.json();

        if (res.status===201) {
            localStorage.setItem("person",person)
            localStorage.setItem("token",(data.token));
            if (person==='Doctor') {
                localStorage.setItem("d_id",p_id);
            }else if(person==="patient"){
                localStorage.setItem("p_id",p_id);
            }else{
                localStorage.setItem("l_id",p_id);
            }
            props.setAuth(JSON.stringify(data.token));
            setSpin(false);
            navigate('/');             
        }
        else if(data.message === "Fill"){
            setSpin(false);
            toast.error("Please fill all details")
        } 
        else {  
            setSpin(false);       
            toast.error("Invalid credentials")
        }
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <>
        <>
         {
            spin && <Spinner/>
         }
        </>
        <>
        { 
           !spin && <main className='padding'>
                <div className="box">                   
                    <div className="inner-box">
                        <div className="loginLeft">
                            <div className="header">
                                <div >
                                    <h2>Welcome</h2>
                                    <h5>Login</h5>
                                </div>
                                <img src={logo} alt="logo" className='logoLogin' />
                            </div>
                            <div className="forms-wrap">
                                <Form name="basic" initialValues={{ remember: true, }} className='loginform'>
                                    <Form.Item
                                        label={person==='patient'?'Patient Id':person + " Id"}
                                        name="userID"
                                        rules={[{ required: true, },]}
                                    >
                                        { <Input autoComplete='off' onChange={(e) => setP_id(e.target.value)} /*autocomplete="off"*//>}
                                    </Form.Item>

                                    <Form.Item
                                        label="Password"
                                        name="password"
                                        rules={[{ required: true, },]}
                                    >
                                        <Input.Password  autoComplete='off' onChange={(e) => setPassword(e.target.value)} />
                                    </Form.Item>

                                    <Form.Item
                                        label="Login as"
                                        name="dropdown"
                                        initialValue="Patient"
                                     >
                                        <Select onChange={(value) => setPerson(value)}>
                                            <Option value="patient">Patient</Option>
                                            <Option value="Doctor">Doctor</Option>
                                            <Option value="Lab Technician">Lab Technician</Option>
                                        </Select>
                                    </Form.Item>

                                    <Form.Item wrapper Col={{ offset: 8, span: 16, }} >
                                        <Button type="primary" onClick={handleLogin} htmlType='submit'>
                                            Submit
                                        </Button>
                                    </Form.Item>
                                </Form>
                                <p className="text">
                                    Forgotten your password or you login datails?
                                    <a href="#" onClick={showModal}><br />Get help</a> for signing in
                                </p>
                            
                                <Modal title="Enter your Registered email to get the credentials" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                                    <br />
                                    <Form.Item
                                        label="Email"
                                        name="email"
                                        rules={[{ required: true },]}>
                                        <Input  autoComplete='off' onChange={(e) => setEmail(e.target.value)} />
                                    </Form.Item>
                                </Modal>
                            </div>
                        </div>

                        <div className="loginRight">
                          <img src={person==="Doctor"?doctor:person==="patient"?citizen:labtech} alt="doctor" width='70%' height='70%' />
                        </div>

                    </div>
                </div>
           </main> 
        }
        <ToastContainer 
                position="top-center"
                autoClose={2000}
                newestOnTop
                closeOnClick={true}
                rtl={false}
                draggable
                pauseOnHover={false}
                theme="colored"/>
        </>
        </>
    )
}