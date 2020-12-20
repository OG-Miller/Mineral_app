import React from 'react';
import './sidebarLeft.css';
import SidebarOption from './SidebarOption';
import Home from '@material-ui/icons/Home';
// import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
// import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import NoteControls from './NoteControls';

const SidebarLeft = () => {
	return (
		<div className='sidebarLeft'>
			<SidebarOption
				className='home'
				name='home'
				Icon={Home}
				page={'/'}
				title='Home'
			/>
			<SidebarOption
				name='add'
				className='addMine'
				Icon={AddOutlinedIcon}
				page={'/NewMine'}
				title='New Mine'
			/>
			{/* <hr />
				<NoteControls /> */}
		</div>
	);
};

export default SidebarLeft;
