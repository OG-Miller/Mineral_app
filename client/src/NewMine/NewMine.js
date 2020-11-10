import React, { useState } from "react";
import './newMine.css';
import { Link } from 'react-router-dom';


const NewMine = () => {
  const [ mineStatus, setMineStatus ] = useState("");
  const [ newMineTitle, setNewMineTitle ] = useState("");
  const [ newMineBody, setNewMineBody ] = useState("");
  const [ newMineLink, setNewMineLink ] = useState("");


  // const mineStatusChange = (e) => {
  //   setMineStatus(e.target.value);
  //   console.log(mineStatus);
  // }


    // create new mine
  const handleCreateMine = (e) => {
    console.log(mineStatus);
    const newMineData = { title:newMineTitle , body:newMineBody, bookmarkLink: newMineLink , mineStatus: mineStatus};
        // "title": newMineData.title,
        // "bookmarkLink": newMineData.link,
        // "mineStatus": "",
        // "body":""
      // };

    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newMineData)
      
    };

    fetch('http://localhost:5000', options);
    console.log("newMineData" + newMineData);
  }


  return(
    <div className="new-mine-main">
      
      <input className="link-input" placeholder="Link" value={newMineLink} required onChange={(e) => setNewMineLink(e.target.value)}></input>
      <input className="title-input" placeholder="Title" value={newMineTitle} required onChange={(e) => setNewMineTitle(e.target.value)}></input>
      <textarea
      placeholder="Note"
      label="Initial thoughts"
      type="text"
      className="body-input" 
      maxLength="600"
      value={newMineBody}
      onChange={(e) => setNewMineBody(e.target.value)}>
      </textarea>
      
      <hr/>
      <form>
        <label for="polished">Polished  </label>
        <input type="radio" name="option" value={"polished"}
        onChange={(e) => setMineStatus(e.target.value)}/>
        
        <label for="cutting">  Cutting  </label>
        <input type="radio" name="option"  value={"cutting"}
        onChange={(e) => setMineStatus(e.target.value)}/>
        
        <label for="digging">  Digging  </label>
        <input type="radio" name="option"  value={"digging"}
        onChange={(e) => setMineStatus(e.target.value)}/>
      <br/>
      <br/>
      </form>
      <Link to={'/'} style={{textDecoration: 'none'}}>
        <span className="submit-button" onClick={handleCreateMine}>Start Mine!</span>
      </Link>
    </div>
  )
}



export default NewMine;