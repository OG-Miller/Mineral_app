import React, { useContext, useEffect, useState, useRef } from 'react';
import './newNoteForm.css';
import { MinesContext } from '../MinesContext';

const NewNoteForm = props => {
	const { mineId, setNoteFormIsShow } = useContext(MinesContext);
	const [linkData, setLinkData] = useState(props.linkInput);
	const [titleData, setTitleData] = useState(props.titleInput);
	const [noteData, setNoteData] = useState(props.bodyInput);

	const noteFormRef = useRef();

	useEffect(() => {
		props.fetchSpecificMineProp();
	}, [props.bodyInput]);

	useEffect(() => {
		noteFormRef.current.scrollIntoView({ behavior: 'smooth' });
	}, []);

	useEffect(() => {
		console.log(noteData);
	}, [noteData]);

	const handleAddNote = () => {
		props.setFromEditNoteProp(false);

		if (noteData.length < 1 && titleData.length < 1 && linkData.length < 1) {
			alert('Note must contain data');
		} else {
			const updatedNoteData = {
				title: titleData,
				link: linkData,
				note: noteData,
			};

			let options = {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(updatedNoteData),
			};
			fetch(`http://localhost:5000/${mineId}/add`, options).then(() => {
				setNoteFormIsShow(false);
				props.fetchSpecificMineProp();
			});
		}
	};

	const handleUpdateNote = e => {
		// props.setNotesArrayProp(props.notesArrayProp);
		props.setFromEditNoteProp(false);
		const specNoteId = props.noteIdProp;
		console.log('specNoteId : ' + specNoteId);

		const newNoteData = {
			title: titleData,
			link: linkData,
			note: noteData,
		};

		let options = {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newNoteData),
		};
		fetch(`http://localhost:5000/${mineId}/update/${specNoteId}`, options).then(() => {
			props.fetchSpecificMineProp();
		});
		setNoteFormIsShow(false);
	};

	const handleCancel = () => {
		setNoteFormIsShow(false);
		props.setFromEditNoteProp(false);
	};

	return (
		<div className='new-note-form' ref={noteFormRef}>
			<span className='colorIndicator__NewNoteForm' />
			<input
				maxLength='99'
				className='title-input'
				placeholder='Title'
				name='titleInput'
				defaultValue={titleData}
				onChange={e => setTitleData(e.target.value)}
			/>
			<input
				maxLength='200'
				className='link-input'
				placeholder='Link'
				name='linkInput'
				defaultValue={linkData}
				onChange={e => setLinkData(e.target.value)}
			/>
			<textarea
				defaultValue={props.bodyInput}
				onChange={e => setNoteData(e.target.value)}
				name='noteInput'
				placeholder='Body'
				type='text'
				className='note-input'
				maxLength='600'
			></textarea>

			<div className='NewNoteForm__controls'>
				{!props.fromEditNoteProp ? (
					<span className='NewNoteForm__controls--add' onClick={handleAddNote}>
						{props.addButtonVal}
					</span>
				) : (
					<span className='NewNoteForm__controls--edit' onClick={handleUpdateNote}>
						{props.updateButtonVal}
					</span>
				)}
				<span className='NewNoteForm__controls--cancel' onClick={handleCancel}>
					Cancel
				</span>
			</div>
		</div>
	);
};

export default NewNoteForm;
