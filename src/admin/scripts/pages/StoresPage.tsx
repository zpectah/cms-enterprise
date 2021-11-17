import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../constants';
import { pageObjectProps } from '../types/pages';
import Layout from '../components/Layout';
import StoresModule from '../modules/Stores';

const StoresPage = () => {
	const { t } = useTranslation(['common', 'page']);

	const pageObject: pageObjectProps = {
		app: 'market',
		name: 'Stores',
		route: ROUTES.market.stores,
	};

	return (
		<>
			<Layout.Base
				titleMeta={t('page:Stores.meta.title')}
				pageObject={pageObject}
				listIncluded
			>
				<StoresModule />
			</Layout.Base>
		</>
	);
};

export default StoresPage;
