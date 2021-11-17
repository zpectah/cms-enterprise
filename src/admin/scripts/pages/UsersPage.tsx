import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../constants';
import { pageObjectProps } from '../types/pages';
import Layout from '../components/Layout';
import UsersModule from '../modules/Users';

const UsersPage = () => {
	const { t } = useTranslation(['common', 'page']);

	const pageObject: pageObjectProps = {
		app: 'app',
		name: 'Users',
		route: ROUTES.app.users,
	};

	return (
		<>
			<Layout.Base
				titleMeta={t('page:Users.meta.title')}
				pageObject={pageObject}
				listIncluded
			>
				<UsersModule />
			</Layout.Base>
		</>
	);
};

export default UsersPage;
