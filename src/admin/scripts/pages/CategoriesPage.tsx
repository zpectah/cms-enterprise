import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../constants';
import { pageObjectProps } from '../types/pages';
import Layout from '../components/Layout';
import CategoriesModule from '../modules/Categories';

const CategoriesPage = () => {
	const { t } = useTranslation(['common', 'page']);

	const pageObject: pageObjectProps = {
		app: 'app',
		name: 'Categories',
		route: ROUTES.app.categories,
	};

	return (
		<>
			<Layout.Base
				titleMeta={t('page:Categories.meta.title')}
				pageObject={pageObject}
				listIncluded
			>
				<CategoriesModule />
			</Layout.Base>
		</>
	);
};

export default CategoriesPage;
