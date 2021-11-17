import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { ROUTES } from '../constants';
import { pageObjectProps } from '../types/pages';
import { Button, Typography } from '../components/ui';
import Layout from '../components/Layout';

const Error404Page = () => {
	const { t } = useTranslation(['common', 'page']);
	const history = useHistory();

	const pageObject: pageObjectProps = {
		app: 'app',
		name: 'Error404',
		route: ROUTES.app.error404,
	};

	const dashboardClickHandler = () => history.push(ROUTES.app.dashboard.path);

	return (
		<Layout.Minimal
			titleMeta={t('page:Error404.meta.title')}
			titlePage={t('page:Error404.page.title')}
			pageObject={pageObject}
			withFooter
		>
			<Typography.Paragraph p>
				{t('page:Error404.page.description')}
			</Typography.Paragraph>
			<Button variant="contained" onClick={dashboardClickHandler}>
				{t('page:Error404.page.button')}
			</Button>
		</Layout.Minimal>
	);
};

export default Error404Page;
