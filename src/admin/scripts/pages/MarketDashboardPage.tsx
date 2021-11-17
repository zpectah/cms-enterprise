import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../constants';
import { pageObjectProps } from '../types/pages';
import Layout from '../components/Layout';
import DashboardModule from '../modules/Dashboard';

const MarketDashboardPage = () => {
	const { t } = useTranslation(['common', 'page']);

	const pageObject: pageObjectProps = {
		app: 'market',
		name: 'MarketDashboard',
		route: ROUTES.market.marketDashboard,
	};

	return (
		<>
			<Layout.Base
				titlePage={t('page:MarketDashboard.page.title')}
				pageObject={pageObject}
			>
				<DashboardModule />
			</Layout.Base>
		</>
	);
};

export default MarketDashboardPage;
