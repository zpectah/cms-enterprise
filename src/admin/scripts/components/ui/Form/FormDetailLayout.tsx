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
	padding: ${(props) => props.theme.spacer};
	flex: 100%;

	${media.min.md} {
		padding-left: 0;
		flex: ${(props) => (props.withSidebar ? '75%' : '100%')};
	}
`;
const SidebarBlock = styled.div`
	padding: ${(props) => props.theme.spacer};
	flex: 100%;

	${media.min.md} {
		padding-right: 0;
		flex: 25%;
		border-left: 1px solid ${(props) => props.theme.ui.borderSecondary};
	}
`;
const SecondaryBlock = styled.footer`
	padding-top: ${(props) => props.theme.spacer};
`;
const FooterBlock = styled.footer`
	padding-top: ${(props) => props.theme.spacer};
`;

interface FormDetailLayoutProps {
	secondaryChildren?: React.ReactElement | React.ReactElement[];
	sidebarChildren?: React.ReactElement | React.ReactElement[];
	footerChildren?: React.ReactElement | React.ReactElement[];
	footerStackProps?: StackProps;
	onSubmit?: () => void;
	dataAppId?: string;
	formName?: string;
}

const FormDetailLayout: React.FC<FormDetailLayoutProps> = ({
	children,
	secondaryChildren,
	sidebarChildren,
	footerChildren,
	footerStackProps,
	onSubmit,
	dataAppId = 'form.detail.layout',
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
		<Wrapper name={formName} onSubmit={onSubmit} {...getElTestAttr(dataAppId)}>
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
	);
};
export default FormDetailLayout;
