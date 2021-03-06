import React from 'react';
import Stack, { StackProps } from '@mui/material/Stack';
import styled from 'styled-components';

import media from '../../../styles/responsive';
import { getElTestAttr } from '../../../utils/tests';

const Wrapper = styled.form`
	width: 100%;
	height: auto;
	display: flex;
	flex-direction: column;
`;
const ColumnBlock = styled.div`
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
`;
const MainBlock = styled.div<{ withSidebar: boolean }>`
	flex: 100%;

	${media.min.lg} {
		padding-right: ${(props) =>
			props.withSidebar ? props.theme.spacer : '0px'};
		flex: ${(props) => (props.withSidebar ? '75%' : '100%')};
	}
`;
const SidebarBlock = styled.div`
	flex: 100%;
	margin-top: calc(${(props) => props.theme.spacer} / 2);
	padding-top: ${(props) => props.theme.spacer};
	border-top: 1px solid ${(props) => props.theme.ui.borderSecondary};

	${media.min.lg} {
		margin-top: 0;
		padding-top: 0;
		padding-left: ${(props) => props.theme.spacer};
		flex: 25%;
		border-top: 0;
		border-left: 1px solid ${(props) => props.theme.ui.borderSecondary};
	}
`;
const SecondaryBlock = styled.footer`
	padding-top: calc(${(props) => props.theme.spacer} * 2);
`;
const FooterBlock = styled.footer`
	padding-top: ${(props) => props.theme.spacer};
`;

interface FormLayoutProps {
	secondaryChildren?: React.ReactElement | React.ReactElement[];
	outerChildren?: React.ReactElement | React.ReactElement[];
	sidebarChildren?: React.ReactElement | React.ReactElement[];
	footerChildren?: React.ReactElement | React.ReactElement[];
	footerStackProps?: StackProps;
	onSubmit?: () => void;
	onChange?: () => void;
	onBlur?: () => void;
	dataTestId?: string;
	formName?: string;
}

const FormLayout: React.FC<FormLayoutProps> = ({
	children,
	secondaryChildren,
	outerChildren,
	sidebarChildren,
	footerChildren,
	footerStackProps,
	onSubmit,
	onChange,
	onBlur,
	dataTestId = 'form.detail.layout',
	formName = 'FormDetailLayout',
}) => {
	const stackProps: StackProps = {
		spacing: 2,
		direction: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		...footerStackProps,
	};

	return (
		<>
			<Wrapper
				name={formName}
				onSubmit={onSubmit}
				onChange={onChange}
				onBlur={onBlur}
				{...getElTestAttr(dataTestId)}
			>
				<ColumnBlock>
					<MainBlock withSidebar={sidebarChildren}>{children}</MainBlock>
					{sidebarChildren && <SidebarBlock>{sidebarChildren}</SidebarBlock>}
				</ColumnBlock>
				{secondaryChildren && (
					<SecondaryBlock>{secondaryChildren}</SecondaryBlock>
				)}
				{footerChildren && (
					<FooterBlock>
						<Stack {...stackProps}>{footerChildren}</Stack>
					</FooterBlock>
				)}
			</Wrapper>
			{outerChildren && <SecondaryBlock>{outerChildren}</SecondaryBlock>}
		</>
	);
};
export default FormLayout;
