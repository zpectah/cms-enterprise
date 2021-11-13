import React from 'react';
import Container, { ContainerProps } from '@mui/material/Container';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import config from '../../config';
import { Typography } from '../ui';
import { getElTestAttr } from '../../utils/tests';

const Wrapper = styled.footer`
	width: 100%;
	margin-top: auto;
	padding-top: calc(${(props) => props.theme.spacer} / 2);
	padding-bottom: calc(${(props) => props.theme.spacer} / 2);
`;
const WrapperInner = styled.div<{ align: FooterProps['align'] }>`
	width: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: ${(props) => props.align};
`;
const Block = styled.div``;
const StyledText = styled(Typography.Paragraph)`
	color: ${(props) => props.theme.footer.color};
`;

interface FooterProps {
	align?: 'space-between' | 'center';
	containerMaxWidth?: ContainerProps['maxWidth'];
	dataAppId?: string;
}

const Footer: React.FC<FooterProps> = ({
	children,
	align = 'space-between',
	containerMaxWidth = 'lg',
	dataAppId = 'footer',
}) => {
	const { t } = useTranslation(['common']);

	return (
		<Wrapper {...getElTestAttr(dataAppId)}>
			<Container maxWidth={containerMaxWidth}>
				<WrapperInner align={align}>
					<Block>
						<StyledText small>
							&copy; {config.project.admin.copyrightYear}{' '}
							{config.project.admin.name} | {t('common.allRightsReserved')}
						</StyledText>
					</Block>
					{children && <Block>{children}</Block>}
				</WrapperInner>
			</Container>
		</Wrapper>
	);
};

export default Footer;
