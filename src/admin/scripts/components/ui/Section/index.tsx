import React from 'react';
import styled from 'styled-components';

import Typography from '../Typography';

const Wrapper = styled.section`
	width: 100%;
	height: auto;
	margin-bottom: ${(props) => props.theme.spacer};
	display: flex;
	flex-direction: column;
`;
const TitleBlock = styled.div`
	width: 100%;
	padding-bottom: ${(props) => props.theme.spacer};
`;
const Block = styled.div`
	width: 100%;
`;

interface SectionProps {
	title?: string;
	beforeChildren?: React.ReactElement | React.ReactElement[];
	afterChildren?: React.ReactElement | React.ReactElement[];
	style?: {};
}

const Section: React.FC<SectionProps> = ({
	title,
	children,
	beforeChildren,
	afterChildren,
	style,
}) => {
	return (
		<Wrapper style={style}>
			{title && (
				<TitleBlock>
					<Typography.Title h2>{title}</Typography.Title>
				</TitleBlock>
			)}
			{beforeChildren && <Block>{beforeChildren}</Block>}
			<Block>{children}</Block>
			{afterChildren && <Block>{afterChildren}</Block>}
		</Wrapper>
	);
};

export default Section;
