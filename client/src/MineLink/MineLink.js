import React, { useContext } from 'react'
import './mineLink.css'
import { Link } from 'react-router-dom';
import { MinesContext } from '../MinesContext';

const MineLink = ({ _id, createdAt, title, bookmarkLink}) => {

   const { mineId, setMineId } = useContext(MinesContext);
   
   const handleClick = (e) => {
      console.log(e.currentTarget.childNodes[0].textContent);
      const getMineId = e.currentTarget.childNodes[0].textContent;
      setMineId(getMineId);
      console.log('from state: ' + mineId);
     
       
   }



   return (
      <Link to={'/ReadMine'} style={{textDecoration: 'none'}} >
         <div className="mineLink_container" onClick={e => handleClick(e)}>
            {/* <p className="id">date: {date}</p> */}
            <span className="mine-id">{_id}</span>
            <h2 className="title">{title}</h2>
            <span className="bookmarkLink">{bookmarkLink}</span><br/>
            <span className="createdAt">{createdAt}</span>
         </div>
      </Link>
   )
} 

export default MineLink;