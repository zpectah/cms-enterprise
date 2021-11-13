import React from 'react';
import Stack, { StackProps } from '@mui/material/Stack';
import styled from 'styled-components';

import media from '../../../styles/responsive';

const Wrapper = styled.div`
	width: 100%;
	height: auto;
`;
const ColumnBlock = styled.div`
	display: flex;
	flex-wrap: wrap;
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
const FooterBlock = styled.footer`
	padding-top: ${(props) => props.theme.spacer};
`;

interface FormDetailLayoutProps {
	sidebarChildren?: React.ReactElement | React.ReactElement[];
	footerChildren?: React.ReactElement | React.ReactElement[];
	footerStackProps?: StackProps;
}

const FormDetailLayout: React.FC<FormDetailLayoutProps> = ({
	children,
	sidebarChildren,
	footerChildren,
	footerStackProps,
}) => {
	const stackProps: StackProps = {
		spacing: 2,
		direction: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		...footerStackProps,
	};

	return (
		<Wrapper>
			<ColumnBlock>
				<MainBlock withSidebar={sidebarChildren}>{children}</MainBlock>
				{sidebarChildren && <SidebarBlock>{sidebarChildren}</SidebarBlock>}
			</ColumnBlock>
			{footerChildren && (
				<FooterBlock>
					<Stack {...stackProps}>{footerChildren}</Stack>
				</FooterBlock>
			)}
		</Wrapper>
	);
};
export default FormDetailLayout;
