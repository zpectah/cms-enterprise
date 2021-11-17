import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../constants';
import { pageObjectProps } from '../types/pages';
import Layout from '../components/Layout';
import OrdersModule from '../modules/Orders';

const OrdersPage = () => {
	const { t } = useTranslation(['common', 'page']);

	const pageObject: pageObjectProps = {
		app: 'market',
		name: 'Orders',
		route: ROUTES.market.orders,
	};

	return (
		<>
			<Layout.Base
				titleMeta={t('page:Orders.meta.title')}
				pageObject={pageObject}
				listIncluded
			>
				<OrdersModule />
			</Layout.Base>
		</>
	);
};

export default OrdersPage;
