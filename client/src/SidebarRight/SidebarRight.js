import { React, useContext, useEffect } from 'react';
import { MinesContext } from '../MinesContext';
import NoteControls from '../SidebarLeft/NoteControls'; // change this to folder:  sidebarRight
import './sidebarRight.css';
import NoteAddIcon from '@material-ui/icons/NoteAdd';

const SidebarRight = () => {
	const { setShowNoteControls } = useContext(MinesContext);

	const path = window.location.pathname;
	const read = '/ReadMine';

	return (
		<div className='sidebarRight'>
			{path === read && (
				<NoteControls className='noteControls-right' Icon={NoteAddIcon} title='New Note' />
			)}
		</div>
	);
};

export default SidebarRight;
