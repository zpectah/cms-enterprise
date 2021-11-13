import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../constants';
import { pageObjectProps } from '../types/pages';
import Layout from '../components/Layout';

interface CategoriesPageProps {}

const CategoriesPage = ({}: CategoriesPageProps) => {
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
				titlePage={t('page:Categories.page.title')}
				pageObject={pageObject}
			>
				<>Categories page</>
			</Layout.Base>
		</>
	);
};

export default CategoriesPage;
