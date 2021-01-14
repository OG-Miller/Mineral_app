import { React, useState } from 'react';
import './noteCard.css';

const NoteCard = props => {
	const [showNoteId, setShowNoteId] = useState(false);
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
					<span
						onClick={() => {
							setShowNoteId(!showNoteId);
						}}
						// onMouseOver={() => setShowNoteId(true)}
						// onMouseLeave={() => setShowNoteId(false)}
						className='colorIndicator__NoteCard'
					/>
					{showNoteId && <span className='noteId'>Note ID: {props._id}</span>}
				</div>
				<h1 className='note-card-title'>{props.title}</h1>
				<a href={props.link} className='noteLink' target='blank' rel='noreferrer noopener'>
					{props.link}
				</a>
				<span className='noteBody' required>
					{props.note}
				</span>
				{/* <span className='noteId'>Note ID: {props._id}</span> */}
				<div className='NoteCard__controls'>
					<span value='edit' className='NoteCard__controls--edit' onClick={passedEdit}>
						Edit
					</span>
					<span value='delete' className='NoteCard__controls--delete' onClick={passedDelete}>
						Delete Note
					</span>
				</div>
			</div>
		</div>
	);
};

export default NoteCard;
