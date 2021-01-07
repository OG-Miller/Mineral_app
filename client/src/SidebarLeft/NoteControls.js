import { React, useContext } from 'react';
import { MinesContext } from '../MinesContext';
import './noteControls.css';

const NoteControls = props => {
	const { setNoteFormIsShow } = useContext(MinesContext);

	return (
		<div className='noteControl-right' onClick={() => setNoteFormIsShow(true)}>
			<props.Icon className='noteControl-icon' />
			<h4 className='noteControl-title'>{props.title}</h4>
		</div>
	);
};

export default NoteControls;
