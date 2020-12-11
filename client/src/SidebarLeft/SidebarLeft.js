import React from 'react';
import './sidebarLeft.css'
import SidebarOption from './SidebarOption';


const SidebarLeft = () => {

 


  return(
    
      <div className="sidebarLeft">
        <SidebarOption page={'/'} title="Home"  />
        <SidebarOption page={'/NewMine'} title="New Mine"  />
      </div>
  
  )
  
}

export default SidebarLeft;