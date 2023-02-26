import React, { useState } from "react";
import NumberContext from './numberContext'

const NumberState = (props)=>{
   const s1 = []
    const [state, setState] = useState(s1);
    const url = "http://localhost:5000";
    // Fetch all numbers\
    const fetchnumber = async()=>{
      const response = await fetch(`${url}/number/getallnumbers`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
      });
      const json = await response.json(); 
      setState(json)
    }
    // Add Number
  const addNumber = async(name, number, email, label)=>{
    const response = await fetch(`${url}/number/addnumber`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }, body: JSON.stringify({ name, number, email, label})
    });
    const num =  await response.json(); 
    setState(state.concat(num))
  }
    // Update existing number
  const editnumber= async (id, name, number, email, label)=>{
    // for callink api
    const response = await fetch(`${url}/number/updatenumber/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')

      },  body: JSON.stringify({name, number, email, label}) 
    });
    const json = await response.json(); 
    console.log(json)
    const newnumber = JSON.parse(JSON.stringify(state))
    // for editing
    for (let index = 0; index < newnumber.length; index++) {
      const element = newnumber[index];
      if(element._id===id){
         newnumber[index].name = name;
         newnumber[index].number = number;
         newnumber[index].email = email;
         newnumber[index].label = label;
         break;
      };
      
    }
    setState(newnumber);
  }
  // Delete a number
  const dltnumber = async(id)=>{
    const response = await fetch(`${url}/number/deletenumber/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      } 
    });
    const json =  response.json(); 
    console.log(json)
    const newNote = state.filter( (num)=>{return num._id!==id})
   setState(newNote)
  }
  return(
    <NumberContext.Provider value = {{state, addNumber, dltnumber, fetchnumber,editnumber }}>
            {props.children}
        </NumberContext.Provider>
    )

  }
export default NumberState;