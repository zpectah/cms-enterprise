import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../constants';
import { pageObjectProps } from '../types/pages';
import Layout from '../components/Layout';

interface LostPasswordPageProps {}

const LostPasswordPage = ({}: LostPasswordPageProps) => {
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
			>
				<>LostPassword page</>
			</Layout.Minimal>
		</>
	);
};

export default LostPasswordPage;
