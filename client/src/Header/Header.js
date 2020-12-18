import React from 'react';
import './header.css';
// import logo from '../../src/Mineral-Logo-1-05.png';
// import logo from "/Users/gavinmiller/Documents/Coding/test_mern/client/src/Mineral-App-blue1-17.png";
// import logo from "/Users/gavinmiller/Documents/Coding/test_mern/client/src/Mineral-App-Blue-2-20.png";
// import logo from '../../src/Mineral-App-red2-1git aff8.png';
// import logo from "/Users/gavinmiller/Documents/Coding/test_mern/client/src/Mineral-reverse-orange-02.png"
// import logo from "/Users/gavinmiller/Documents/Coding/test_mern/client/src/Mineral-reverse-mark-03.png"
import logo from "/Users/gavinmiller/Documents/Coding/test_mern/client/src/Mineral-reverse-mark2-05.png"

// import logo from "/Users/gavinmiller/Documents/Coding/test_mern/client/src/Mineral-orange-22.png";
// import logo from "/Users/gavinmiller/Documents/Coding/test_mern/client/src/Mineral-Logo-orange-22.png";


const Header = () => {


  
  return(
    <div className='header'>
      <img src={logo} alt="Mineral Diamond M logo" />

      
    </div>
  )
}

export default Header;