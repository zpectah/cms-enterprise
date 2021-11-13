import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../constants';
import { pageObjectProps } from '../types/pages';
import Layout from '../components/Layout';

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
				titlePage={t('page:Uploads.page.title')}
				pageObject={pageObject}
			>
				<>Uploads page</>
			</Layout.Base>
		</>
	);
};

export default UploadsPage;
