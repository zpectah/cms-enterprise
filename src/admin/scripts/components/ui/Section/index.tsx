import React from 'react';
import styled from 'styled-components';

import Typography from '../Typography';

const Wrapper = styled.section<{ visible: boolean; noSpacing: boolean }>`
	width: 100%;
	height: auto;
	margin-bottom: ${(props) => (props.noSpacing ? '0' : props.theme.spacer)};
	display: ${(props) => (props.visible ? 'flex' : 'none')};
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
	visible?: boolean;
	noSpacing?: boolean;
}

const Section: React.FC<SectionProps> = ({
	title,
	children,
	beforeChildren,
	afterChildren,
	style,
	visible = true,
	noSpacing = false,
}) => {
	return (
		<Wrapper style={style} visible={visible} noSpacing={noSpacing}>
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
