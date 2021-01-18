import React, { useContext, useEffect, useState, useRef } from 'react';
import './newNoteForm.css';
import { MinesContext } from '../MinesContext';

const NewNoteForm = props => {
	const { mineId, setNoteFormVisible } = useContext(MinesContext);
	const [linkData, setLinkData] = useState(props.linkInput);
	const [titleData, setTitleData] = useState(props.titleInput);
	const [noteData, setNoteData] = useState(props.bodyInput);

	const noteFormRef = useRef();

	useEffect(() => {
		props.fetchSelectedMine();
	}, [props.bodyInput]);

	useEffect(() => {
		noteFormRef.current.scrollIntoView({ behavior: 'smooth' });
	}, []);

	useEffect(() => {
		console.log(noteData);
	}, [noteData]);

	const handleAddNote = e => {
		props.setFromEditNote(false);
		if (noteData.length < 1 && titleData.length < 1) {
			e.preventDefault();
			alert('Note must contain data');
		} else if (
			linkData.length > 0 &&
			linkData.slice(0, 6) !== 'https:' &&
			linkData.length > 0 &&
			linkData.slice(0, 5) !== 'http:'
		) {
			e.preventDefault();
			alert('Please enter a valid link with http(s)://www.');
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
				setNoteFormVisible(false);
				props.fetchSelectedMine();
			});
		}
	};

	const handleUpdateNote = e => {
		const specNoteId = props.noteId;
		if (noteData.length < 1 || titleData.length < 1) {
			e.preventDefault();
			alert('Note must contain data');
		} else if (linkData.slice(0, 6) !== 'https:' && linkData.slice(0, 5) !== 'http:') {
			e.preventDefault();
			alert('Please enter a valid link with http(s)');
		} else {
			props.setFromEditNote(false);
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
				props.fetchSelectedMine();
			});
			setNoteFormVisible(false);
		}
	};

	const handleCancel = () => {
		setNoteFormVisible(false);
		props.setFromEditNote(false);
	};

	return (
		<div className='new-note-form' ref={noteFormRef}>
			{/* <span className='colorIndicator__NewNoteForm' /> */}
			<input
				maxLength='99'
				className='title-input'
				placeholder='Title'
				name='titleInput'
				defaultValue={titleData}
				onChange={e => setTitleData(e.target.value)}
				onInput={e => setTitleData(e.target.value)}
			/>
			<input
				maxLength='200'
				className='link-input'
				placeholder='Link'
				name='linkInput'
				defaultValue={linkData}
				onInput={e => setLinkData(e.target.value)}
				onChange={e => setLinkData(e.target.value)}
			/>
			<textarea
				defaultValue={props.bodyInput}
				onInput={e => setNoteData(e.target.value)}
				onChange={e => setNoteData(e.target.value)}
				name='noteInput'
				placeholder='Body'
				type='text'
				className='note-input'
				maxLength='2000'></textarea>

			<div className='NewNoteForm__controls'>
				{!props.fromEditNote ? (
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
