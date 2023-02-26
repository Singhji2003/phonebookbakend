import  { useState } from "react";
import DairyContext from './dairyContext'
const DairyState = (props)=>{
    const s1 = []
    const [state, setState] = useState(s1);
    const url = "http://localhost:5000";
    // Fetch all numbers\
    const fetchnote = async()=>{
      const response = await fetch(`${url}/dairy/getallnotes`, {
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
  const addnote = async(title, description , tag)=>{
    const response = await fetch(`${url}/dairy/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }, body: JSON.stringify({ title, description , tag})
    });
    const note =  await response.json(); 
    setState(state.concat(note))
  }
    // Update existing number
  const editnote = async (id,title, description , tag)=>{
    // for callink api
    const response = await fetch(`${url}/dairy/updatenote/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')

      },  body: JSON.stringify({title, description , tag}) 
    });
    const json = await response.json(); 
    console.log(json)
    const newNote = JSON.parse(JSON.stringify(state))
    // for editing
    for (let index = 0; index < newNote.length; index++) {
      const element = newNote[index];
      if(element._id===id){
         newNote[index].title = title;
         newNote[index].description = description;
         newNote[index].tag = tag;
         break;
      };
      
    }
    setState(newNote);
  }
  // Delete a number
  const deletenote = async(id)=>{
    const response = await fetch(`${url}/dairy/deletenote/${id}`, {
      method: 'delete',
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
      <DairyContext.Provider value = {{state, addnote, fetchnote, editnote, deletenote}} >
        {props.children}
      </DairyContext.Provider>
    )
}
export default DairyState;