import React from 'react';
import Container, { ContainerProps } from '@mui/material/Container';
import styled from 'styled-components';

import { pageObjectProps } from '../../types/pages';
import Breadcrumbs from './Breadcrumbs';

const Wrapper = styled.div`
	padding-top: calc(${(props) => props.theme.spacer} / 2);
	padding-bottom: calc(${(props) => props.theme.spacer} / 2);
	border-bottom: 1px solid ${(props) => props.theme.ui.borderSecondary};
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
				{children ? <>{children}</> : <Breadcrumbs pageObject={pageObject} />}
			</Container>
		</Wrapper>
	);
};

export default ContentHeading;
