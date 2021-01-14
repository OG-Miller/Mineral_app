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
		specificMine,
		setSpecificMine,
		noteFormIsShow,
		setNoteFormIsShow,
		setFromEdit,
	} = useContext(MinesContext);
	const [notesArray, setNotesArray] = useState([]);
	const [noteId, setNoteId] = useState('');
	const [fromEditNote, setFromEditNote] = useState(false);
	const [specificNote, setSpecificNote] = useState({});
	const [showMineId, setShowMineId] = useState(false);
	const history = useHistory();

	useEffect(() => {
		fetchSpecificMine();
	}, []);

	useEffect(() => {
		console.log(specificMine);
		fetchSpecificMine();
	}, [specificNote]);

	useEffect(() => {
		getIndex();
	}, [noteId]);

	useEffect(() => {
		console.log('fromEditNote');
		console.log(fromEditNote);
	}, [fromEditNote]);

	const fetchSpecificMine = async () => {
		const specificMineResponse = await fetch(`http://localhost:5000/${mineId}`);
		const jsonResponse = await specificMineResponse.json();
		setNotesArray(jsonResponse.notes);
		setSpecificMine(jsonResponse);
		// console.log(specificMine);
		// console.log(fromEditNote);
	};

	const getIndex = () => {
		let gotIndex = notesArray.findIndex(note => {
			if (note._id === noteId) {
				return true;
			}
		});
		setSpecificNote(notesArray[gotIndex]);
	};

	const DeleteMine = () => {
		if (window.confirm('This will delete the entire mine, including notes')) {
			history.push('/');
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
	const passedEdit = _id => {
		console.log(mineId);
		setNoteId(_id);
		console.log(noteId);
		setFromEditNote(true);
		setTimeout(() => {
			setNoteFormIsShow(true);
		}, 100);
	};

	// DELETE A NOTE
	const passedDelete = _id => {
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
					<span onClick={() => setShowMineId(!showMineId)} className='colorIndicator__MineCard' />

					{showMineId && <span className='mine-id'>Mine ID: {mineId}</span>}
				</div>
				<h1 className='mine-card-title'>{specificMine.title}</h1>
				<a
					href={specificMine.bookmarkLink}
					className='bookmarkLink'
					target='blank'
					rel='noreferrer noopener'
				>
					{specificMine.bookmarkLink}
				</a>
				<p className='body'>{specificMine.body} </p>
				<span className='updated-at'>
					{specificMine.createdAt !== specificMine.updatedAt &&
						showMineId &&
						'   Updated: ' + specificMine.updatedAt}
				</span>
				<div className='item-details'>
					<span className='created-at'>
						Created:{' ' + specificMine.createdAt}
						{/* {specificMine.createdAt.substr(0, 10) + ' ' + specificMine.createdAt.substr(11, 8)} */}
					</span>
					{/* <span className='mine-id'>Mine ID:{mineId}</span> */}
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
			</div>

			{notesArray.map(({ _id, link, title, note }) => {
				return (
					<NoteCard
						passDelete={e => passedDelete(_id)} //this will delete the note -> delete the note from db
						passEdit={e => passedEdit(_id)} //this will open NewNoteForm with previous data inserted and editable -> http patch the data on db
						key={_id}
						_id={_id}
						link={link}
						title={title}
						note={note}
					/>
				);
			})}

			{noteFormIsShow && fromEditNote ? (
				<NewNoteForm
					setSpecificMineProp={setSpecificMine}
					key={noteId}
					fetchSpecificMineProp={fetchSpecificMine}
					noteIdProp={noteId}
					setFromEditNoteProp={setFromEditNote}
					fromEditNoteProp={fromEditNote}
					notesArrayProp={notesArray}
					setNotesArrayProp={setNotesArray}
					linkInput={specificNote.link}
					setLinkInput={setSpecificNote}
					titleInput={specificNote.title}
					bodyInput={specificNote.note}
					updateButtonVal={'Update Note'}
				/>
			) : null}

			{noteFormIsShow === true && fromEditNote === false ? (
				<NewNoteForm
					noteIdProp={noteId}
					fetchSpecificMineProp={fetchSpecificMine}
					setFromEditNoteProp={setFromEditNote}
					fromEditNoteProp={fromEditNote}
					notesArrayProp={notesArray}
					setNotesArrayProp={setNotesArray}
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
