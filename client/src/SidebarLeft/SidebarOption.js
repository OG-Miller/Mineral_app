import React, { useContext, useState } from 'react';
import './sidebarOption.css';
import { Link } from 'react-router-dom';
import { MinesContext } from '../MinesContext';

const SidebarOption = ({ Icon, page, title }) => {
	const { setFromEdit, setNoteFormIsShow } = useContext(MinesContext);

	const [fontCol, setFontCol] = useState('#c7c5c5');

	const styles = {
		color: fontCol,
		textDecoration: 'none',
	};

	const handleClick = () => {
		setNoteFormIsShow(false);
		setFromEdit(false);
	};

	return (
		<div className='button-div'>
			<Link
				onMouseEnter={() => setFontCol('orange')}
				onMouseLeave={() => {
					setFontCol('#c7c5c5');
				}}
				className='link'
				to={page}
			>
				<div style={styles} className='sidebar-option' onClick={handleClick}>
					{Icon && <Icon className='icon' />}
					<h4>{title}</h4>
				</div>
			</Link>
		</div>
	);
};

export default SidebarOption;
