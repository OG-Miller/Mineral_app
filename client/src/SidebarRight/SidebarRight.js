import { React, useContext, useState, useEffect } from 'react';
import { MinesContext } from '../MinesContext';
import NoteControls from '../SidebarLeft/NoteControls'; // change this to folder:  sidebarRight
import './sidebarRight.css';
import NoteAddIcon from '@material-ui/icons/NoteAdd';

const SidebarRight = () => {
	const { showNoteControls, setShowNoteControls } = useContext(MinesContext);
	const [showNoteButton, setShowNoteButton] = useState(false);
	const [pathMatch, setPathMatch] = useState(false);
	const [counter, setCounter] = useState(0);

	const path = window.location.pathname;
	const read = '/ReadMine';

	// window.location.pathname === '/ReadMine' && setPathMatch(true);
	useEffect(() => {
		setCounter(1);
	}, []);

	// console.log(window.location.pathname);
	// useEffect(() => {
	// 	const handleResize = () => {
	// 		console.log(window.location.pathname);
	// 		if (window.location.pathname === '/ReadMine') {
	// 			setPathMatch(true);
	// 		} else {
	// 			setPathMatch(false);
	// 			setCounter(1);
	// 		}
	// 	};
	// 	window.addEventListener('resize', handleResize());
	// });

	return (
		<div className='sidebarRight'>
			{/* <h5 className='gem-cabinet'>Sidebar Right Here</h5> */}
			{path === read && (
				<NoteControls
					className='noteControls-right'
					Icon={NoteAddIcon}
					title='New Note'
					count={counter}
				/>
			)}
		</div>
	);
};

export default SidebarRight;
