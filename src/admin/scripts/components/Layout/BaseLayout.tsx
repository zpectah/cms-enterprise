import React from 'react';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import Container, { ContainerProps } from '@mui/material/Container';
import { isDesktop } from 'react-device-detect';
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
import ContentHeading from './Content/ContentHeading';
import ContentTitle from './Content/ContentTitle';
import { Preloader } from '../ui';
import { useProfile } from '../../hooks/common';
import { getElTestAttr } from '../../utils/tests';

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
	transition: width ${(props) => props.theme.transition.duration} ease-in-out 0s,
		left ${(props) => props.theme.transition.duration} ease-in-out 0s;

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
	dataTestId?: string;
	listIncluded?: boolean;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({
	children,
	pageObject,
	titleMeta = '',
	titlePage,
	withFooter = true,
	containerMaxWidth = 'lg',
	dataTestId = 'layout.base',
	listIncluded = false,
}) => {
	const { Profile } = useProfile();
	const { sideBarOpen } = useSelector((store: storeProps) => store);
	const page_ready =
		pageObject.route.auth == 0 ? true : Profile && pageObject.route.auth > 0;

	return (
		<>
			<Helmet>
				<title>
					{config.project.admin.name} {titleMeta && `| ${titleMeta}`}
				</title>
			</Helmet>
			{page_ready ? (
				<Wrapper
					{...getElTestAttr(dataTestId)}
					data-layout-page={pageObject.name}
				>
					<Sidebar
						app={pageObject.app}
						dataTestId={`${dataTestId}.sidebar`}
						profileLevel={Profile?.user_level}
					/>
					<WrapperInner sideBarOpen={sideBarOpen}>
						{isDesktop && <ContentHeading pageObject={pageObject} />}
						<Container maxWidth={containerMaxWidth}>
							<ContentOuter>
								<Content>
									<ContentInner>
										{titlePage && (
											<ContentTitle
												title={titlePage}
												listPath={listIncluded && pageObject.route.path}
											/>
										)}
										{children}
									</ContentInner>
								</Content>
							</ContentOuter>
						</Container>
						{withFooter && <Footer dataTestId={`${dataTestId}.footer`} />}
					</WrapperInner>
					<Header dataTestId={`${dataTestId}.header`} />
				</Wrapper>
			) : (
				<Preloader.Page />
			)}
		</>
	);
};

export default BaseLayout;
