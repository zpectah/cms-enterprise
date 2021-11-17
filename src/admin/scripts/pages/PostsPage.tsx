import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../constants';
import { pageObjectProps } from '../types/pages';
import Layout from '../components/Layout';
import PostsModule from '../modules/Posts';

const PostsPage = () => {
	const { t } = useTranslation(['common', 'page']);

	const pageObject: pageObjectProps = {
		app: 'app',
		name: 'Posts',
		route: ROUTES.app.posts,
	};

	return (
		<>
			<Layout.Base
				titleMeta={t('page:Posts.meta.title')}
				pageObject={pageObject}
				listIncluded
			>
				<PostsModule />
			</Layout.Base>
		</>
	);
};

export default PostsPage;
