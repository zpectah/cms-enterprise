import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
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

import {
	NAV_ITEMS,
	ROUTES,
	ROUTE_SETTINGS_DEFAULT_PANEL,
} from '../../../constants';
import { navItemProps, pageObjectProps } from '../../../types/pages';
import { useProfile, useSettings } from '../../../hooks/common';
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
			background-color: ${(props) => props.theme.palette.primary};
		}
	}
`;

interface NavbarProps {
	app: pageObjectProps['app'];
	dataTestId?: string;
	profileLevel: number;
}

const Navbar = ({
	dataTestId = 'navbar.primary',
	app,
	profileLevel,
}: NavbarProps) => {
	const { t } = useTranslation(['common', 'page']);
	const dispatch = useDispatch();
	const history = useHistory();
	const location = useLocation();
	const { userShouldDisplay } = useProfile();
	const { Settings } = useSettings();
	const [openSectionCrm, setOpenSectionCrm] = useState<boolean>(app == 'crm');
	const [openSectionMarket, setOpenSectionMarket] = useState<boolean>(
		app == 'market',
	);
	const sectionAppActive = true;
	const sectionCrmActive = Settings?.module_crm_active;
	const sectionMarketActive = Settings?.module_market_active;
	const sectionCrmToggle = () => setOpenSectionCrm(!openSectionCrm);
	const sectionMarketToggle = () => setOpenSectionMarket(!openSectionMarket);
	const selectedItem = useRef(null);

	const isItemSelected = (path) => {
		let selected = false;

		if (
			(!(
				path == ROUTES.app.dashboard.path ||
				path == ROUTES.crm.crmDashboard.path ||
				path == ROUTES.market.marketDashboard.path
			) &&
				location.pathname.includes(path)) ||
			location.pathname == path ||
			location.pathname == path + '/'
		)
			selected = true;

		return selected;
	};

	const linkTriggerHandler = (path: string) => {
		isMobileOnly && dispatch(sidebarToggle(false));

		if (path == ROUTES.app.settings.path)
			path = path + ROUTE_SETTINGS_DEFAULT_PANEL; // correct path to settings panels

		history.push(path);
	};

	const renderItem = (item: navItemProps, key: number) => {
		if (item.active && userShouldDisplay(item.auth))
			return (
				<StyledItem
					key={key}
					onClick={() => linkTriggerHandler(item.path)}
					selected={isItemSelected(item.path)}
					divider
					{...getElTestAttr(`${dataTestId}.item.${item.name}`)}
					ref={isItemSelected(item.path) ? selectedItem : null}
				>
					<ListItemText primary={t(`page:${item.name}.label`)} />
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
					{...getElTestAttr(`${dataTestId}.toggle.${app}`)}
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

	useEffect(() => {
		if (selectedItem.current) selectedItem.current.scrollIntoView();
	}, [selectedItem.current]);

	return (
		<>
			<List
				sx={{ width: '100%' }}
				component="div"
				aria-label={dataTestId}
				disablePadding
				{...getElTestAttr(dataTestId)}
			>
				{sectionAppActive &&
					profileLevel >= ROUTES.module.app.auth &&
					renderItems('app')}
				{sectionCrmActive &&
					profileLevel >= ROUTES.module.crm.auth &&
					renderList('crm', sectionCrmToggle, openSectionCrm)}
				{sectionMarketActive &&
					profileLevel >= ROUTES.module.market.auth &&
					renderList('market', sectionMarketToggle, openSectionMarket)}
			</List>
		</>
	);
};

export default Navbar;
