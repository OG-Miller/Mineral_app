import React, { useState, useContext } from 'react';
import './sidebarLeft.css';
import { MinesContext } from '../MinesContext';
import SidebarOption from './SidebarOption';
import Home from '@material-ui/icons/Home';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import NoteControls from './NoteControls';
import NoteAddIcon from '@material-ui/icons/NoteAdd';

console.log(window.innerWidth);

const SidebarLeft = () => {
	const { counter, setCounter } = useContext(MinesContext);

	return (
		<div count={counter} onClick={() => setCounter(1)} className='sidebarLeft'>
			<div className='optionHolder'>
				<SidebarOption className='home' name='home' Icon={Home} page={'/'} title='Home' />
				<SidebarOption
					name='add'
					className='addMine'
					Icon={AddOutlinedIcon}
					page={'/NewMine'}
					title='New Mine'
				/>
				<div className='notebutton-left'>
					{window.location.pathname === '/ReadMine' && (
						<NoteControls className='noteControlsLeft' Icon={NoteAddIcon} title='New Note' />
					)}
				</div>
			</div>
		</div>
	);
};

export default SidebarLeft;
