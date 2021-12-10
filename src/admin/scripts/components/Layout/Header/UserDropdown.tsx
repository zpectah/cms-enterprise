import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import LogoutIcon from '@mui/icons-material/Logout';
import Divider from '@mui/material/Divider';
import PersonIcon from '@mui/icons-material/Person';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { ROUTES, ROUTE_HELP_DEFAULT_PANEL } from '../../../constants';
import { Avatar, ConfirmDialog } from '../../ui';
import { useProfile } from '../../../hooks/common';
import media from '../../../styles/responsive';
import { getElTestAttr } from '../../../utils/tests';

const UserEmailText = styled.small`
	display: none;

	${media.min.md} {
		display: inline-block;
	}
`;

interface UserDropdownProps {
	dataTestId?: string;
}

const UserDropdown = ({ dataTestId = 'user.dropdown' }: UserDropdownProps) => {
	const history = useHistory();
	const { t } = useTranslation(['common', 'components']);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [confirmDialog, setConfirmDialog] = useState<boolean>(false);
	const { Profile, userLogout } = useProfile();
	const open = Boolean(anchorEl);

	const dropdownOpenHandler = (event: React.MouseEvent<HTMLElement>) =>
		setAnchorEl(event.currentTarget);
	const dropdownCloseHandler = () => setAnchorEl(null);
	const profileClickHandler = () => history.push(ROUTES.app.profile.path);
	const helpClickHandler = () =>
		history.push(ROUTES.app.help.path + ROUTE_HELP_DEFAULT_PANEL);
	const logoutClickHandler = () => setConfirmDialog(true);
	const logoutConfirmHandler = () => {
		userLogout().then(() => {
			history.push(ROUTES.app.login.path);
		});
	};
	const closeConfirmDialog = () => setConfirmDialog(false);

	return (
		<>
			<div>
				<UserEmailText>{Profile.email}</UserEmailText>
				<Avatar
					nickName={Profile.nick_name}
					firstName={Profile.first_name}
					lastName={Profile.last_name}
					image={Profile.img_avatar}
					onClick={dropdownOpenHandler}
					dataTestId={`${dataTestId}.avatar`}
					size={'28px'}
				/>
			</div>
			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={dropdownCloseHandler}
				onClick={dropdownCloseHandler}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
			>
				<div style={{ minWidth: '170px' }} {...getElTestAttr(dataTestId)}>
					<MenuItem
						onClick={profileClickHandler}
						{...getElTestAttr(`${dataTestId}.item.profile`)}
					>
						<ListItemIcon>
							<PersonIcon fontSize="small" />
						</ListItemIcon>
						{t('components:Header.UserDropdown.profile')}
					</MenuItem>
					<MenuItem
						onClick={helpClickHandler}
						{...getElTestAttr(`${dataTestId}.item.help`)}
					>
						<ListItemIcon>
							<MenuBookIcon fontSize="small" />
						</ListItemIcon>
						{t('components:Header.UserDropdown.help')}
					</MenuItem>
					<Divider />
					<MenuItem
						onClick={logoutClickHandler}
						{...getElTestAttr(`${dataTestId}.item.logOut`)}
					>
						<ListItemIcon>
							<LogoutIcon fontSize="small" />
						</ListItemIcon>
						{t('components:Header.UserDropdown.logOut')}
					</MenuItem>
				</div>
			</Menu>
			<ConfirmDialog
				isOpen={confirmDialog}
				onClose={closeConfirmDialog}
				confirmMethod={'logOut'}
				onConfirm={logoutConfirmHandler}
			/>
		</>
	);
};

export default UserDropdown;
