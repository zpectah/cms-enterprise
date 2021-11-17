import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../constants';
import { pageObjectProps } from '../types/pages';
import Layout from '../components/Layout';
import HelpModule from '../modules/Help';

interface HelpPageProps {}

const HelpPage = ({}: HelpPageProps) => {
	const { t } = useTranslation(['common', 'page']);

	const pageObject: pageObjectProps = {
		app: 'app',
		name: 'Help',
		route: ROUTES.app.help,
	};

	return (
		<>
			<Layout.Base
				titleMeta={t('page:Help.meta.title')}
				titlePage={t('page:Help.page.title')}
				pageObject={pageObject}
			>
				<HelpModule />
			</Layout.Base>
		</>
	);
};

export default HelpPage;
