import React from 'react';
import Container, { ContainerProps } from '@mui/material/Container';
import styled from 'styled-components';

import { pageObjectProps } from '../../../types/pages';
import Breadcrumbs from './Breadcrumbs';
import Time from './Time';

const Wrapper = styled.header`
	min-height: 46px;
	padding-top: calc(${(props) => props.theme.spacer} / 2);
	padding-bottom: calc(${(props) => props.theme.spacer} / 2);
	border-bottom: 1px solid ${(props) => props.theme.ui.borderSecondary};
`;
const WrapperInner = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

interface ContentHeadingProps {
	containerMaxWidth?: ContainerProps['maxWidth'];
	pageObject: pageObjectProps;
}

const ContentHeading: React.FC<ContentHeadingProps> = ({
	children,
	containerMaxWidth = 'lg',
	pageObject,
}) => {
	return (
		<Wrapper>
			<Container maxWidth={containerMaxWidth}>
				<WrapperInner>
					<Breadcrumbs pageObject={pageObject} />
					{children && <div>{children}</div>}
					<Time />
				</WrapperInner>
			</Container>
		</Wrapper>
	);
};

export default ContentHeading;
