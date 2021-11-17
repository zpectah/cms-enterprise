import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../constants';
import { pageObjectProps } from '../types/pages';
import Layout from '../components/Layout';
import DashboardModule from '../modules/Dashboard';

const DashboardPage = () => {
	const { t } = useTranslation(['common', 'page']);

	const pageObject: pageObjectProps = {
		app: 'app',
		name: 'Dashboard',
		route: ROUTES.app.dashboard,
	};

	return (
		<>
			<Layout.Base
				titlePage={t('page:Dashboard.page.title')}
				pageObject={pageObject}
			>
				<DashboardModule />
			</Layout.Base>
		</>
	);
};

export default DashboardPage;
