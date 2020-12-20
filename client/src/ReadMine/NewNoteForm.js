import React, { useContext, useEffect, useState } from 'react';
// import NewMine from '../NewMine/NewMine';
import './newNoteForm.css';
import { Link } from 'react-router-dom';
import { MinesContext } from '../MinesContext';

const NewNoteForm = (props) => {
	// const { mineId ,  noteFormIsShow, setNoteFormIsShow, fromEditNote, setFromEditNote, specificNote, setSpecificNote  } = useContext(MinesContext);
	const { mineId, noteFormIsShow, setNoteFormIsShow } = useContext(
		MinesContext
	);
	const [linkData, setLinkData] = useState(props.linkInput);
	const [titleData, setTitleData] = useState(props.titleInput);
	const [noteData, setNoteData] = useState(props.bodyInput);

	// onChange={ (e) => props.onChange(e.target.value, e.target) }

	//add a note *** WORKING AND ACTIVE ***
	const handleAddNote = () => {
		props.setFromEditNoteProp(false);
		if (noteData.length < 1) {
			alert('Must contain note body!');
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
				props.setNotesArrayProp([
					...props.notesArrayProp,
					{ title: titleData, link: linkData, note: noteData },
				]);
			});
			setNoteFormIsShow(false);
		}
	};

	// trying to update a note - main code is copied from above////////////////////////////////////////////////////////////////////////////////////<<<
	const handleUpdateNote = () => {
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
		fetch(`http://localhost:5000/${mineId}/update/${specNoteId}`, options).then(
			() => {
				props.fetchSpecificMineProp();
			}
		);
		setNoteFormIsShow(false);
	};

	const handleCancel = () => {
		console.log('before: ' + props.fromEditNote);
		props.setNotesArrayProp(props.notesArrayProp);
		// setFromEditNote(false);
		setNoteFormIsShow(false);
		props.setFromEditNoteProp(!props.fromEditNoteProp);
	};

	useEffect(() => {
		console.log('props.fromEditNote: ' + props.fromEditNote);
	}, [props.fromEditNote]);

	return (
		<div className='new-note-form'>
			<input
				className='link-input'
				placeholder='Link'
				name='linkInput'
				defaultValue={props.linkInput}
				onChange={(e) => setLinkData(e.target.value)}
			/>
			<input
				className='title-input'
				placeholder='Title'
				name='titleInput'
				defaultValue={props.titleInput}
				onChange={(e) => setTitleData(e.target.value)}
			/>
			<textarea
				defaultValue={props.bodyInput}
				onChange={(e) => setNoteData(e.target.value)}
				name='noteInput'
				placeholder='Body'
				type='text'
				className='note-input'
				maxLength='600'
			></textarea>

			<div className='controls-container'>
				{!props.fromEditNoteProp ? (
					<span className='add-note-button' onClick={handleAddNote}>
						{props.addButtonVal}
					</span>
				) : (
					<span className='update-note-button' onClick={handleUpdateNote}>
						{props.updateButtonVal}
					</span>
				)}
				<span className='cancel-editnote-button' onClick={handleCancel}>
					Cancel
				</span>
			</div>
		</div>
	);
};

export default NewNoteForm;
