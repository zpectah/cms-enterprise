import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../constants';
import { pageObjectProps } from '../types/pages';
import Layout from '../components/Layout';
import LoginForm from '../modules/Login/LoginForm';

const LoginPage = () => {
	const { t } = useTranslation(['common', 'page']);

	const pageObject: pageObjectProps = {
		app: 'app',
		name: 'Login',
		route: ROUTES.app.login,
	};

	return (
		<>
			<Layout.Minimal
				titleMeta={t('page:Login.meta.title')}
				titlePage={t('page:Login.page.title')}
				pageObject={pageObject}
				withFooter
			>
				<LoginForm />
			</Layout.Minimal>
		</>
	);
};

export default LoginPage;
