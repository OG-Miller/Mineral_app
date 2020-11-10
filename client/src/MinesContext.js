
import React, {useState, createContext } from "react"


export const MinesContext = createContext();


  export const DataProvider = props => {
  const [ data, setData ] = useState ('');
  const [ mineId , setMineId ] = useState('');




  return(
      <MinesContext.Provider value = {{ data, setData, mineId, setMineId }}>
        {props.children}
      </MinesContext.Provider>
  )


}
export default DataProvider;
