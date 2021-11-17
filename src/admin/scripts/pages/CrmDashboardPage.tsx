import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../constants';
import { pageObjectProps } from '../types/pages';
import Layout from '../components/Layout';
import CrmDashboardModule from '../modules/CrmDashboard';

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
				<CrmDashboardModule />
			</Layout.Base>
		</>
	);
};

export default CrmDashboardPage;
