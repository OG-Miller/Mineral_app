import React, { useContext } from 'react';
import './sidebarLeft.css';
import { MinesContext } from '../MinesContext';
import SidebarOption from './SidebarOption';
import Home from '@material-ui/icons/Home';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import NoteControls from './NoteControls';
import NoteAddIcon from '@material-ui/icons/NoteAdd';

const SidebarLeft = () => {
	const { counter, setCounter } = useContext(MinesContext);

	return (
		<div
			count={counter} // counter is used to refresh component
			onClick={() => setCounter(prevCount => !prevCount)}
			className='sidebarLeft'>
			<div className='optionHolder'>
				<SidebarOption className='home' name={'homeButton'} Icon={Home} page={'/'} title='Home' />
				<SidebarOption
					name={'newMineButton'}
					className='addMine'
					Icon={AddOutlinedIcon}
					page={'/NewMine'}
					title='New Mine'
				/>
				<div className='newNote__Button--left'>
					{window.location.pathname === '/ReadMine' && (
						<NoteControls Icon={NoteAddIcon} title='New Note' />
					)}
				</div>
			</div>
		</div>
	);
};

export default SidebarLeft;
