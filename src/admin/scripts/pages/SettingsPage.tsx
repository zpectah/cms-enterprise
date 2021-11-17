import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../constants';
import { pageObjectProps } from '../types/pages';
import Layout from '../components/Layout';
import SettingsModule from '../modules/Settings';

const SettingsPage = () => {
	const { t } = useTranslation(['common', 'page']);

	const pageObject: pageObjectProps = {
		app: 'app',
		name: 'Settings',
		route: ROUTES.app.settings,
	};

	return (
		<>
			<Layout.Base
				titleMeta={t('page:Settings.meta.title')}
				titlePage={t('page:Settings.page.title')}
				pageObject={pageObject}
			>
				<SettingsModule />
			</Layout.Base>
		</>
	);
};

export default SettingsPage;
