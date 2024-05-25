import React, { useState } from 'react';
import { Button, Form, Input} from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/resetPswd.css'
import logo from '../assests/logo.jpg'
import { toast } from 'react-toastify';

export default function ResetPassword() {
  const usNavigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { p_id, person } = useParams();

  const handlePassword = async (e) => {
    try {
      const res = await fetch(`http://localhost:3605/resetPassword`, {
        method: "post",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          password, confirmPassword, p_id, person
        })
      });
      const data = await res.json();

      if (res.status === 201) {
        alert("password updated successfully")
        usNavigate("/login");
      }
      else if(data.message === "Passwords are not matching"){
        //  toast.error("Passwords are not matching");
      }
      else if(data.message === "Fill details"){
        //  toast.error("Fill the details");
      } 
      else {
        console.log(data.error);
      }
    } catch (error) {
      console.log(error);
    }

  }
  return (
    <div >
      <Form name="basic" initialValues={{ remember: true, }} className='resetForm'>
        <img src={logo} alt="" style={{ height: '20vh' }} />
        <div><h1>Reset your password</h1></div>
        <div className='inputs'>
          <Form.Item style={{ width: "50%", marginTop: "60px" }}
            label=<span style={{ color: 'black', fontWeight: "bold", fontSize: "18px" }}>New Password</span>
            name="New Password"
            rules={[{ required: true },]}>
            <Input.Password onChange={(e) => setPassword(e.target.value)} />
          </Form.Item>

          <Form.Item style={{ width: "50%" }}
            label=<span style={{ color: 'black', fontWeight: "bold" , fontSize: "18px" }}>Confirm Password</span>
            name="Confirm Password"
            rules={[
              { required: true, },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("New Password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Passwords do not match!");
                },
              }),
            ]}
          >
            <Input.Password onChange={(e) => setConfirmPassword(e.target.value)} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType='submit' onClick={handlePassword}>
              Submit
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  )
}