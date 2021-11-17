import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div<{ align: ModuleViewHeadingProps['alignOverride'] }>`
	width: 100%;
	padding-bottom: ${(props) => props.theme.spacer};
	display: flex;
	align-items: center;
	justify-content: ${(props) => props.align};
`;
const Block = styled.div`
	display: flex;
	flex-direction: row;
`;

interface ModuleViewHeadingProps {
	secondaryChildren?: React.ReactElement | React.ReactElement[];
	tertiaryChildren?: React.ReactElement | React.ReactElement[];
	alignOverride?: 'flex-start' | 'center' | 'space-between' | 'flex-end';
}

const ModuleViewHeading: React.FC<ModuleViewHeadingProps> = ({
	children,
	secondaryChildren,
	tertiaryChildren,
	alignOverride = 'space-between',
}) => {
	return (
		<Wrapper align={alignOverride}>
			{children && <Block>{children}</Block>}
			{secondaryChildren && <Block>{secondaryChildren}</Block>}
			{tertiaryChildren && <Block>{tertiaryChildren}</Block>}
		</Wrapper>
	);
};

export default ModuleViewHeading;
