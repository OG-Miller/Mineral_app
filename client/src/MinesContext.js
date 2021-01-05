import React, { useState, createContext } from 'react';

export const MinesContext = createContext();

export const DataProvider = props => {
	// const [ data, setData ] = useState ('');
	const [mineId, setMineId] = useState('');
	const [specificMine, setSpecificMine] = useState({});
	const [noteFormIsShow, setNoteFormIsShow] = useState(false);
	const [fromEdit, setFromEdit] = useState(false);
	const [fromEditNote, setFromEditNote] = useState(false);
	const [minesData, setMinesData] = useState([]);
	const [specificNote, setSpecificNote] = useState({});
	const [showNoteControls, setShowNoteControls] = useState(true);
	const [counter, setCounter] = useState(0);

	return (
		<MinesContext.Provider
			value={{
				mineId,
				setMineId,
				specificMine,
				setSpecificMine,
				noteFormIsShow,
				setNoteFormIsShow,
				fromEdit,
				setFromEdit,
				fromEditNote,
				setFromEditNote,
				specificNote,
				setSpecificNote,
				minesData,
				setMinesData,
				showNoteControls,
				setShowNoteControls,
				counter,
				setCounter,
			}}
		>
			{props.children}
		</MinesContext.Provider>
	);
};
export default DataProvider;
