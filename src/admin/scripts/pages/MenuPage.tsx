import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../constants';
import { pageObjectProps } from '../types/pages';
import Layout from '../components/Layout';
import MenuModule from '../modules/Menu';

interface MenuPageProps {}

const MenuPage = ({}: MenuPageProps) => {
	const { t } = useTranslation(['common', 'page']);

	const pageObject: pageObjectProps = {
		app: 'app',
		name: 'Menu',
		route: ROUTES.app.menu,
	};

	return (
		<>
			<Layout.Base
				titleMeta={t('page:Menu.meta.title')}
				pageObject={pageObject}
				listIncluded
			>
				<MenuModule />
			</Layout.Base>
		</>
	);
};

export default MenuPage;
