import React, { useContext, useState, useEffect } from "react";
import { MinesContext } from '../MinesContext';
import './readMine.css';
import NewNoteForm from './NewNoteForm';
import NoteCard from './NoteCard';
import { Link } from 'react-router-dom';



const ReadMine = () => {
  const { mineId, specificMine, setSpecificMine, noteFormIsShow , setNoteFormIsShow, fromEdit, setFromEdit } = useContext(MinesContext);
  const [ notesArray, setNotesArray ] = useState([]);
  const [ showNotes, setShowNotes ] = useState(false);
  const [ mineIsShow, setMineIsShow ] = useState('');
  const [ noteId, setNoteId ] = useState('');
  // const [ noteIndex, setNoteIndex ] = useState('');
  const [ fromEditNote, setFromEditNote ] = useState(false);
  const [ specificNote, setSpecificNote ] = useState({});
  
  

  useEffect(() => {
    // setTimeout(() => {
    
      fetchSpecificMine();
    //   }
    // ,100)
   
  },[]);

  useEffect(() => {
    setShowNotes(true);
    console.log(notesArray);
  },[notesArray]);
  
  // useEffect(() => {
  //   console.log("noteFormIsShow: ", noteFormIsShow);
  // },[noteFormIsShow]);

  // useEffect(() => {
  //   console.log("fromEditNote: ", fromEditNote);
  // },[fromEditNote]);

  
  useEffect(() => {
    console.log("noteID: ",noteId);
    getIndex();
  }, [noteId]);
  
 

  useEffect( () => {
    console.log(specificNote);
    }
  ,[ specificNote ]);
  
  
  // FETCH SPECIFIC MINE
  const fetchSpecificMine = async () => {
    const specificMineResponse = await fetch(`http://localhost:5000/${mineId}`);
    const jsonResponse = await specificMineResponse.json();
    setNotesArray(jsonResponse.notes);
    setSpecificMine(jsonResponse);
    console.log(specificMine);
  } 

  // MINE ADD
  const handleAdd = () => {
    console.log("mine card add button clicked");
    setNoteFormIsShow(true);//this toggles show/hide once
  }
  
  // DELETE ENTIRE MINE 
  const handleDelete = () => {
  
   let options = {
     method: 'DELETE',
     headers: {
       'Content-Type': 'application/json'
     }
   };
   fetch(`http://localhost:5000/${mineId}`,options);
   
  }
  // this should .then() call something like set *****
  

// EDIT MINE
  const handleEdit =  () => {
    setFromEdit(true);  
    setShowNotes(true);
  }

  const getIndex = () => {
    let gotIndex =  notesArray.findIndex( element => {
      if (element._id === noteId ) {
      return true;
      }
    });
    setSpecificNote(notesArray[gotIndex]);
    console.log(gotIndex);   
  }
  
  
  
  // NOTES - EDIT
  const passedEdit = (_id) => {
    // setNoteId(e.target.parentElement.parentElement.childNodes[3].innerHTML);//when noteId is updated - useEffect calls getIndex() this relies on e being passed in function
    setNoteId(_id);
    console.log(noteId);
    setFromEditNote(true); 
    setTimeout(() => {
      setNoteFormIsShow(true);
      }
    , 100);
  }




 // NOTES - DELETE
  const passedDelete = (_id) => {
    const noteIdent = _id;
    
    let options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      }
      
    }
    fetch(`http://localhost:5000/del/${mineId}/${noteIdent}`,options).then( () => {
      setNotesArray(notesArray.filter(note => note._id != noteIdent))
    });
  }
  
 

  // NOTES - ADD
  const passedAdd = (_id) => {
    setFromEdit(false); 
    setNoteId(_id);
    setNoteFormIsShow(true); 
  }
  

  
  return(
    
    <div value={mineId} className='read-main'>
       <div className='card'>
          <h1 className="mine-card-title">{specificMine.title}</h1>
          <a href={specificMine.bookmarkLink} className="bookmarkLink" target="blank" rel="noreferrer noopener" >{specificMine.bookmarkLink}</a>
          <hr/>
          <span className='body'>{specificMine.body} </span>
          <hr/>
          <span className="updated-at">{specificMine.createdAt !== specificMine.updatedAt ? '   Updated: ' + specificMine.updatedAt : null}</span>
          <div className="item-details">
            <span className="created-at">Created: {specificMine.createdAt}</span>
            <span className='mine-id'>ID: {mineId}</span>
          </div>
          <div className="controls">
            <Link to={'/NewMine'} >
              <span  onClick={handleEdit} className="edit-button">Edit</span>
            </Link>
            <span onClick={handleDelete} className="delete-button">Delete</span>
            <span onClick={handleAdd} className="add-button">Add</span>
          </div>
        </div>
      
    
     


     
     { 
     //notesArray.length >0 &&
        notesArray.map( ( {  testPropper, _id, link, title, note } ) => {
        return (
          <NoteCard
          
          
          passAdd={e => passedAdd(_id)}
          passDelete={e => passedDelete(_id)}//this will delete the note -> delete the note from db
          passEdit={e => passedEdit(_id)}//this will open NewNoteForm with previous data inserted and editable -> http patch the data on db
          key={_id}
          _id={_id}
          link={link}
          title={title}
          note={note}
          
          /> 
          )}
        )
    
      }
       
    
      { noteFormIsShow  && fromEditNote  ?
       <NewNoteForm
        noteIdProp={noteId}
        setFromEditNoteProp={setFromEditNote}
        fromEditNoteProp={fromEditNote}
        notesArrayProp={notesArray}
        setNotesArrayProp={setNotesArray}
        linkInput={ specificNote.link}
        titleInput={specificNote.title}
        bodyInput={specificNote.note}
        updateButtonVal={"Update Note"}
        /> :null
        }

      { noteFormIsShow === true  && fromEditNote === false  ?
       <NewNoteForm
       noteIdProp={noteId}
       setFromEditNoteProp={setFromEditNote}
       fromEditNoteProp={fromEditNote}
       notesArrayProp={notesArray}
       setNotesArrayProp={setNotesArray}
       addButtonVal={"Add New Note"}
        /> :null
        }
     
      
    </div> 
   
  )
}
export default ReadMine;
