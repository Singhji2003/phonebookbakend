import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

function Navbar(props) {
    let navigate = useNavigate()
    const logouthandler = ()=>{
        localStorage.removeItem('token')
        props.showAlert("Logged Out Succesfully", 'succes')
        navigate('/login')
    }
  return (
    <nav>
    <div className="navbar">
        <div className="logo">
            <img src={require("./Img/logo.png") }width="60px" alt=""/>
        </div>
        <ul>
            <div className="home navitem">
            <i className="fa-solid fa-house"></i>  <Link to="/">Home</Link>
        </div>
        <div className="contact navitem">
            <i className="fa-solid fa-address-book"></i>  <Link to="/contact">Contacts</Link>
        </div>
        <div className="address navitem">
            <i className="fa-sharp fa-solid fa-book"></i><Link to="/dairy">Dairy</Link>
        </div>
        </ul>
        {!localStorage.getItem('token')? <div className="button ">
           <Link to="/login"> <button>Login</button></Link>
           <Link to="/signup"> <button>Sign up</button></Link>
        </div>: <button onClick={logouthandler}>Log Out</button>}
    </div>
</nav>
  )
}

export default Navbar
