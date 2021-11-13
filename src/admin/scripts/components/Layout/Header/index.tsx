import React from 'react';
import { useHistory } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import styled from 'styled-components';

import config from '../../../config';
import { ROUTES } from '../../../constants';
import { Typography } from '../../ui';
import SidebarToggle from './SidebarToggle';
import UserDropdown from './UserDropdown';
import SettingsButton from './SettingsButton';
import { getElTestAttr } from '../../../utils/tests';

const Wrapper = styled.header`
	width: 100%;
	padding-left: calc(${(props) => props.theme.spacer} / 2);
	padding-right: calc(${(props) => props.theme.spacer} / 2);
	height: ${(props) => props.theme.header.height};
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	color: ${(props) => props.theme.header.color};
	background-color: ${(props) => props.theme.header.bg};
	border-bottom: 1px solid ${(props) => props.theme.ui.borderBase};
	z-index: ${(props) => props.theme.header.zIndex};
`;
const Block = styled.div``;
const StyledTitle = styled(Typography.Paragraph)`
	font-size: 1.25rem;
	font-weight: 700;
	letter-spacing: -0.05rem;
	color: inherit;

	& > span {
		cursor: pointer;
	}
`;

interface HeaderProps {
	dataAppId?: string;
}

const Header = ({ dataAppId = 'header' }: HeaderProps) => {
	const history = useHistory();

	const titleClickHandler = () => {
		history.push(ROUTES.app.dashboard.path);
	};

	return (
		<Wrapper {...getElTestAttr(dataAppId)}>
			<Block>
				<Tooltip title="Sidebar toggle">
					<span>
						<SidebarToggle />
					</span>
				</Tooltip>
			</Block>
			<Block>
				<StyledTitle span>
					<span onClick={titleClickHandler}>{config.project.admin.name}</span>
				</StyledTitle>
			</Block>
			<Block>
				<Tooltip title="Settings">
					<span>
						<SettingsButton />
					</span>
				</Tooltip>
				<UserDropdown />
			</Block>
		</Wrapper>
	);
};

export default Header;
