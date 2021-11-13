import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import LogoutIcon from '@mui/icons-material/Logout';
import Divider from '@mui/material/Divider';
import PersonIcon from '@mui/icons-material/Person';
import MenuBookIcon from '@mui/icons-material/MenuBook';

import { ROUTES } from '../../constants';
import { Avatar } from '../ui';
import { getElTestAttr } from '../../utils/tests';

interface UserDropdownProps {
	dataAppId?: string;
}

const UserDropdown = ({ dataAppId = 'user.dropdown' }: UserDropdownProps) => {
	const history = useHistory();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const dropdownOpenHandler = (event: React.MouseEvent<HTMLElement>) => {
		console.log('...handleClick');
		setAnchorEl(event.currentTarget);
	};
	const dropdownCloseHandler = () => {
		setAnchorEl(null);
	};

	const profileClickHandler = () => history.push(ROUTES.app.profile.path);

	const helpClickHandler = () => history.push(ROUTES.app.help.path);

	const logoutClickHandler = () => {
		console.log('logoutClickHandler');

		// TODO: after confirm !!!

		history.push(ROUTES.app.login.path);
	};

	return (
		<>
			<Avatar
				nickName={'zpecter'}
				firstName={'Tomáš'}
				lastName={'Sychra'}
				// image={''}
				onClick={dropdownOpenHandler}
			/>
			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={dropdownCloseHandler}
				onClick={dropdownCloseHandler}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
				{...getElTestAttr(dataAppId)}
			>
				<MenuItem onClick={profileClickHandler}>
					<ListItemIcon>
						<PersonIcon fontSize="small" />
					</ListItemIcon>
					sychrat@gmail.com
				</MenuItem>
				<Divider />
				<MenuItem onClick={helpClickHandler}>
					<ListItemIcon>
						<MenuBookIcon fontSize="small" />
					</ListItemIcon>
					Help
				</MenuItem>
				<MenuItem onClick={logoutClickHandler}>
					<ListItemIcon>
						<LogoutIcon fontSize="small" />
					</ListItemIcon>
					Logout
				</MenuItem>
			</Menu>
		</>
	);
};

export default UserDropdown;
