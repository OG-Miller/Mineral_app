import React, { useEffect, useContext }  from 'react';
import MineLink from '../MineLink/MineLink';
import { MinesContext } from '../MinesContext';
import './home.css'; 


function Home() {
  const { minesData, setMinesData } = useContext(MinesContext);
  
  
  useEffect(() => {
    setTimeout(() => {
       fetchAllMines();
      }
    , 300);
  
  },[]);
  
   
  const fetchAllMines = async () => {
    const allMinesResponse = await fetch('http://localhost:5000/mines');
    const jsonResponse = await allMinesResponse.json();
    // console.log(jsonResponse);
    setMinesData(jsonResponse);  
  };
     


  
 return (
   
    <div className="home-main" >
      
      {
        minesData.map(
          mine => 
              <MineLink
              key={mine._id}
              _id={mine._id}
              createdAt={mine.createdAt}
              title={mine.title}
              bookmarkLink={mine.bookmarkLink.length < 40? mine.bookmarkLink : mine.bookmarkLink.substr(8,40) + "..."}  
              />
        ) 
      }
    
  
        
    </div>
  
  );
       
 

}

  export default Home;