import React, { useState } from 'react'
import {Link , useNavigate } from "react-router-dom"
import styled from "styled-components";
import Logo from "../assets/61fb2e7aca0c9e8b9e7bde5db155d538.webp";
import "./Register.scss";
import {ToastContainer , toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from '../utils/APIRoutes';

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username : "",
    email : "",
    password : "",
    ConfirmPassword : "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(handleValidation()){
      console.log("in validation", registerRoute)

      const {password ,  username , email} = values;

      const {data} = await axios.post(registerRoute, {
        username,
        email,
        password,
      });

      if(data.status === false)
      {
        toast.error(data.msg, toastObject);
      }
      if(data.status === true)
      {
        localStorage.setItem('chat-app-user', JSON.stringify(data.user));
        navigate("/");
      }
    }
  }

  const toastObject = {
    position : "bottom-right",
    autoClose : 8000,
    pausOnHover: true,
    theme: "dark",
    }


  const handleValidation = () =>{
    const {password , ConfirmPassword , username , email} = values;

    if(password !== ConfirmPassword) 
    {
      toast.error("Password and ConfirmPassword are not matching",toastObject);
      return false;
    }

    else if(username.length < 3)
    {
      toast.error("Username Should be greater than 3 characters",toastObject);
      return false;  
    }

    else if(password.length < 8)
    {
      toast.error("Password should be greatere than 8 characters ",toastObject);
      return false;
    }

    else if(email === "")
    {
      toast.error("Email is required " , toastObject);
    }

    return true;

  }


  const handleChange = (event) => {
    setValues({...values ,[event.target.name]: event.target.value});
  }

  return (
    <>
    <div className='FormContainer'>
      <form onSubmit={(event) => handleSubmit(event)}>
        <div className='brand'>
          <img src={Logo} alt='logo'/>
          <h1>Snappy</h1>
        </div>
          <input type='text' placeholder='Username' name='username' onChange={(e)=> handleChange(e)} /> 
          <input type='email' placeholder='Email' name='email' onChange={(e)=> handleChange(e)} />
          <input type='password' placeholder='Password' name='password' onChange={(e)=> handleChange(e)} />
          <input type='password' placeholder='Confirm Password' name='ConfirmPassword' onChange={(e)=> handleChange(e)} />
          <button type='submit'>Create User</button>
        <span>Already Have An Account ? <Link to = "/login">Login</Link> </span>
      </form>
    </div>
    <ToastContainer />
    </>     
  )
}

export default Register;




