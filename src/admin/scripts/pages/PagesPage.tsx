import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../constants';
import { pageObjectProps } from '../types/pages';
import Layout from '../components/Layout';
import PagesModule from '../modules/Pages';

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
				pageObject={pageObject}
				listIncluded
			>
				<PagesModule />
			</Layout.Base>
		</>
	);
};

export default PagesPage;
