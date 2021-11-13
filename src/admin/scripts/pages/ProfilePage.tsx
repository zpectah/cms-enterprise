import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../constants';
import { pageObjectProps } from '../types/pages';
import Layout from '../components/Layout';

interface ProfilePageProps {}

const ProfilePage = ({}: ProfilePageProps) => {
	const { t } = useTranslation(['common', 'page']);

	const pageObject: pageObjectProps = {
		app: 'app',
		name: 'Profile',
		route: ROUTES.app.profile,
	};

	return (
		<>
			<Layout.Base
				titleMeta={t('page:Profile.meta.title')}
				titlePage={t('page:Profile.page.title')}
				pageObject={pageObject}
			>
				<>Profile page</>
			</Layout.Base>
		</>
	);
};

export default ProfilePage;
