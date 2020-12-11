import React, { useState, useContext, useEffect } from "react";
import './newMine.css';
import { Link } from 'react-router-dom';
import { MinesContext } from '../MinesContext';

const NewMine = () => {
  // if fromEdit then below insures any un-edited fields will have previous values
  const { specificMine, fromEdit, setFromEdit, minesData, setMinesData } = useContext(MinesContext);
  const [ mineStatus, setMineStatus ] = useState(fromEdit ? specificMine.mineStatus : "");
  const [ newMineTitle, setNewMineTitle ] = useState(fromEdit ? specificMine.title : "");
  const [ newMineBody, setNewMineBody ] = useState(fromEdit ? specificMine.body : "");
  const [ newMineLink, setNewMineLink ] = useState(fromEdit ? specificMine.bookmarkLink : "");
  



  useEffect(() => {
   console.log("fromEdit : " , fromEdit)
  },[fromEdit] )


  useEffect( () => {  
   console.log(newMineLink);
    },[newMineLink]
  ) 


  const handleUpdateMine = () => {
   
    // this is the update http call here
    // !!!!! REMEMBER to setFromEdit(false) at the end - to reset it for next time./////////////////////!!!!!!!!!!!!!!!!!!!!!!!!!
    
    const updatedMineData = { title:newMineTitle , body:newMineBody, bookmarkLink: newMineLink , mineStatus: mineStatus };
    const specMineId = specificMine._id;
    
    setMinesData([...minesData, updatedMineData])

    let options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedMineData),
    }
    fetch(`http://localhost:5000/${specMineId}`,options);

  }



    // create new mine
  const handleCreateMine = (e) => {
  
    
    console.log(mineStatus);
    const newMineData = { title:newMineTitle , body:newMineBody, bookmarkLink: newMineLink , mineStatus: mineStatus };
    
 

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
       
      <div className="new-mine-form">
        <input className="link-input" placeholder="Link"  defaultValue={fromEdit ? specificMine.bookmarkLink : null} required onChange={(e) => setNewMineLink( e.target.value)}></input>
        <input className="title-input" placeholder="Title" defaultValue={fromEdit ? specificMine.title : null} required onChange={(e) => setNewMineTitle(e.target.value)}></input>
        <textarea
        placeholder="Note"
        label="Initial thoughts"
        type="text"
        className="body-input" 
        maxLength="600"
        defaultValue={ fromEdit ? specificMine.body : null}
        onChange={ (e) => setNewMineBody(e.target.value) }>
        </textarea>
        
        
        <form>
          <label for="mining">  Mining  </label>
          <input type="radio" name="option"  value="digging" checked={ fromEdit ?  mineStatus === "digging" : null}
          onChange={(e) => setMineStatus("digging")}
          name="digging"
          />
          
          <label for="cutting">  Cutting  </label>
          <input type="radio" name="option"  value="cutting" checked={ fromEdit ? mineStatus === "cutting" : null}
          onChange={(e) => setMineStatus("cutting")}
          name="cutting"
          />
          <label for="polished">Polished  </label>
          <input type="radio" name="option" value="polished" checked={ fromEdit ? mineStatus === "polished" : null}
          onChange={(e) => setMineStatus("polished")}
          name="polished"
          />
          
        <br/>
        <br/>
        </form>
        {fromEdit? 
          <Link to={'/'} style={{textDecoration: 'none'}}>
            <span className="submit-button"  onClick={  handleUpdateMine }> Update Mine </span>  
          </Link> :
          <Link to={'/'} style={{textDecoration: 'none'}}>
          <span className="submit-button"  onClick={  handleCreateMine }> Create Mine </span>  
        </Link>
         }
      </div>
    </div>
  )
}



export default NewMine;