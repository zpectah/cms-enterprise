import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { isMobileOnly } from 'react-device-detect';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider';

import { NAV_ITEMS, ROUTES } from '../../../constants';
import { navItemProps, pageObjectProps } from '../../../types/pages';
import { sidebarToggle } from '../../../store/actions';
import { getElTestAttr } from '../../../utils/tests';

interface NavbarProps {
	dataAppId?: string;
}

const Navbar = ({ dataAppId = 'navbar.primary' }: NavbarProps) => {
	const { t } = useTranslation(['common', 'page']);
	const dispatch = useDispatch();
	const history = useHistory();
	const [openSectionApp, setOpenSectionApp] = useState<boolean>(true);
	const [openSectionCrm, setOpenSectionCrm] = useState<boolean>(false);
	const [openSectionMarket, setOpenSectionMarket] = useState<boolean>(false);

	const sectionAppActive = true;
	const sectionCrmActive = false;
	const sectionMarketActive = false;

	const sectionAppToggle = () => setOpenSectionApp(!openSectionApp);
	const sectionCrmToggle = () => setOpenSectionCrm(!openSectionCrm);
	const sectionMarketToggle = () => setOpenSectionMarket(!openSectionMarket);

	const isSelected = (path) => {
		let selected = false;

		if (
			(!(path == ROUTES.app.dashboard.path) &&
				location.pathname.includes(path + '/')) ||
			location.pathname == path ||
			location.pathname == path + '/'
		)
			selected = true;

		return selected;
	};

	const linkTriggerHandler = (path: string) => {
		isMobileOnly && dispatch(sidebarToggle(false));
		history.push(path);
	};

	const renderNavItem = (item: navItemProps, key: number) => {
		if (item.active)
			return (
				<ListItemButton
					key={key}
					onClick={() => linkTriggerHandler(item.path)}
					selected={isSelected(item.path)}
					{...getElTestAttr(`${dataAppId}.item.${item.name}`)}
				>
					<ListItemText primary={item.name} />
				</ListItemButton>
			);
	};
	const renderList = (
		app: pageObjectProps['app'],
		callback: () => void,
		state: boolean,
	) => {
		return (
			<>
				{app !== 'app' && <Divider />}
				<ListItemButton
					onClick={callback}
					{...getElTestAttr(`${dataAppId}.toggle.${app}`)}
				>
					<ListItemText primary={t(`app.${app}`)} />
					{state ? <ExpandLess /> : <ExpandMore />}
				</ListItemButton>
				<Collapse in={state} timeout="auto" unmountOnExit>
					<List component="nav" disablePadding>
						{NAV_ITEMS[app].map((item: navItemProps, index) =>
							renderNavItem(item, index),
						)}
					</List>
				</Collapse>
			</>
		);
	};

	return (
		<>
			<List
				sx={{ width: '100%' }}
				component="div"
				aria-label="Navbar"
				disablePadding
				{...getElTestAttr(dataAppId)}
			>
				{sectionAppActive &&
					renderList('app', sectionAppToggle, openSectionApp)}
				{sectionCrmActive &&
					renderList('crm', sectionCrmToggle, openSectionCrm)}
				{sectionMarketActive &&
					renderList('market', sectionMarketToggle, openSectionMarket)}
			</List>
		</>
	);
};

export default Navbar;
