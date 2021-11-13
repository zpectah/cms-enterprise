import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

import { sidebarToggle } from '../../store/actions';
import { storeProps } from '../../types/store';
import { getElTestAttr } from '../../utils/tests';

interface SidebarToggleProps extends IconButtonProps {
	dataAppId?: string;
}

const SidebarToggle = (props: SidebarToggleProps) => {
	const { sideBarOpen } = useSelector((store: storeProps) => store);
	const dispatch = useDispatch();
	const [sidebarOpen, setSidebarOpen] = useState<boolean>(sideBarOpen);
	const { dataAppId = 'toggle.sidebar', ...rest } = props;

	const toggleSidebar = () => {
		let ns = !sidebarOpen;

		setSidebarOpen(ns);
		dispatch(sidebarToggle(ns));
	};

	return (
		<IconButton
			onClick={toggleSidebar}
			aria-label="sidebar toggle"
			{...rest}
			{...getElTestAttr(dataAppId)}
		>
			{sidebarOpen ? (
				<MenuOpenIcon fontSize="inherit" />
			) : (
				<MenuIcon fontSize="inherit" />
			)}
		</IconButton>
	);
};

export default SidebarToggle;
