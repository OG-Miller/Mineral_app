import React, { useState, createContext } from 'react';

export const MinesContext = createContext();

export const DataProvider = props => {
	const [mineId, setMineId] = useState('');
	const [selectedMine, setSelectedMine] = useState({});
	const [noteFormVisible, setNoteFormVisible] = useState(false);
	const [fromEdit, setFromEdit] = useState(false);
	const [fromEditNote, setFromEditNote] = useState(false);
	const [minesData, setMinesData] = useState([]);
	const [selectedNote, setSelectedNote] = useState({});
	const [counter, setCounter] = useState(true);
	const [searchVal, setSearchVal] = useState('');

	return (
		<MinesContext.Provider
			value={{
				mineId,
				setMineId,
				selectedMine,
				setSelectedMine,
				noteFormVisible,
				setNoteFormVisible,
				fromEdit,
				setFromEdit,
				fromEditNote,
				setFromEditNote,
				selectedNote,
				setSelectedNote,
				minesData,
				setMinesData,
				counter,
				setCounter,
				searchVal,
				setSearchVal,
			}}>
			{props.children}
		</MinesContext.Provider>
	);
};
export default DataProvider;
