import React, { useState, useEffect }  from 'react';
import MineLink from '../MineLink/MineLink';
import './home.css'; 


function Home() {
  const [ minesData, setMinesData ] = useState([]);//local state
  
  useEffect(() => {
    fetchAllMines();
  },[]);
  
  const fetchAllMines = async () => {
    const allMinesResponse = await fetch('http://localhost:5000/mines');
    const jsonResponse = await allMinesResponse.json();
    console.log(jsonResponse);
    setMinesData(jsonResponse);  
  };
     
  useEffect(() => {
    console.log(minesData);
  },[minesData]);
    
  
  


// // fetch specific post
//  const specificMinesHandle = () => {
//    console.log("consider it clicked!");
//    async function  fetchSpecificMine(){
//      const specificMineResponse = await fetch('http://localhost:5000/5f997aa3e4d55c95c8b81ec3')
//      const jsonResponse = await specificMineResponse.json();
//      console.log(jsonResponse);
//    }
//    fetchSpecificMine();
//  
//   } 
  
//  // create new mine
//  const createMineHandle = () => {
//    const mineData = {
//        "title": "deleteMe",
//        "bookmarkLink": "www.deleteMe.com"
//     };

//    let options = {
//      method: 'POST',
//      headers: {
//        'Content-Type': 'application/json'
//      },
//      body: JSON.stringify(mineData)
//    };

//    fetch('http://localhost:5000', options);

//  }

//  //delete a mine
//  const deleteMineHandle = () => {
//    let options = {
//      method: 'DELETE',
//      headers: {
//        'Content-Type': 'application/json'
//      }
//    };
//    fetch('http://localhost:5000/5fa151c540564ef4373cc3a0',options);
//  }
 
//  // update a mine
//  const updateMineHandle = () => {
//    const newData = {
//      "title":"tomorrower" 
//    }
  
//    let options = {
//      method: 'PATCH',
//      headers: {
//        'Content-Type': 'application/json'
//      },
//      body: JSON.stringify(newData),
//    }
//    fetch('http://localhost:5000/5fa14ea2a1badff4000d329b',options);// "tomorrow " post
//  }

const handleMineLinkClick = () => {
  console.log('clicked');
}

 return (
   
  <div className="home-main" >
     
    {
      minesData.map(
        mine => 
            <MineLink
            
            onClick={handleMineLinkClick}
            key={mine._id}
            _id={mine._id}
            createdAt={mine.createdAt}
            title={mine.title}
            bookmarkLink={mine.bookmarkLink.length <40? mine.bookmarkLink  : mine.bookmarkLink.substr(0,40) + "..."}  
            />
      ) 
    }
  
 

       {/* <button 
       className="allMines_button"
       onClick={() => fetchAllMines()}>
       All Mines
      </button> */}
    
      
  </div>
  
);
       
 

}

  export default Home;