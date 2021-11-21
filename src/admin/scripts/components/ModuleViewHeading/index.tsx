import React from 'react';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import styled from 'styled-components';

const Wrapper = styled.div<{ align: ModuleViewHeadingProps['alignOverride'] }>`
	width: 100%;
	min-height: 58px;
	margin-bottom: calc(${(props) => props.theme.spacer} / 2);
	padding-bottom: ${(props) => props.theme.spacer};
	display: flex;
	align-items: center;
	justify-content: ${(props) => props.align};
`;
const Block = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
`;
const AdditionalWrapper = styled.div`
	width: 100%;
	margin-top: calc((${(props) => props.theme.spacer} / 2) * -1);
	margin-bottom: ${(props) => props.theme.spacer};
`;

interface ModuleViewHeadingProps {
	secondaryChildren?: React.ReactElement | React.ReactElement[];
	tertiaryChildren?: React.ReactElement | React.ReactElement[];
	additionalChildren?: React.ReactElement | React.ReactElement[];
	alignOverride?: 'flex-start' | 'center' | 'space-between' | 'flex-end';
	stackSpacing?: number;
}

const ModuleViewHeading: React.FC<ModuleViewHeadingProps> = ({
	children,
	secondaryChildren,
	tertiaryChildren,
	additionalChildren,
	alignOverride = 'space-between',
	stackSpacing = 2,
}) => {
	return (
		<>
			<Wrapper align={alignOverride}>
				{children && (
					<Block>
						<Stack
							spacing={stackSpacing}
							direction="row"
							justifyContent="space-between"
						>
							{children}
						</Stack>
					</Block>
				)}
				{secondaryChildren && (
					<Block>
						<Stack
							spacing={stackSpacing}
							direction="row"
							justifyContent="space-between"
						>
							{secondaryChildren}
						</Stack>
					</Block>
				)}
				{tertiaryChildren && (
					<Block>
						<Stack
							spacing={stackSpacing}
							direction="row"
							justifyContent="space-between"
						>
							{tertiaryChildren}
						</Stack>
					</Block>
				)}
			</Wrapper>
			{additionalChildren && (
				<>
					<AdditionalWrapper>
						<Stack
							spacing={stackSpacing}
							direction="row"
							justifyContent="space-between"
						>
							{additionalChildren}
						</Stack>
					</AdditionalWrapper>
					<Divider />
				</>
			)}
		</>
	);
};

export default ModuleViewHeading;
