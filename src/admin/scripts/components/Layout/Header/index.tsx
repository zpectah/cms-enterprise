import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import config from '../../../config';
import { ROUTES } from '../../../constants';
import { Typography } from '../../ui';
import SidebarToggle from './SidebarToggle';
import UserDropdown from './UserDropdown';
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
	backdrop-filter: blur(${(props) => props.theme.header.backdropBlur});
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
	dataTestId?: string;
}

const Header = ({ dataTestId = 'header' }: HeaderProps) => {
	const history = useHistory();

	const titleClickHandler = () => {
		history.push(ROUTES.app.dashboard.path);
	};

	return (
		<Wrapper {...getElTestAttr(dataTestId)}>
			<Block>
				<SidebarToggle />
			</Block>
			<Block>
				<StyledTitle span>
					<span
						onClick={titleClickHandler}
						{...getElTestAttr(`${dataTestId}.trigger.home`)}
					>
						{config.project.admin.name}
					</span>
				</StyledTitle>
			</Block>
			<Block>
				<UserDropdown />
			</Block>
		</Wrapper>
	);
};

export default Header;
