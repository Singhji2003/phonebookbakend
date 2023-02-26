import React from 'react'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
const Login = (props) => {
    let navigate = useNavigate()
    const [credentials, setCredentials] = useState({email:"", password:""})
    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]:e.target.value})
    }
    const submitHandler = async(e)=>{
        e.preventDefault();
        const response = await fetch(`/user/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }, body: JSON.stringify({email: credentials.email,password: credentials.password})
          });
          const json = await response.json(); 
          console.log(json);
          if(json.success){
            localStorage.setItem('token', json.token);
            props.showAlert("Logged in Succesfully", 'succes')     

            navigate("/")
          }
          else{ 
            props.showAlert("invalid details", 'danger')     
          }
    }
  return (
    <div id='login-box'>
    <div className='login-form'>
    <h2>Login</h2>
        <form onSubmit={submitHandler}>
      <label htmlFor="email">Email: </label>
        <input type="email" onChange={onChange} value={credentials.email} name="email" id="email" />
      <label htmlFor="password">Password:</label>
      <input type="password" onChange={onChange} value={credentials.password} name="password" id="password" />
      <button type="submit">Submit</button>
      </form>
    </div>
    </div>
  )
}

export default Login
