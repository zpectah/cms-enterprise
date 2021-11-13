import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../constants';
import { pageObjectProps } from '../types/pages';
import Layout from '../components/Layout';

interface TagsPageProps {}

const TagsPage = ({}: TagsPageProps) => {
	const { t } = useTranslation(['common', 'page']);

	const pageObject: pageObjectProps = {
		app: 'app',
		name: 'Tags',
		route: ROUTES.app.tags,
	};

	return (
		<>
			<Layout.Base
				titleMeta={t('page:Tags.meta.title')}
				titlePage={t('page:Tags.page.title')}
				pageObject={pageObject}
				listIncluded
			>
				<>Tags page</>
			</Layout.Base>
		</>
	);
};

export default TagsPage;
