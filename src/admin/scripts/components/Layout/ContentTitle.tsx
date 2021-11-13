import React from 'react';
import styled from 'styled-components';

import { Typography } from '../ui';

const Wrapper = styled.div<{ textAlign: ContentTitleProps['textAlign'] }>`
	margin-bottom: ${(props) => props.theme.spacer};
	padding-top: ${(props) => props.theme.spacer};
	padding-bottom: ${(props) => props.theme.spacer};
	text-align: ${(props) => props.textAlign};
`;

interface ContentTitleProps {
	title?: string;
	textAlign?: 'inherit' | 'center';
}

const ContentTitle: React.FC<ContentTitleProps> = ({
	children,
	title,
	textAlign = 'inherit',
}) => {
	return (
		<Wrapper textAlign={textAlign}>
			{children ? (
				<>{children}</>
			) : (
				<Typography.Title h1>{title}</Typography.Title>
			)}
		</Wrapper>
	);
};

export default ContentTitle;
