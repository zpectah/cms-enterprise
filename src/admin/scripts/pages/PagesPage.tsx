import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../constants';
import { pageObjectProps } from '../types/pages';
import Layout from '../components/Layout';

interface PagesPageProps {}

const PagesPage = ({}: PagesPageProps) => {
	const { t } = useTranslation(['common', 'page']);

	const pageObject: pageObjectProps = {
		app: 'app',
		name: 'Pages',
		route: ROUTES.app.pages,
	};

	return (
		<>
			<Layout.Base
				titleMeta={t('page:Pages.meta.title')}
				titlePage={t('page:Pages.page.title')}
				pageObject={pageObject}
			>
				<>Pages page</>
			</Layout.Base>
		</>
	);
};

export default PagesPage;
