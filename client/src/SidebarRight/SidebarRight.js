import { React, useContext } from 'react';
import { MinesContext } from '../MinesContext';
import NoteControls from '../SidebarLeft/NoteControls'; // change this to folder:  sidebarRight
import './sidebarRight.css';
import NoteAddIcon from '@material-ui/icons/NoteAdd';

console.log(window.location.pathname);

const SidebarRight = () => {
	const { showNoteControls, setShowNoteControls } = useContext(MinesContext);
	const path = window.location.pathname;
	const read = '/ReadMine';

	return (
		<div className='sidebarRight'>
			{/* <h5 className='gem-cabinet'>Sidebar Right Here</h5> */}
			{path === read && (
				<NoteControls className='noteControls' Icon={NoteAddIcon} title='New Note' />
			)}
		</div>
	);
};

export default SidebarRight;
