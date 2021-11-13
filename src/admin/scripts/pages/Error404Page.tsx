import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../constants';
import { pageObjectProps } from '../types/pages';
import { Button, Typography } from '../components/ui';
import Layout from '../components/Layout';

interface Error404PageProps {}

const Error404Page = ({}: Error404PageProps) => {
	const { t } = useTranslation(['common', 'page']);

	const pageObject: pageObjectProps = {
		app: 'app',
		name: 'Error404',
		route: ROUTES.app.error404,
	};

	return (
		<Layout.Minimal
			titleMeta={t('page:Error404.meta.title')}
			titlePage={t('page:Error404.page.title')}
			pageObject={pageObject}
			withFooter
		>
			<div>
				<p>Lorem ipsum ...</p>
				<Button variant="contained">Return to dashboard</Button>
			</div>
		</Layout.Minimal>
	);
};

export default Error404Page;
