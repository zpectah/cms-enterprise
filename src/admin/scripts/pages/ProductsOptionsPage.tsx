import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../constants';
import { pageObjectProps } from '../types/pages';
import Layout from '../components/Layout';
import ProductsOptionsModule from '../modules/ProductsOptions';

const ProductsOptionsPage = () => {
	const { t } = useTranslation(['common', 'page']);

	const pageObject: pageObjectProps = {
		app: 'market',
		name: 'ProductsOptions',
		route: ROUTES.market.productsOptions,
	};

	return (
		<>
			<Layout.Base
				titleMeta={t('page:ProductsOptions.meta.title')}
				pageObject={pageObject}
				listIncluded
			>
				<ProductsOptionsModule />
			</Layout.Base>
		</>
	);
};

export default ProductsOptionsPage;
