import React, { useEffect, useContext } from 'react';
import MineLink from '../MineLink/MineLink';
import { MinesContext } from '../MinesContext';
import './home.css';

function Home() {
	const { minesData, setMinesData, searchVal, setSearchVal } = useContext(MinesContext);

	useEffect(() => {
		setSearchVal('');
		setTimeout(() => {
			fetchAllMines();
		}, 300);
	}, []);

	const fetchAllMines = async () => {
		const allMinesResponse = await fetch('http://localhost:5000/mines');
		const jsonResponse = await allMinesResponse.json();
		setMinesData(jsonResponse);
	};

	const searchedPosts = minesData.filter(mine => {
		return mine.title.toLowerCase().includes(searchVal.toLowerCase());
	});

	return (
		<div className='home-main'>
			{searchVal.length < 1 &&
				minesData
					.slice(0)
					.reverse()
					.map(mine => (
						<MineLink
							key={mine._id}
							_id={mine._id}
							createdAt={mine.createdAt}
							title={mine.title}
							bookmarkLink={
								mine.bookmarkLink.length < 40
									? mine.bookmarkLink
									: mine.bookmarkLink.substr(8, 40) + '...'
							}
						/>
					))}
			{searchVal.length > 0 &&
				searchedPosts.map(mine => (
					<MineLink
						key={mine._id}
						_id={mine._id}
						createdAt={mine.createdAt}
						title={mine.title}
						bookmarkLink={mine.bookmarkLink}
						// bookmarkLink={
						// 	mine.bookmarkLink.length < 40
						// 		? mine.bookmarkLink
						// 		: mine.bookmarkLink.substr(8, 40) + '...'
						// }
					/>
				))}
		</div>
	);
}

export default Home;
