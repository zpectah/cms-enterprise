import React from 'react';
import { Helmet } from 'react-helmet';
import Container, { ContainerProps } from '@mui/material/Container';
import styled from 'styled-components';

import config from '../../config';
import { pageObjectProps } from '../../types/pages';
import { storeProps } from '../../types/store';
import media from '../../styles/responsive';
import {
	layoutOuterWrapper,
	layoutInnerWrapper,
	layoutContent,
	layoutContentInner,
} from '../../styles/mixins';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import ContentHeading from './ContentHeading';
import ContentTitle from './ContentTitle';
import { getElTestAttr } from '../../utils/tests';
import { useSelector } from 'react-redux';

const Wrapper = styled.div`
	${layoutOuterWrapper}

	padding-top: ${(props) => props.theme.header.height};
	justify-content: flex-start;
`;
const WrapperInner = styled.div<{ sideBarOpen: boolean }>`
	${layoutInnerWrapper}

	width: 100%;
	flex-direction: column;
	position: relative;
	left: 0;

	${media.min.md} {
		width: ${(props) =>
			props.sideBarOpen ? `calc(100% - ${props.theme.sidebar.width})` : `100%`};
		left: ${(props) =>
			props.sideBarOpen ? `calc(${props.theme.sidebar.width} / 2)` : `0px`};
	}
`;
const ContentOuter = styled.div`
	height: 100%;
	display: flex;
	width: 100%;
	flex-direction: column;
`;
const Content = styled.div`
	${layoutContent}

	flex: 1;
`;
const ContentInner = styled.div`
	${layoutContentInner}
`;

interface BaseLayoutProps {
	pageObject: pageObjectProps;
	titleMeta?: string;
	titlePage?: string;
	withFooter?: boolean;
	containerMaxWidth?: ContainerProps['maxWidth'];
	dataAppId?: string;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({
	children,
	pageObject,
	titleMeta = '',
	titlePage,
	withFooter = true,
	containerMaxWidth = 'lg',
	dataAppId = 'layout.base',
}) => {
	const { sideBarOpen } = useSelector((store: storeProps) => store);

	return (
		<>
			<Helmet>
				<title>
					{config.project.admin.name} {titleMeta && `| ${titleMeta}`}
				</title>
			</Helmet>
			<Wrapper {...getElTestAttr(dataAppId)} data-layout-page={pageObject.name}>
				<Sidebar dataAppId={`${dataAppId}.sidebar`} />
				<WrapperInner sideBarOpen={sideBarOpen}>
					<ContentHeading pageObject={pageObject} />
					<Container maxWidth={containerMaxWidth}>
						<ContentOuter>
							<Content>
								<ContentInner>
									<ContentTitle title={titlePage} />
									{children}
								</ContentInner>
							</Content>
						</ContentOuter>
					</Container>
					{withFooter && <Footer dataAppId={`${dataAppId}.footer`} />}
				</WrapperInner>
				<Header dataAppId={`${dataAppId}.header`} />
			</Wrapper>
		</>
	);
};

export default BaseLayout;
