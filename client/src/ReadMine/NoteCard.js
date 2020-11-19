import React from 'react';
import "./noteCard.css"
// import './noteCard.css';



const NoteCard = (props) => {
  

  function passedEdit() {
    props.passEdit();
  }
  
  function passedDelete() {
    props.passDelete();
  }

  function passedAdd() {
    props.passAdd();
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
         </div>
        </div>

    </div>
  )
}

export default NoteCard;