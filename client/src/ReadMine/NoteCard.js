import { React, useState } from 'react';
import './noteCard.css';

const NoteCard = props => {
	const [showNoteId] = useState(false);

	function editNote(e) {
		props.editNote(e);
	}

	function deleteNote(e) {
		props.deleteNote(e);
	}

	return (
		<div>
			<div className='noteCard'>
				<div className='NoteCardColorAndIdWrapper'>
					{showNoteId && <span className='noteId'>Note ID: {props._id}</span>}
				</div>
				{props.title && <h1 className='note-card-title'>{props.title}</h1>}
				{props.link && (
					<a href={props.link} className='noteLink' target='blank' rel='noreferrer noopener'>
						{props.link}
					</a>
				)}
				{props.note && (
					<span className='noteBody' required>
						{props.note}
					</span>
				)}
				<div className='NoteCard__controls'>
					<span value='edit' className='NoteCard__controls--edit' onClick={editNote}>
						Edit
					</span>
					<span value='delete' className='NoteCard__controls--delete' onClick={deleteNote}>
						Delete Note
					</span>
				</div>
			</div>
		</div>
	);
};

export default NoteCard;
