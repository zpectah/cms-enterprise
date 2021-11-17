import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../constants';
import { pageObjectProps } from '../types/pages';
import Layout from '../components/Layout';
import DeliveriesModule from '../modules/Deliveries';

const DeliveriesPage = () => {
	const { t } = useTranslation(['common', 'page']);

	const pageObject: pageObjectProps = {
		app: 'market',
		name: 'Deliveries',
		route: ROUTES.market.deliveries,
	};

	return (
		<>
			<Layout.Base
				titleMeta={t('page:Deliveries.meta.title')}
				pageObject={pageObject}
				listIncluded
			>
				<DeliveriesModule />
			</Layout.Base>
		</>
	);
};

export default DeliveriesPage;
