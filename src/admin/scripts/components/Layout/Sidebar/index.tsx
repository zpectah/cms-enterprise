import React from 'react';
import styled from 'styled-components';

import media from '../../../styles/responsive';
import { storeProps } from '../../../types/store';
import { Scrollable } from '../../ui';
import Navbar from './Navbar';
import { getElTestAttr } from '../../../utils/tests';
import { useSelector } from 'react-redux';

const Wrapper = styled.aside<{ sideBarOpen: boolean }>`
	width: 100%;
	height: calc(100vh - ${(props) => props.theme.header.height});
	position: fixed;
	top: ${(props) => props.theme.header.height};
	left: ${(props) => (props.sideBarOpen ? `0px` : `-100%`)};
	color: ${(props) => props.theme.sidebar.color};
	background-color: ${(props) => props.theme.sidebar.bg};
	border-right: 1px solid ${(props) => props.theme.ui.borderBase};
	z-index: ${(props) => props.theme.sidebar.zIndex};
	transition: width ${(props) => props.theme.transition.duration} ease-in-out 0s,
		left ${(props) => props.theme.transition.duration} ease-in-out 0s;

	${media.min.md} {
		width: ${(props) => props.theme.sidebar.width};
		left: ${(props) =>
			props.sideBarOpen ? `0px` : `calc(${props.theme.sidebar.width} * -1)`};
	}
`;

interface SidebarProps {
	dataAppId?: string;
}

const Sidebar = ({ dataAppId = 'sidebar' }: SidebarProps) => {
	const { sideBarOpen } = useSelector((store: storeProps) => store);

	return (
		<Wrapper sideBarOpen={sideBarOpen} {...getElTestAttr(dataAppId)}>
			<Scrollable>
				<Navbar />
			</Scrollable>
		</Wrapper>
	);
};

export default Sidebar;
