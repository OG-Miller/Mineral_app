import React, { useEffect, useState, useContext } from 'react';
import './sidebarLeft.css';
import { MinesContext } from '../MinesContext';
import SidebarOption from './SidebarOption';
import Home from '@material-ui/icons/Home';
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

	return (
		<div count={counter} onClick={() => setCounter(5)} className='sidebarLeft'>
			<div className='optionHolder'>
				<SidebarOption
					// count={counter}
					className='home'
					name='home'
					Icon={Home}
					page={'/'}
					title='Home'
					// onClick={() => setShowNoteControls(false)}
					// onClick={() => setCounter(5)}
				/>
				<SidebarOption
					name='add'
					className='addMine'
					Icon={AddOutlinedIcon}
					page={'/NewMine'}
					title='New Mine'
					// count={counter}
					// onClick={() => setCounter(1)}
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
