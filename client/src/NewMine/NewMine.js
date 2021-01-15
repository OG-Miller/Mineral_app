import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './newMine.css';
import { Link } from 'react-router-dom';
import { MinesContext } from '../MinesContext';

const NewMine = () => {
	const { specificMine, fromEdit, minesData, setMinesData, counter, setCounter } = useContext(
		MinesContext
	);
	const [mineStatus] = useState(fromEdit ? specificMine.mineStatus : '');
	const [newMineTitle, setNewMineTitle] = useState(fromEdit ? specificMine.title : '');
	const [newMineBody, setNewMineBody] = useState(fromEdit ? specificMine.body : '');
	const [newMineLink, setNewMineLink] = useState(fromEdit ? specificMine.bookmarkLink : '');
	const history = useHistory();

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
		const specMineId = specificMine._id;

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
		} else if (
			newMineLink.slice(0, 12) !== 'https://www.' &&
			newMineLink.slice(0, 11) !== 'http://www.'
		) {
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
			<div className='new-mine-form'>
				{/* <span className='colorIndicator__NewMine' /> */}
				<input
					maxLength='99'
					className='title-input'
					placeholder='Title'
					defaultValue={fromEdit ? specificMine.title : null}
					onChange={e => setNewMineTitle(e.target.value)}
					onInput={e => setNewMineTitle(e.target.value)}
				></input>
				<input
					className='link-input'
					placeholder='Link'
					defaultValue={fromEdit ? specificMine.bookmarkLink : null}
					required={true}
					onInput={e => setNewMineTitle(e.target.value)}
					onChange={e => setNewMineLink(e.target.value)}
				></input>
				<input
					placeholder='Note'
					label='Initial thoughts'
					type='text'
					className='body-input'
					maxLength='600'
					defaultValue={fromEdit ? specificMine.body : null}
					onInput={e => setNewMineTitle(e.target.value)}
					onChange={e => setNewMineBody(e.target.value)}
				></input>

				{/* <form>
          <label for="mining">  Mining  </label>
          <input type="radio" name="option"  value="digging" checked={ fromEdit ?  mineStatus === "digging" : null}
          onChange={(e) => setMineStatus("digging")}
          name="digging"
          />
          
          <label for="cutting">  Cutting  </label>
          <input type="radio" name="option"  value="cutting" checked={ fromEdit ? mineStatus === "cutting" : null}
          onChange={(e) => setMineStatus("cutting")}
          name="cutting"
          />
          <label for="polished">Polished  </label>
          <input type="radio" name="option" value="polished" checked={ fromEdit ? mineStatus === "polished" : null}
          onChange={(e) => setMineStatus("polished")}
          name="polished"
          />
          
        
        </form> */}
				<div className='NewMine__controls'>
					{fromEdit ? (
						<Link to={'/'} style={{ textDecoration: 'none' }}>
							<span className='NewMine__controls--update' onClick={handleUpdateMine}>
								{' '}
								Update Mine{' '}
							</span>
						</Link>
					) : (
						<Link to={'/'} style={{ textDecoration: 'none' }}>
							<span className='NewMine__controls--create' onClick={handleCreateMine}>
								{' '}
								Create Mine{' '}
							</span>
						</Link>
					)}
				</div>
			</div>
		</div>
	);
};

export default NewMine;
