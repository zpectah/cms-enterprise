import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../constants';
import { pageObjectProps } from '../types/pages';
import Layout from '../components/Layout';
import ProductsModule from '../modules/Products';

const ProductsPage = () => {
	const { t } = useTranslation(['common', 'page']);

	const pageObject: pageObjectProps = {
		app: 'market',
		name: 'Products',
		route: ROUTES.market.products,
	};

	return (
		<>
			<Layout.Base
				titleMeta={t('page:Products.meta.title')}
				pageObject={pageObject}
				listIncluded
			>
				<ProductsModule />
			</Layout.Base>
		</>
	);
};

export default ProductsPage;
