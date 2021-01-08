import React from 'react';
import './noteCard.css';

const NoteCard = props => {
	function passedEdit(e) {
		props.passEdit(e);
	}

	function passedDelete(e) {
		props.passDelete(e);
	}

	return (
		<div>
			<div className='noteCard'>
				<div className='NoteCardColorAndIdWrapper'>
					<span className='colorIndicator__NoteCard' />
					{/* <span className='noteId'>Note ID: {props._id}</span> */}
				</div>
				<h1 className='note-card-title'>{props.title}</h1>
				<a href={props.link} className='noteLink' target='blank' rel='noreferrer noopener'>
					{props.link}
				</a>
				<span className='noteBody' required>
					{props.note}
				</span>
				{/* <span className='noteId'>Note ID: {props._id}</span> */}
				<div className='noteCardControls'>
					<span value='edit' onClick={passedEdit}>
						Edit
					</span>
					<span value='delete' onClick={passedDelete}>
						Delete Note
					</span>
				</div>
			</div>
		</div>
	);
};

export default NoteCard;
