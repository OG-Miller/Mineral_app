import { React, useContext, useState, useEffect } from 'react';
import { MinesContext } from '../MinesContext';
import NoteControls from '../SidebarLeft/NoteControls'; // change this to folder:  sidebarRight
import './sidebarRight.css';
import NoteAddIcon from '@material-ui/icons/NoteAdd';

const SidebarRight = () => {
	const { showNoteControls, setShowNoteControls } = useContext(MinesContext);
	// const [showNoteButton, setShowNoteButton] = useState(false);
	// const [pathMatch, setPathMatch] = useState(false);
	// const [counter, setCounter] = useState(0);

	const path = window.location.pathname;
	const read = '/ReadMine';

	useEffect(() => {
		// setCounter(1);
	}, []);

	return (
		<div className='sidebarRight'>
			{path === read && (
				<NoteControls className='noteControls-right' Icon={NoteAddIcon} title='New Note' />
			)}
		</div>
	);
};

export default SidebarRight;
