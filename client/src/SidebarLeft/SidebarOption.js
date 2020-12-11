import React, { useContext }  from 'react';
import "./sidebarOption.css";
import { Link } from 'react-router-dom';
import { MinesContext } from '../MinesContext';

const SidebarOption = ({page, title}) => {
  const { fromEdit, setFromEdit, noteFormIsShow, setNoteFormIsShow } = useContext(MinesContext);
  

  const handleClick = () => {
    setNoteFormIsShow(false);
    console.log("fromEdit from sidebar : " + fromEdit);
    setFromEdit(false);
    console.log('clickeed');
    
  }
//style={{textDecoration: 'none'}}
  return(
    <Link to={page} >
      <div className='sidebar-option' onClick={handleClick}>
        <h4>{title}</h4>
      </div>
    </Link>  
  )
}

export default SidebarOption;