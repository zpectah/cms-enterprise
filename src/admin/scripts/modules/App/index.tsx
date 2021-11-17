import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { ROUTES, ROUTE_SUFFIX } from '../../constants';
import AuthRoute from '../../components/AuthRoute';
import Error404Page from '../../pages/Error404Page';
import LoginPage from '../../pages/LoginPage';
import LostPasswordPage from '../../pages/LostPasswordPage';
import DashboardPage from '../../pages/DashboardPage';
import SettingsPage from '../../pages/SettingsPage';
import ProfilePage from '../../pages/ProfilePage';
import HelpPage from '../../pages/HelpPage';
import PostsPage from '../../pages/PostsPage';
import UploadsPage from '../../pages/UploadsPage';
import MenuPage from '../../pages/MenuPage';
import TagsPage from '../../pages/TagsPage';
import CategoriesPage from '../../pages/CategoriesPage';
import TranslationsPage from '../../pages/TranslationsPage';
import PagesPage from '../../pages/PagesPage';
import UsersPage from '../../pages/UsersPage';

const AppModule = () => {
	const routesApp = ROUTES.app;

	return (
		<Switch>
			<Route
				path={[
					routesApp.lostPassword.path,
					routesApp.lostPassword.path + ROUTE_SUFFIX.token,
				]}
				component={LostPasswordPage}
				exact
			/>

			<Route path={routesApp.login.path} component={LoginPage} />

			<AuthRoute
				path={[
					routesApp.settings.path,
					routesApp.settings.path + ROUTE_SUFFIX.panel,
				]}
				component={SettingsPage}
				auth={routesApp.settings.auth}
				exact
			/>

			<AuthRoute
				path={[
					routesApp.users.path,
					routesApp.users.path + ROUTE_SUFFIX.detailId,
				]}
				component={UsersPage}
				auth={routesApp.users.auth}
				exact
			/>

			<AuthRoute
				path={[
					routesApp.posts.path,
					routesApp.posts.path + ROUTE_SUFFIX.detailId,
				]}
				component={PostsPage}
				auth={routesApp.posts.auth}
				exact
			/>

			<AuthRoute
				path={[
					routesApp.uploads.path,
					routesApp.uploads.path + ROUTE_SUFFIX.detailId,
				]}
				component={UploadsPage}
				auth={routesApp.uploads.auth}
				exact
			/>

			<AuthRoute
				path={[
					routesApp.menu.path,
					routesApp.menu.path + ROUTE_SUFFIX.detailId,
				]}
				component={MenuPage}
				auth={routesApp.menu.auth}
				exact
			/>

			<AuthRoute
				path={[
					routesApp.tags.path,
					routesApp.tags.path + ROUTE_SUFFIX.detailId,
				]}
				component={TagsPage}
				auth={routesApp.tags.auth}
				exact
			/>

			<AuthRoute
				path={[
					routesApp.categories.path,
					routesApp.categories.path + ROUTE_SUFFIX.detailId,
				]}
				component={CategoriesPage}
				auth={routesApp.categories.auth}
				exact
			/>

			<AuthRoute
				path={[
					routesApp.translations.path,
					routesApp.translations.path + ROUTE_SUFFIX.detailId,
				]}
				component={TranslationsPage}
				auth={routesApp.translations.auth}
				exact
			/>

			<AuthRoute
				path={[
					routesApp.pages.path,
					routesApp.pages.path + ROUTE_SUFFIX.detailId,
				]}
				component={PagesPage}
				auth={routesApp.pages.auth}
				exact
			/>

			<AuthRoute
				path={routesApp.dashboard.path}
				component={DashboardPage}
				auth={routesApp.dashboard.auth}
				exact
			/>

			<AuthRoute
				path={[routesApp.help.path, routesApp.help.path + ROUTE_SUFFIX.panel]}
				component={HelpPage}
				auth={routesApp.help.auth}
				exact
			/>

			<AuthRoute
				path={routesApp.profile.path}
				component={ProfilePage}
				auth={routesApp.profile.auth}
				exact
			/>

			<Route component={Error404Page} />
		</Switch>
	);
};

export default AppModule;
