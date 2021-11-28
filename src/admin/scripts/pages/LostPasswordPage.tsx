import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../constants';
import { pageObjectProps } from '../types/pages';
import Layout from '../components/Layout';
import LostPasswordModule from '../modules/LostPassword';

const LostPasswordPage = () => {
	const { t } = useTranslation(['common', 'page']);

	const pageObject: pageObjectProps = {
		app: 'app',
		name: 'LostPassword',
		route: ROUTES.app.lostPassword,
	};

	return (
		<>
			<Layout.Minimal
				titleMeta={t('page:LostPassword.meta.title')}
				titlePage={t('page:LostPassword.page.title')}
				pageObject={pageObject}
				withFooter
			>
				<LostPasswordModule />
			</Layout.Minimal>
		</>
	);
};

export default LostPasswordPage;
