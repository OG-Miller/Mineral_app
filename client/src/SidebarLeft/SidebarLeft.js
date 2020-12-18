import React from 'react';
import './sidebarLeft.css'
import SidebarOption from './SidebarOption';
import Home from '@material-ui/icons/Home';
// import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
// import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';


const SidebarLeft = () => {

 


  return(
    
      <div className="sidebarLeft">
       
        <SidebarOption name="home" Icon={Home} page={'/'} title="Home"  />
        <SidebarOption name="add" Icon={AddOutlinedIcon} page={'/NewMine'} title="New Mine"  />
        
      </div>
  
  )
  
}

export default SidebarLeft;