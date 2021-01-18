import React, { useContext, useState, useEffect } from 'react';
import { MinesContext } from '../MinesContext';
import { useHistory } from 'react-router-dom';
import './readMine.css';
import NewNoteForm from './NewNoteForm';
import NoteCard from './NoteCard';
import { Link } from 'react-router-dom';

const ReadMine = () => {
	const {
		mineId,
		selectedMine,
		setSelectedMine,
		noteFormVisible,
		setNoteFormVisible,
		setFromEdit,
	} = useContext(MinesContext);
	const [notesArray, setNotesArray] = useState([]);
	const [noteId, setNoteId] = useState('');
	const [fromEditNote, setFromEditNote] = useState(false);
	const [selectedNote, setSelectedNote] = useState({});
	const [showMineId] = useState(false);
	const history = useHistory();

	useEffect(() => {
		fetchSelectedMine();
	}, []);

	useEffect(() => {
		console.log(selectedMine);
		fetchSelectedMine();
	}, [selectedNote]);

	useEffect(() => {
		getIndex();
	}, [noteId]);

	useEffect(() => {
		console.log('fromEditNote');
		console.log(fromEditNote);
	}, [fromEditNote]);

	const fetchSelectedMine = async () => {
		const selectedMineResponse = await fetch(`http://localhost:5000/${mineId}`);
		const jsonResponse = await selectedMineResponse.json();
		setNotesArray(jsonResponse.notes);
		setSelectedMine(jsonResponse);
	};

	const getIndex = () => {
		let gotIndex = notesArray.findIndex(note => {
			if (note._id === noteId) {
				return true;
			}
		});
		setSelectedNote(notesArray[gotIndex]);
	};

	const DeleteMine = () => {
		if (window.confirm('This will delete the entire mine, including notes')) {
			history.push('/'); //////////////////////////check this still works
			let options = {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
			};
			fetch(`http://localhost:5000/${mineId}`, options);
		}
	};

	const EditMine = () => {
		setFromEdit(true);
	};

	// EDIT A NOTE
	const editNote = _id => {
		console.log(mineId);
		setNoteId(_id);
		console.log(noteId);
		setFromEditNote(true);
		setTimeout(() => {
			setNoteFormVisible(true);
		}, 100);
	};

	// DELETE A NOTE
	const deleteNote = _id => {
		if (window.confirm('Delete note?')) {
			const noteIdent = _id;

			let options = {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
			};
			fetch(`http://localhost:5000/del/${mineId}/${noteIdent}`, options).then(() => {
				setNotesArray(notesArray.filter(note => note._id != noteIdent));
			});
		}
	};

	return (
		<div value={mineId} className='mine'>
			<div className='card'>
				<div className='MineCardColorAndIdWrapper'>
					{showMineId && <span className='mine-id'>Mine ID: {mineId}</span>}
				</div>
				<h1 className='mine-card-title'>{selectedMine.title}</h1>
				<a
					href={selectedMine.bookmarkLink}
					className='bookmarkLink'
					target='blank'
					rel='noreferrer noopener'>
					{selectedMine.bookmarkLink}
				</a>
				{selectedMine.body && <p className='body'>{selectedMine.body} </p>}
				<span className='updated-at'>
					{selectedMine.createdAt !== selectedMine.updatedAt &&
						showMineId &&
						'   Updated: ' + selectedMine.updatedAt}
				</span>
				<div className='item-details'>
					<span className='created-at'>Created:{' ' + selectedMine.createdAt}</span>
				</div>
				<div className='controls'>
					<Link to={'/NewMine'}>
						<span onClick={EditMine} className='edit-button'>
							Edit
						</span>
					</Link>
					<span onClick={DeleteMine} className='delete-button'>
						Delete Mine
					</span>
				</div>
				{/* <hr className='border' /> */}
			</div>
			{notesArray.map(({ _id, link, title, note }) => {
				return (
					<NoteCard
						deleteNote={e => deleteNote(_id)} //this will delete the note -> delete the note from db
						editNote={e => editNote(_id)} //this will open NewNoteForm with previous data inserted and editable -> http patch the data on db
						key={_id}
						_id={_id}
						link={link}
						title={title}
						note={note}
					/>
				);
			})}

			{noteFormVisible && fromEditNote ? (
				<NewNoteForm
					setSelectedMine={setSelectedMine}
					key={noteId}
					fetchSelectedMine={fetchSelectedMine}
					noteId={noteId}
					setFromEditNote={setFromEditNote}
					fromEditNote={fromEditNote}
					notesArray={notesArray}
					setNotesArray={setNotesArray}
					linkInput={selectedNote.link}
					setLinkInput={setSelectedNote}
					titleInput={selectedNote.title}
					bodyInput={selectedNote.note}
					updateButtonVal={'Update Note'}
				/>
			) : null}

			{noteFormVisible === true && fromEditNote === false ? (
				<NewNoteForm
					noteId={noteId}
					fetchSelectedMine={fetchSelectedMine}
					setFromEditNote={setFromEditNote}
					fromEditNote={fromEditNote}
					notesArray={notesArray}
					setNotesArray={setNotesArray}
					addButtonVal={'Add New Note'}
					bodyInput={''}
					linkInput={''}
					titleInput={''}
				/>
			) : null}
		</div>
	);
};
export default ReadMine;
