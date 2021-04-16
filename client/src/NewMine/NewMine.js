import React, { useState, useContext, useEffect } from 'react';
import './newMine.css';
import { Link } from 'react-router-dom';
import { MinesContext } from '../MinesContext';

const NewMine = () => {
	const { selectedMine, fromEdit, minesData, setMinesData, setCounter } = useContext(MinesContext);
	const [mineStatus] = useState(fromEdit ? selectedMine.mineStatus : '');
	const [newMineTitle, setNewMineTitle] = useState(fromEdit ? selectedMine.title : '');
	const [newMineBody, setNewMineBody] = useState(fromEdit ? selectedMine.body : '');
	const [newMineLink, setNewMineLink] = useState(fromEdit ? selectedMine.bookmarkLink : '');

	useEffect(() => {
		setCounter(prevCount => !prevCount);
	}, [fromEdit]);

	const handleUpdateMine = () => {
		const updatedMineData = {
			title: newMineTitle,
			body: newMineBody,
			bookmarkLink: newMineLink,
			mineStatus: mineStatus,
		};
		const specMineId = selectedMine._id;

		setMinesData([...minesData, updatedMineData]);

		let options = {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(updatedMineData),
		};
		fetch(`http://localhost:5000/${specMineId}`, options);
	};

	const handleCreateMine = e => {
		if (newMineTitle.length < 1) {
			alert('Title and link required');
			e.preventDefault();
		} else if (newMineLink.slice(0, 6) !== 'https:' && newMineLink.slice(0, 5) !== 'http:') {
			e.preventDefault();
			alert('Please enter a valid link with http(s)://www.');
		} else {
			const newMineData = {
				title: newMineTitle,
				body: newMineBody,
				bookmarkLink: newMineLink,
				mineStatus: mineStatus,
			};

			let options = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newMineData),
			};

			fetch('http://localhost:5000', options);
			console.log(newMineData);
		}
	};

	return (
		<div className='new-mine-main'>
			<form className='new-mine-form'>
				<input
					maxLength='99'
					className='title-input'
					placeholder='Title'
					defaultValue={fromEdit ? selectedMine.title : null}
					onChange={e => setNewMineTitle(e.target.value)}
					onInput={e => setNewMineTitle(e.target.value)}></input>
				<input
					className='link-input'
					placeholder='Link'
					defaultValue={fromEdit ? selectedMine.bookmarkLink : null}
					required={true}
					onInput={e => setNewMineLink(e.target.value)}
					onChange={e => setNewMineLink(e.target.value)}></input>
				<input
					placeholder='Note'
					label='Initial thoughts'
					type='text'
					className='body-input'
					maxLength='2000'
					defaultValue={fromEdit ? selectedMine.body : null}
					onInput={e => setNewMineBody(e.target.value)}
					onChange={e => setNewMineBody(e.target.value)}></input>

				<div className='NewMine__controls'>
					{fromEdit ? (
						<Link to={'/'} style={{ textDecoration: 'none' }}>
							<button className='NewMine__controls--update' onClick={handleUpdateMine}>
								{' '}
								Update Mine{' '}
							</button>
						</Link>
					) : (
						<Link to={'/'} style={{ textDecoration: 'none' }}>
							<button className='NewMine__controls--create' onClick={handleCreateMine}>
								{' '}
								Create Mine{' '}
							</button>
						</Link>
					)}
				</div>
			</form>
		</div>
	);
};

export default NewMine;
