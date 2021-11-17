import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../constants';
import { pageObjectProps } from '../types/pages';
import Layout from '../components/Layout';
import TranslationsModule from '../modules/Translations';

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
				pageObject={pageObject}
				listIncluded
			>
				<TranslationsModule />
			</Layout.Base>
		</>
	);
};

export default TranslationsPage;
