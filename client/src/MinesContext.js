
import React, {useState, createContext } from "react"


export const MinesContext = createContext();


  export const DataProvider = props => {
  // const [ data, setData ] = useState ('');
  const [ mineId , setMineId ] = useState('');
  const [ specificMine , setSpecificMine ] = useState({});
  const [ isShow , setIsShow ] = useState('false');


  return(
      <MinesContext.Provider value = {{ mineId, setMineId,  specificMine , setSpecificMine, isShow, setIsShow}}>
        {props.children}
      </MinesContext.Provider>
  )


}
export default DataProvider;
