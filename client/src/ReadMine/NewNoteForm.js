import React, { useContext, useEffect, useState } from "react";
// import NewMine from '../NewMine/NewMine';
import './newNoteForm.css';
import { Link } from 'react-router-dom';
import { MinesContext } from '../MinesContext';



const NewNoteForm = (props) => {
  const { mineId ,  isShow, setIsShow } = useContext(MinesContext);
  const [ linkData, setLinkData ] = useState('');
  const [ titleData, setTitleData ] = useState('');
  const [ noteData, setNoteData ] = useState('');
  
  // onChange={ (e) => props.onChange(e.target.value, e.target) }

  
     //update a mine
     const handleAddNote = () => {
      if (noteData.length <1 ) {
        alert("Must contain note body!");
      } else {
        const newNoteData = { 
          title: titleData,
          link: linkData,
          note: noteData
          };
        
        let options = {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newNoteData),
        }
        fetch(`http://localhost:5000/${mineId}/add`,options);// "tomorrow " post
        
  
        setIsShow(false);
      }
     
    }

    const handleCancel = () => {
      setIsShow(!isShow);
    }



  return(

    <div className="new-note-form">
          <input className="link-input" placeholder="Link" name="linkInput" value={linkData} onChange={(e) => setLinkData( e.target.value )}/>
          <input className="title-input"  placeholder="Title" ame="titleInput" value={titleData} onChange={(e) => setTitleData( e.target.value )} />
          <textarea
            value={noteData}
            onChange={ (e) => setNoteData( e.target.value ) }
            name="noteInput"
            placeholder="Body"
            // label="Initial thoughts"
            type="text"
            className="note-input" 
            maxLength="600"
            // value={newMineBody}
            // onChange={(e) => setNewMineBody(e.target.value)}
            >
          </textarea>


        <Link to={'/ReadMine'} > 
          <span className="submit-button"  onClick={handleAddNote} >Add Note</span>
          <span className="cancel-button"  onClick={handleCancel}>Cancel</span>
        </Link>

    </div>

  )




}

export default NewNoteForm; 