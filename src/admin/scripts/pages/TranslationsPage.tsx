import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../constants';
import { pageObjectProps } from '../types/pages';
import Layout from '../components/Layout';

interface TranslationsPageProps {}

const TranslationsPage = ({}: TranslationsPageProps) => {
	const { t } = useTranslation(['common', 'page']);

	const pageObject: pageObjectProps = {
		app: 'app',
		name: 'Translations',
		route: ROUTES.app.translations,
	};

	return (
		<>
			<Layout.Base
				titleMeta={t('page:Translations.meta.title')}
				titlePage={t('page:Translations.page.title')}
				pageObject={pageObject}
				listIncluded
			>
				<>Translations page</>
			</Layout.Base>
		</>
	);
};

export default TranslationsPage;
