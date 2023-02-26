import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './component/Navbar';
import Home from './component/Home';
import About from './component/About';
import NumberState from './context/NumberState';
import Contact from './component/Contact';
import Login from './component/Login';
import SignUp from './component/SignUp';
import Alerts from './component/Alerts';
import { useState } from 'react';
import Dairy from './component/Dairy';
import DairyState from './context/DairyState';
function App() {
const [alert, setAlert] = useState({msg:null, type:null})
const showAlert = (msg, type)=>{
  setAlert({
    msg:msg,
    type: type
  })
  setTimeout(() => {
    setAlert({
      msg:null,
      type: null
    })
  }, 3000);
}
  return (
   <>
   <NumberState>
    <DairyState>
   <BrowserRouter>
   <Navbar showAlert = {showAlert}/>
   <Alerts alert = {alert}/>
      <Routes>
          <Route path="/" element={<Home showAlert = {showAlert}/>} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact showAlert = {showAlert}/>} />
          <Route path="/dairy" element={<Dairy showAlert = {showAlert}/>} />
          <Route path="/login" element={<Login showAlert = {showAlert}/>} />
          <Route path="/signup" element={<SignUp showAlert = {showAlert}/>} />
        
      </Routes>
    </BrowserRouter>
    </DairyState>
    </NumberState>
   </>
  );
}

export default App;
