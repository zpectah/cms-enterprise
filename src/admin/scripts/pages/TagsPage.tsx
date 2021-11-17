import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../constants';
import { pageObjectProps } from '../types/pages';
import Layout from '../components/Layout';
import TagsModule from '../modules/Tags';

const TagsPage = () => {
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
				pageObject={pageObject}
				listIncluded
			>
				<TagsModule />
			</Layout.Base>
		</>
	);
};

export default TagsPage;
