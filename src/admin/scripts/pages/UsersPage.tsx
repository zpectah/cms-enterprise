import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../constants';
import { pageObjectProps } from '../types/pages';
import Layout from '../components/Layout';

interface UsersPageProps {}

const UsersPage = ({}: UsersPageProps) => {
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
				titlePage={t('page:Users.page.title')}
				pageObject={pageObject}
				listIncluded
			>
				<>Users page</>
			</Layout.Base>
		</>
	);
};

export default UsersPage;
