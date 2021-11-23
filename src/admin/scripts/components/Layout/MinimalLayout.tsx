import React from 'react';
import { Helmet } from 'react-helmet';
import Container, { ContainerProps } from '@mui/material/Container';
import styled from 'styled-components';

import config from '../../config';
import { pageObjectProps } from '../../types/pages';
import {
	layoutOuterWrapper,
	layoutInnerWrapper,
	layoutContent,
	layoutContentInner,
} from '../../styles/mixins';
import Footer from './Footer';
import ContentTitle from './Content/ContentTitle';
import { getElTestAttr } from '../../utils/tests';

const Wrapper = styled.div`
	${layoutOuterWrapper}
`;
const WrapperInner = styled.div`
	${layoutInnerWrapper}
`;
const Content = styled.div`
	${layoutContent}

	height: 100%;
`;
const ContentInner = styled.div`
	${layoutContentInner}

	height: 100%;
	justify-content: center;
	align-items: center;
`;

interface MinimalLayoutProps {
	pageObject: pageObjectProps;
	titleMeta?: string;
	titlePage?: string;
	withFooter?: boolean;
	containerMaxWidth?: ContainerProps['maxWidth'];
	dataTestId?: string;
}

const MinimalLayout: React.FC<MinimalLayoutProps> = ({
	children,
	pageObject,
	titleMeta,
	titlePage,
	withFooter = false,
	containerMaxWidth = 'md',
	dataTestId = 'layout.minimal',
}) => {
	return (
		<>
			<Helmet>
				<title>
					{config.project.admin.name} {titleMeta && `| ${titleMeta}`}
				</title>
			</Helmet>
			<Wrapper
				{...getElTestAttr(dataTestId)}
				data-layout-page={pageObject.name}
			>
				<WrapperInner>
					<Container maxWidth={containerMaxWidth}>
						<Content>
							<ContentInner>
								{titlePage && (
									<ContentTitle title={titlePage} textAlign={'center'} />
								)}
								{children}
							</ContentInner>
						</Content>
					</Container>
				</WrapperInner>
				{withFooter && (
					<Footer align={'center'} dataTestId={`${dataTestId}.footer`} />
				)}
			</Wrapper>
		</>
	);
};

export default MinimalLayout;
