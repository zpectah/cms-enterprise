import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../constants';
import { pageObjectProps } from '../types/pages';
import Layout from '../components/Layout';
import PaymentsModule from '../modules/Payments';

const PaymentsPage = () => {
	const { t } = useTranslation(['common', 'page']);

	const pageObject: pageObjectProps = {
		app: 'market',
		name: 'Payments',
		route: ROUTES.market.payments,
	};

	return (
		<>
			<Layout.Base
				titleMeta={t('page:Payments.meta.title')}
				pageObject={pageObject}
				listIncluded
			>
				<PaymentsModule />
			</Layout.Base>
		</>
	);
};

export default PaymentsPage;
