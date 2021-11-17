import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../constants';
import { pageObjectProps } from '../types/pages';
import Layout from '../components/Layout';
import DashboardModule from '../modules/Dashboard';

const CrmDashboardPage = () => {
	const { t } = useTranslation(['common', 'page']);

	const pageObject: pageObjectProps = {
		app: 'crm',
		name: 'CrmDashboard',
		route: ROUTES.crm.crmDashboard,
	};

	return (
		<>
			<Layout.Base
				titlePage={t('page:CrmDashboard.page.title')}
				pageObject={pageObject}
			>
				<DashboardModule />
			</Layout.Base>
		</>
	);
};

export default CrmDashboardPage;
