import { React, useContext, useState } from 'react';
import { MinesContext } from '../MinesContext';
import './noteControls.css';

const NoteControls = props => {
	const { setNoteFormVisible } = useContext(MinesContext);
	const [fontCol, setFontCol] = useState('#c7c5c5');

	const styles = {
		color: fontCol,
		textDecoration: 'none',
	};

	return (
		<div
			style={styles}
			onMouseEnter={() => setFontCol('#209ef2')}
			onMouseLeave={() => {
				setFontCol('#c7c5c5');
			}}
			className='newNote__Button'
			onClick={() => setNoteFormVisible(true)}>
			<props.Icon className='noteControl-icon' />
			<h4 className='noteControl-title'>{props.title}</h4>
		</div>
	);
};

export default NoteControls;
