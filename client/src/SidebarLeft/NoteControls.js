import { React, useContext } from 'react';
import { MinesContext } from '../MinesContext';
import './noteControls.css';

const NoteControls = props => {
	const { setNoteFormIsShow } = useContext(MinesContext);
	const handleClick = () => {};

	return (
		<div className='noteControls-right' onClick={() => setNoteFormIsShow(true)}>
			{/* <Icon className='noteControl-icon' /> */}
			<props.Icon className='noteControl-icon' />
			<h4 className='noteControl-title'>{props.title}</h4>
		</div>
	);
};

export default NoteControls;
