import React, { useContext, useState, useEffect } from "react";
import { MinesContext } from '../MinesContext';
import './readMine.css';
import NewNoteForm from './NewNoteForm';
import NoteCard from './NoteCard';

const ReadMine = () => {
  const { mineId, specificMine, setSpecificMine} = useContext(MinesContext);
  const { isShow , setIsShow } = useContext(MinesContext);
  const [ notesArray, setNotesArray ] = useState([]);
  const [ showNotes, setShowNotes ] = useState(false);
  const [ noteId, setNoteId ] = useState('');
  
  
  useEffect(() => {
    fetchSpecificMine();
    
  },[]);

  // fetch specific post
  const fetchSpecificMine = async () => {
    const specificMineResponse = await fetch(`http://localhost:5000/${mineId}`);
    const jsonResponse = await specificMineResponse.json();
    //console.log(jsonResponse);
    setNotesArray(jsonResponse.notes);//////
    setSpecificMine(jsonResponse);
  
  } 



  useEffect(() => {
    console.log(showNotes)
  },[showNotes]);

  useEffect(() => {
    setShowNotes(true);
  },[notesArray]);
  
  useEffect(() => {
    setIsShow(false);
  },[]);
  
  const handleAdd = () => {
    setIsShow(true) //this toggles show/hide once
  }

  const handleNoteClick = () => {
    console.log("clicked");
  }
  


  const handleEdit = () => {
    setShowNotes(true);
  }
  
  const passedEdit = () => {
    console.log("edit worked");
    //here we render the form again but with values filled.
    // data will come from 
  }


///////// /////////// ////////// ////////// ///////// ////////// /////////// ////////// ////////// //////////

  function passedDelete()  {
    
    console.log("delete worked");
    //delete one note from array by id
     //1: get id from click
     
     console.log(e);
  }
  const doThis = (e) => {

    console.log(e.target);
  }
  
  //below taken from "add a note"
  // const handleAddNote = () => {
    
  //     const newNoteData = { 
  //      _id: noteId
  //       };
      
  //     let options = {
  //       method: 'PATCH',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(newNoteData),
  //     }
  //     fetch(`http://localhost:5000/${mineId}/add`,options);// "tomorrow " post
  
    
  // }

  
///////// /////////// ////////// ////////// ////////// ///////// /////////// ////////// ////////// //////////
  
  const passedAdd = () => {
    console.log("Add worked");
    setIsShow(true);
  }
  
  
  
  return(
    <div className='read-main'>
       <div className='card'>
        <h1>{specificMine.title}</h1>
        <a href={specificMine.bookmarkLink} target="blank" rel="noreferrer noopener" >{specificMine.bookmarkLink}</a>
        <span className="updated-at">{specificMine.createdAt !== specificMine.updatedAt ? '   Updated: ' + specificMine.updatedAt : null}</span>
        <span className='body'>{specificMine.body} </span>
        <div className="item-details">
          <span className="created-at">Created: {specificMine.createdAt}</span>
          <span className='mine-id'>ID: {mineId}</span>
        </div>
        <div className="controls">
          <span  onClick={handleEdit} className="edit-button">Edit</span>
          <span className="delete-button">Delete</span>
          {specificMine.notes? <span onClick={handleAdd} className="add-button">Add</span> : null }
        </div>
      </div>
     

    
     
     
     {  notesArray.map( ( { _id, link, title, note} ) => {
      return (
        <NoteCard
        onClick={e => doThis(e)}
        passAdd={passedAdd()}
        passDelete={passedDelete}//this will delete the note -> delete the note from db
        passEdit={passedEdit}//this will open NewNoteForm with previous data inserted and editable -> http patch the data on db
        key={_id}
        _id={_id}
        link={link}
        title={title}
        note={note}
        
        /> 
        )}
      )
     }
       
    
      { isShow? <NewNoteForm/> : null }
      {/* { specificMine.notes.length === 0 ?  setIsShow(true) : null } */}
      
    </div>
  )
}
export default ReadMine;
