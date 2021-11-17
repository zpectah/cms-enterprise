import React, { useEffect, useState } from 'react';
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
import styled from 'styled-components';

import { NAV_ITEMS, ROUTES } from '../../../constants';
import { navItemProps, pageObjectProps } from '../../../types/pages';
import { sidebarToggle } from '../../../store/actions';
import { getElTestAttr } from '../../../utils/tests';

const StyledItem = styled(ListItemButton)`
	&.Mui-selected {
		&::after {
			content: '';
			width: 2px;
			height: 100%;
			position: absolute;
			top: 0;
			right: 0;
			background-color: ${(props) => props.theme.palette.lightBlue};
		}
	}
`;

interface NavbarProps {
	app: pageObjectProps['app'];
	dataAppId?: string;
}

const Navbar = ({ dataAppId = 'navbar.primary', app }: NavbarProps) => {
	const { t } = useTranslation(['common', 'page']);
	const dispatch = useDispatch();
	const history = useHistory();
	// const [openSectionApp, setOpenSectionApp] = useState<boolean>(true);
	const [openSectionCrm, setOpenSectionCrm] = useState<boolean>(false);
	const [openSectionMarket, setOpenSectionMarket] = useState<boolean>(false);
	const sectionAppActive = true;
	const sectionCrmActive = true;
	const sectionMarketActive = true;
	// const sectionAppToggle = () => setOpenSectionApp(!openSectionApp);
	const sectionCrmToggle = () => setOpenSectionCrm(!openSectionCrm);
	const sectionMarketToggle = () => setOpenSectionMarket(!openSectionMarket);

	useEffect(() => {
		switch (app) {
			case 'app':
				setOpenSectionCrm(false);
				setOpenSectionMarket(false);
				return;

			case 'crm':
				setOpenSectionCrm(true);
				setOpenSectionMarket(false);
				return;

			case 'market':
				setOpenSectionCrm(false);
				setOpenSectionMarket(true);
				return;
		}
	}, [app]);

	const isItemSelected = (path) => {
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

	const renderItem = (item: navItemProps, key: number) => {
		if (item.active)
			return (
				<StyledItem
					key={key}
					onClick={() => linkTriggerHandler(item.path)}
					selected={isItemSelected(item.path)}
					divider
					{...getElTestAttr(`${dataAppId}.item.${item.name}`)}
				>
					<ListItemText primary={item.name} />
				</StyledItem>
			);
	};
	const renderItems = (app: pageObjectProps['app']) => {
		return (
			<List component="nav" disablePadding>
				{NAV_ITEMS[app].map((item: navItemProps, index) =>
					renderItem(item, index),
				)}
			</List>
		);
	};
	const renderList = (
		app: pageObjectProps['app'],
		callback: () => void,
		state: boolean,
	) => {
		return (
			<>
				<ListItemButton
					onClick={callback}
					{...getElTestAttr(`${dataAppId}.toggle.${app}`)}
				>
					<ListItemText primary={t(`app.${app}`)} />
					{state ? <ExpandLess /> : <ExpandMore />}
				</ListItemButton>
				<Divider />
				<Collapse in={state} timeout="auto" unmountOnExit>
					{renderItems(app)}
				</Collapse>
			</>
		);
	};

	return (
		<>
			<List
				sx={{ width: '100%' }}
				component="div"
				aria-label={dataAppId}
				disablePadding
				{...getElTestAttr(dataAppId)}
			>
				{sectionAppActive && renderItems('app')}
				{sectionCrmActive &&
					renderList('crm', sectionCrmToggle, openSectionCrm)}
				{sectionMarketActive &&
					renderList('market', sectionMarketToggle, openSectionMarket)}
			</List>
		</>
	);
};

export default Navbar;
