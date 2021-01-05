import React, { useEffect, useLayoutEffect, useState, useContext } from 'react';
import { MinesContext } from '../MinesContext';
import './sidebarLeft.css';
import SidebarOption from './SidebarOption';
import Home from '@material-ui/icons/Home';
// import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
// import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import NoteControls from './NoteControls';
import NoteAddIcon from '@material-ui/icons/NoteAdd';

console.log(window.innerWidth);

const SidebarLeft = () => {
	// const [showNoteButton, setshowNoteButton] = useState(false);
	const [pathMatchesRead, setPathMatchesRead] = useState(false);
	const { showNoteControls, setShowNoteControls, counter, setCounter } = useContext(MinesContext);
	const [width, setWidth] = useState(window.innerWidth);
	useEffect(() => {
		setWidth(window.innerWidth);
	});
	// const [showNoteControls, setShowNoteControls] = useState(false);
	// const [counter, setCounter] = useState(0);
	// const [url, setUrl] = useState('');
	// setCounter(counter);

	// useLayoutEffect(() => {
	// 	const handleResize = () => {
	// 		// console.log(window.location.pathname);
	// 		if (window.location.pathname === '/ReadMine') {
	// 			// setCounter(1);
	// 			setPathMatchesRead(true);
	// 		} else {
	// 			setPathMatchesRead(false);
	// 			// setCounter(1);
	// 		}
	// 	};
	// 	handleResize();
	// 	window.addEventListener('resize', handleResize());

	// 	// setCounter(counter);
	// }, [counter]);

	const mql = window.matchMedia('(max-width: 735px)');
	mql.addEventListener('change', e => {
		const match = e.matches;
		if (match) {
			setShowNoteControls(true);
			setCounter(3);
		} else {
			setShowNoteControls(false);
		}
	});

	// useEffect(() => {
	// 	console.log('pathmatch', pathMatchesRead);
	// 	// setCounter(counter);
	// }, [pathMatchesRead, counter]);

	// useEffect(() => {
	// 	console.log(counter);
	// 	// console.log(window.location.pathname);
	// }, [counter]);

	// useEffect(() => {
	// 	console.log('showNote', showNoteControls);
	// 	// setCounter(2);
	// }, [showNoteControls, counter]);

	return (
		<div count={counter} className='sidebarLeft'>
			<div className='optionHolder'>
				<SidebarOption
					// count={counter}
					className='home'
					name='home'
					Icon={Home}
					page={'/'}
					title='Home'
					onClick={() => setShowNoteControls(false)}
					// onClick={() => setCounter(5)}
				/>
				<SidebarOption
					name='add'
					className='addMine'
					Icon={AddOutlinedIcon}
					page={'/NewMine'}
					title='New Mine'
					// count={counter}
					onClick={() => setShowNoteControls(false)}
					// onClick={() => setCounter(counter)}
				/>

				{width < 735 && window.location.pathname === '/ReadMine' && (
					<NoteControls
						// count={counter}
						className='noteControlsLeft'
						Icon={NoteAddIcon}
						title='New Note'
					/>
				)}
			</div>
		</div>
	);
};

export default SidebarLeft;
