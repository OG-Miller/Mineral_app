import React, { useContext } from 'react'
import './mineLink.css'
import { Link } from 'react-router-dom';
import { MinesContext } from '../MinesContext';

const MineLink = ({ _id, createdAt, title, bookmarkLink}) => {
  
   const { setMineId } = useContext(MinesContext);
   
   const handleClick = (e) => {
      setMineId(_id);
   }



   return (
      <Link to={'/ReadMine'} style={{textDecoration: 'none'}} >
         <div className="mineLink_container" onClick={ e => handleClick(e) }>
            <span className="mine-id">ID:{_id}</span>
            <h2 className="title">{title}</h2>
            <span className="home-bookmarkLink">{bookmarkLink}</span><br/>
            <span className="createdAt">{createdAt}</span>
         </div>
      </Link>
   )
} 

export default MineLink;