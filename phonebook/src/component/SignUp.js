import React from 'react'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
const SignUp = (props) => {
    let navigate = useNavigate()
    const [credentials, setCredentials] = useState({name: "",email:"", password:""})
    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]:e.target.value})
    }
    const submitHandler = async(e)=>{
        e.preventDefault();
        const {name, email , password} = credentials;
        const response = await fetch(`/user/new-user`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'              
            }, body: JSON.stringify({name, email, password})
          });
          const json = await response.json(); 
          console.log(json);
          if(json.success){
            localStorage.setItem('token', json.token);
            props.showAlert("SuccesFully Registered", 'succes')     

            navigate("/")
          }
          else{
            alert("Invalid details")

          }
    }
  return (
    <div id='login-box'>
    <div className='login-form'>
<h2>Sign-up</h2>
        <form onSubmit={submitHandler}>
      <label htmlFor="name">Name: </label>
        <input type="text" onChange={onChange} value={credentials.name} name="name" id="name" />
      <label htmlFor="email">Email: </label>
        <input type="email" onChange={onChange} value={credentials.email} name="email" id="email" />
      <label htmlFor="password">Password:</label>
      <input type="password" onChange={onChange} value={credentials.password}  name="password" id="password" />
      <button type="submit">Submit</button>
      </form>
      </div>
    </div>
  )
}

export default SignUp
