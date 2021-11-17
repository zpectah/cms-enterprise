import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../constants';
import { pageObjectProps } from '../types/pages';
import Layout from '../components/Layout';
import DistributorsModule from '../modules/Distributors';

const DistributorsPage = () => {
	const { t } = useTranslation(['common', 'page']);

	const pageObject: pageObjectProps = {
		app: 'market',
		name: 'Distributors',
		route: ROUTES.market.distributors,
	};

	return (
		<>
			<Layout.Base
				titleMeta={t('page:Distributors.meta.title')}
				pageObject={pageObject}
				listIncluded
			>
				<DistributorsModule />
			</Layout.Base>
		</>
	);
};

export default DistributorsPage;
