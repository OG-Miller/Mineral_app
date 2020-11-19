import React, { useEffect, useState } from 'react';
import "./noteCard.css";



const NoteCard = (props) => {
  
  const [ testButton, setTestButton ] = useState('');
  
 useEffect( () => {
  //  console.log(testButton);
  },[testButton]
 )

  function passedEdit(e) {
    props.passEdit(e);
  }
  
  function passedDelete(e) {
   props.passDelete(e);
  }

  function passedAdd(e) {
    props.passAdd(e);
  }



  return(
    <div>
        <div className="noteCard" >
            <h1 className="noteTitle">{props.title}</h1>
            <a href={props.link} className="noteLink" target="blank" rel="noreferrer noopener" >{props.link}</a>
          
            <span  className="noteId" >{props._id}</span>
            <span className="noteBody">{props.note}</span>
         <div className="noteControls">
          <span value="edit" onClick={passedEdit}>Edit</span>
          <span value="delete" onClick={passedDelete}>Delete</span>
          <span value="add" onClick={passedAdd}>Add</span>
          {/* <span type="button" onClick={() => setTestButton(e.target.parentElement.parentElement.childNodes[2].innerHTML)} value={testButton}  testButton={testButton}>TestButton</span> */}
         </div>
        </div>
       
    </div>
  )
}

export default NoteCard;