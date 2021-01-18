import { React, useContext } from 'react';
import './header.css';
import logo from '/Users/gavinmiller/Documents/Coding/test_mern/client/src/Mineral-reverse-mark2-05.png';
import { MinesContext } from '../MinesContext';
import SearchIcon from '@material-ui/icons/Search';

const Header = () => {
	const { setSearchVal } = useContext(MinesContext);

	return (
		<div className='header'>
			<div className='Header__contents'>
				<img src={logo} alt='Mineral Diamond M logo' />
				{window.location.pathname === '/' && (
					<div className='Header__search'>
						<SearchIcon className='Header__search--icon' />
						<input
							placeholder='Search mines'
							className='Header__search--input'
							onChange={e => {
								setSearchVal(e.target.value);
							}}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default Header;
