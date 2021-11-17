import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../constants';
import { pageObjectProps } from '../types/pages';
import Layout from '../components/Layout';
import UploadsModule from '../modules/Uploads';

interface UploadsPageProps {}

const UploadsPage = ({}: UploadsPageProps) => {
	const { t } = useTranslation(['common', 'page']);

	const pageObject: pageObjectProps = {
		app: 'app',
		name: 'Uploads',
		route: ROUTES.app.uploads,
	};

	return (
		<>
			<Layout.Base
				titleMeta={t('page:Uploads.meta.title')}
				pageObject={pageObject}
				listIncluded
			>
				<UploadsModule />
			</Layout.Base>
		</>
	);
};

export default UploadsPage;
