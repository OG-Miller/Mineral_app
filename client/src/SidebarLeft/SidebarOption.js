import React from 'react';
import "./sidebarOption.css";
import { Link } from 'react-router-dom';

const SidebarOption = ({page, title}) => {



  return(
    <Link to={page} style={{textDecoration: 'none'}}>
      <div className='sidebar-option'>
        <h4>{title}</h4>
      </div>
    </Link>  
  )
}

export default SidebarOption;