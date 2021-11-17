import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../constants';
import { pageObjectProps } from '../types/pages';
import Layout from '../components/Layout';
import ProducersModule from '../modules/Producers';

const ProducersPage = () => {
	const { t } = useTranslation(['common', 'page']);

	const pageObject: pageObjectProps = {
		app: 'market',
		name: 'Producers',
		route: ROUTES.market.producers,
	};

	return (
		<>
			<Layout.Base
				titleMeta={t('page:Producers.meta.title')}
				pageObject={pageObject}
				listIncluded
			>
				<ProducersModule />
			</Layout.Base>
		</>
	);
};

export default ProducersPage;
