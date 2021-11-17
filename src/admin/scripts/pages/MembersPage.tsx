import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../constants';
import { pageObjectProps } from '../types/pages';
import Layout from '../components/Layout';
import MembersModule from '../modules/Members';

const MembersPage = () => {
	const { t } = useTranslation(['common', 'page']);

	const pageObject: pageObjectProps = {
		app: 'crm',
		name: 'Members',
		route: ROUTES.crm.members,
	};

	return (
		<>
			<Layout.Base
				titleMeta={t('page:Members.meta.title')}
				pageObject={pageObject}
				listIncluded
			>
				<MembersModule />
			</Layout.Base>
		</>
	);
};

export default MembersPage;
