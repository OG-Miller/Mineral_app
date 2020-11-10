import React, { useContext, useState, useEffect } from "react";
import { MinesContext } from '../MinesContext';
import './readMine.css';


const ReadMine = () => {
  const { mineId } = useContext(MinesContext);
  const [ specificMine, setSpecificMine ] = useState([]);
  // console.log("mineId: " + mineId);

  //put useEffect here
  useEffect(() => {
    fetchSpecificMine();
  },[]);

  // fetch specific post
  const fetchSpecificMine = async () => {
    const specificMineResponse = await fetch(`http://localhost:5000/${mineId}`);
    const jsonResponse = await specificMineResponse.json();
    // console.log(jsonResponse);
    setSpecificMine(jsonResponse);
  } 

  useEffect(() => {
    console.log(specificMine);
  },[specificMine]);
    



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
          <span className="edit-button">Edit</span>
          <span className="delete-button">Delete</span>
          <span className="add-button">Add</span>
        </div>
      </div>
    </div>
  )
}

export default ReadMine;