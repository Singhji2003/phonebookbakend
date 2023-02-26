import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import numberContext from "../context/numberContext";
import { useNavigate } from "react-router-dom";

function Contact(props) {
  const navigate = useNavigate();
  const num = useContext(numberContext);
  console.log(num)
  const { state, fetchnumber } = num;
  const { dltnumber } = num;
  const {addNumber, editnumber} = num
  const [number, setNumber] = useState({
    name:"",
    number:"",
    email:"",
    label:""
  })
  const [enumber, esetNumber] = useState({
    ename:"",
    id:"",
    enumber:"",
    eemail:"",
    elabel:""
  })
  useEffect(()=>{
    if(localStorage.getItem('token')){
    fetchnumber();
    }
    else{
      navigate('/login')
    }
  }, [])
  const handlerclick = (e)=>{
    e.preventDefault();
    if(!(number.name.length>3)){
      props.showAlert("Invalid Name", 'danger')
    }
   else if(!(number.number.length===10)){
      props.showAlert("Invalid Number", 'danger')
    }
   else if(!(number.label.length>3)){
      props.showAlert("Invalid Label", 'danger')
    }
    else if(!(number.email.endsWith('@gmail.com'))){
      props.showAlert("Invalid Email", 'danger')
    }
    else if(number.name===null){
      props.showAlert("Invalid number details", 'danger')

    }
    else{
    addNumber(number.name, number.number, number.email, number.label)
    props.showAlert("Suuccesfully Added the number", 'succes')     
    document.getElementById("form").style.display = "none"
    }
    
  }

  const edithandlerclick = (e)=>{
    e.preventDefault();
    if(!(enumber.ename.length>3)){
      props.showAlert("Invalid Name", 'danger')
    }
   else if(!(enumber.enumber.length===10)){
      props.showAlert("Invalid Number", 'danger')
    }
   else if(!(enumber.elabel.length>3)){
      props.showAlert("Invalid Label", 'danger')
    }
    else if(!(enumber.eemail.endsWith('@gmail.com'))){
      props.showAlert("Invalid Email", 'danger')
    }
   else{
    editnumber(enumber.id, enumber.ename, enumber.enumber, enumber.eemail, enumber.elabel)
    props.showAlert("Suuccesfully Edited the number", 'succes')     
    document.getElementById("editform").style.display = "none"
   }
     
  }
  const handlerchange = (e)=>{
    e.preventDefault();
    setNumber({...number, [e.target.name]:e.target.value })
  }
  const edithandlerchange = (e)=>{
  e.preventDefault();
  esetNumber({...enumber, [e.target.name]:e.target.value })
}
const updateNumber =   (number)=>{
  console.log(number._id)
  esetNumber({ ename:number.name,id:number._id,eemail:number.email,enumber:number.number,elabel:number.label, })
  
}
const numberform = ()=>{
  document.getElementById("form").style.display = "block"
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("number").value = "";
  document.getElementById("label").value = "";
}
const sortTable = ()=> {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("myTable");
  switching = true;
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[0];
      y = rows[i + 1].getElementsByTagName("TD")[0];
      //check if the two rows should switch place:
      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        //if so, mark as a switch and break the loop:
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
  props.showAlert("Succesfully Sorted", 'succes')
}
  return (
    <div className="contact">
    <div className="header">
<h1>Contacts</h1>
<button id = "addcontactbtn"><Link onClick={numberform} > Add Contact</Link></button>
<button><Link onClick={()=>{
  sortTable()
}} > Sort Contact</Link></button>
</div>
<div id="form" className="form">
        <i id="cross" className="fa-sharp fa-solid fa-xmark" onClick={()=>{
    document.getElementById("form").style.display = "none"
        }}></i>
            <label htmlFor="name">Name:</label>
            <input type="text"id="name" required minLength={3} name='name'onChange={handlerchange} placeholder=""/>
            <label htmlFor="number">Number:</label>
            <input type="number" name='number' required minLength={10} maxLength = {10}  onChange={handlerchange} id="number"/>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name='email' onChange={handlerchange}/>
            <label htmlFor="label">Label:</label>
            <input type="text" id="label"  name='label' required minLength={3} onChange={handlerchange} />
        <button type="submit" onClick={handlerclick} >Add Contact</button>
    </div>
<div id="editform" className="form">
        <i id="cross" className="fa-sharp fa-solid fa-xmark" onClick={()=>{
    document.getElementById("editform").style.display = "none"
        }}></i>
            <label htmlFor="name">Name:</label>
            <input type="text"id="ename"  minLength={3} name='ename' onChange={edithandlerchange} placeholder=""/>
            <label htmlFor="number">Number:</label>
            <input type="number" name='enumber' minLength={10} maxLength = {10} onChange={edithandlerchange} id="enumber"/>
            <label htmlFor="email">Email:</label>
            <input type="email" id="eemail" name='eemail' onChange={edithandlerchange}/>
            <label htmlFor="label">Label:</label>
            <input type="text" id="elabel"  minLength={3} name='elabel' onChange={edithandlerchange} />
        <button type="submit" onClick={edithandlerclick} >Update Contact</button>
    </div>
      <table className="table" id="myTable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Number</th>
            <th>Email</th>
            <th>Label</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {state.map((e) => {
            return (
              <tr>
                <td>{e.name}</td>
                <td>{e.number}</td>
                <td>{e.email}</td>
                <td>{e.label}</td>
                <td>
                  <i className="fa-solid fa-pen-to-square"  onClick={()=>{
                    document.getElementById("editform").style.display = "block";
                    document.getElementById("ename").value = e.name;
                    document.getElementById("eemail").value = e.email;
                    document.getElementById("enumber").value = e.number;
                    document.getElementById("elabel").value = e.label;
                    updateNumber(e)
                  }}></i> &nbsp;
                  <i className="fa-solid fa-trash-can" onClick={()=>{
                    if(e._id==null){
                    alert("Can't delete Relaod the site");
                    }
                    else{
    props.showAlert("Suuccesfully Deleted the number", 'succes')  
                   dltnumber(e._id)
                    }
                  
                  }} ></i>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
 </div>
  );
}

export default Contact;
