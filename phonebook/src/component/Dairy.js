import React, { useEffect } from "react";
import { useContext, useState } from "react";
import dairyContext from "../context/dairyContext";
import { useNavigate, Link } from "react-router-dom";

const Dairy = (props) => {
  const navigate = useNavigate();
  const num = useContext(dairyContext);
  const {state, addnote, fetchnote, editnote, deletenote} = num;
  const [note, setNote] = useState({
    title:"",
    description:"",
    tag:""
  })
  
  useEffect(()=>{
    if(localStorage.getItem('token')){
    fetchnote();
    }
    else{
      navigate('/login')
    }
  }, [])
  const handlerclick = (e)=>{
    e.preventDefault();
    if(!(note.title.length>3)){
      props.showAlert("Invalid Title", 'danger')
    }
   else if(!(note.description.length>10)){
    console.log(note.description.length)
      props.showAlert("Invalid Description", 'danger')
    }
  
    else{
    addnote(note.title, note.description, note.tag)
    props.showAlert("Suuccesfully Added the Note", 'succes')     
    document.getElementById("form").style.display = "none"
    }
    
  }

  
  const handlerchange = (e)=>{
    e.preventDefault();
    setNote({...note, [e.target.name]:e.target.value })
  }
 
const noteform = ()=>{
  document.getElementById("form").style.display = "block"
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("number").value = "";
  document.getElementById("label").value = "";
}
  return (
    <div className="contact">
    <div className="header">
<h1>Notes</h1>
<button id = "addcontactbtn notebtn" onClick={noteform}>  Add Note </button>
</div>
<div id="form" className=" form">
        <i id="dairycross" className="fa-sharp fa-solid fa-xmark" onClick={()=>{
    document.getElementById("form").style.display = "none"
        }}></i>
        <div className="dairyform">
            <label htmlFor="title">Title:</label>
            <input type="text"id="title" required minLength={3} name='title'onChange={handlerchange} placeholder=""/>
            <label htmlFor="description">Description:</label>
            <textarea name="description" id="description" onChange={handlerchange} cols="30" rows="3"></textarea>
            <label htmlFor="tag">Tag:</label>
            <input type="text" id="tag" name='tag' onChange={handlerchange}/>
        <button type="submit" onClick={handlerclick} >Add Note</button>
        </div>
    </div>

    <div className="noteContainer">
     { state.map((e)=>{
      return(  <div className="note">
          <h3>{e.title}</h3>
          <p>{e.description.length>100? (e.description).slice(0,90) +  "Read More..." : (e.description).slice(0,100) }</p>
                  <i className="fa-solid fa-trash-can" onClick={()=>{
                    if(e._id==null){
                    alert("Can't delete Relaod the site");
                    }
                    else{
    props.showAlert("Suuccesfully Deleted the number", 'succes')  
                   deletenote(e._id)
                    }
                  
                  }} ></i>
        </div>)
      })}
    </div>
     
 </div>
  )
}

export default Dairy
