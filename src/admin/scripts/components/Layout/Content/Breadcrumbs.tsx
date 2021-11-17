import React from 'react';
import { useParams } from 'react-router-dom';
import { default as MuiBreadcrumbs } from '@mui/material/Breadcrumbs';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import config from '../../../config';
import { pageObjectProps } from '../../../types/pages';
import { Typography } from '../../ui';

const StyledText = styled(Typography.Paragraph)`
	color: ${(props) => props.theme.content.breadcrumbs.color};
`;

interface BreadcrumbsProps {
	pageObject: pageObjectProps;
}

const Breadcrumbs = ({ pageObject }: BreadcrumbsProps) => {
	const { t } = useTranslation(['common', 'page']);
	const params: any = useParams();

	return (
		<MuiBreadcrumbs aria-label="breadcrumbs">
			<StyledText small>{config.project.admin.name}</StyledText>
			{pageObject.app !== 'app' && (
				<StyledText small>{t(`app.${pageObject.app}`)}</StyledText>
			)}
			<StyledText small>{t(`page:${pageObject.route.name}.label`)}</StyledText>
			{params.id && <StyledText small>ID: {params.id}</StyledText>}
			{params.panel && <StyledText small>Panel: {params.panel}</StyledText>}
		</MuiBreadcrumbs>
	);
};

export default Breadcrumbs;
