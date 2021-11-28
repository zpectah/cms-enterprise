import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as ThemeProviderSC } from 'styled-components';

import { storeProps } from './types/store';
import themes from './styles/themes';
import muiTheme from './styles/mui.theme';
import { GlobalStyles } from './styles/global';
import ThemeService from './services/Theme.service';
import HelpService from './services/Help.service';
import LanguageService from './services/Language.service';
import ToastsModule from './modules/Toasts';
import { ROUTES, ROUTE_PATH_PARAMS } from './constants';
import ErrorBoundary from './components/ErrorBoundary';
import AuthRoute from './components/AuthRoute';
import Error404Page from './pages/Error404Page';
import LoginPage from './pages/LoginPage';
import LostPasswordPage from './pages/LostPasswordPage';
import DashboardPage from './pages/DashboardPage';
import SettingsPage from './pages/SettingsPage';
import ProfilePage from './pages/ProfilePage';
import HelpPage from './pages/HelpPage';
import PostsPage from './pages/PostsPage';
import UploadsPage from './pages/UploadsPage';
import MenuPage from './pages/MenuPage';
import TagsPage from './pages/TagsPage';
import CategoriesPage from './pages/CategoriesPage';
import TranslationsPage from './pages/TranslationsPage';
import PagesPage from './pages/PagesPage';
import UsersPage from './pages/UsersPage';
import CrmDashboardPage from './pages/CrmDashboardPage';
import MembersPage from './pages/MembersPage';
import MarketDashboardPage from './pages/MarketDashboardPage';
import DeliveriesPage from './pages/DeliveriesPage';
import DistributorsPage from './pages/DistributorsPage';
import OrdersPage from './pages/OrdersPage';
import PaymentsPage from './pages/PaymentsPage';
import ProducersPage from './pages/ProducersPage';
import ProductsPage from './pages/ProductsPage';
import StoresPage from './pages/StoresPage';

const App = () => {
	const { theme } = useSelector((store: storeProps) => store);

	useEffect(() => {
		ThemeService.init();
		HelpService.init();
		LanguageService.init();

		return () => {};
	}, []);

	return (
		<ThemeProviderSC theme={themes[theme]}>
			<CssBaseline />
			<GlobalStyles />
			<ThemeProvider theme={muiTheme}>
				<ErrorBoundary>
					<Router>
						<Switch>
							<AuthRoute
								path={[
									ROUTES.market.deliveries.path,
									ROUTES.market.deliveries.path + ROUTE_PATH_PARAMS.detail,
								]}
								component={DeliveriesPage}
								auth={ROUTES.market.deliveries.auth}
								exact
							/>
							<AuthRoute
								path={[
									ROUTES.market.distributors.path,
									ROUTES.market.distributors.path + ROUTE_PATH_PARAMS.detail,
								]}
								component={DistributorsPage}
								auth={ROUTES.market.distributors.auth}
								exact
							/>
							<AuthRoute
								path={[
									ROUTES.market.orders.path,
									ROUTES.market.orders.path + ROUTE_PATH_PARAMS.detail,
								]}
								component={OrdersPage}
								auth={ROUTES.market.orders.auth}
								exact
							/>
							<AuthRoute
								path={[
									ROUTES.market.payments.path,
									ROUTES.market.payments.path + ROUTE_PATH_PARAMS.detail,
								]}
								component={PaymentsPage}
								auth={ROUTES.market.payments.auth}
								exact
							/>
							<AuthRoute
								path={[
									ROUTES.market.producers.path,
									ROUTES.market.producers.path + ROUTE_PATH_PARAMS.detail,
								]}
								component={ProducersPage}
								auth={ROUTES.market.producers.auth}
								exact
							/>
							<AuthRoute
								path={[
									ROUTES.market.products.path,
									ROUTES.market.products.path + ROUTE_PATH_PARAMS.detail,
								]}
								component={ProductsPage}
								auth={ROUTES.market.products.auth}
								exact
							/>
							<AuthRoute
								path={[
									ROUTES.market.stores.path,
									ROUTES.market.stores.path + ROUTE_PATH_PARAMS.detail,
								]}
								component={StoresPage}
								auth={ROUTES.market.stores.auth}
								exact
							/>
							<AuthRoute
								path={ROUTES.market.marketDashboard.path}
								component={MarketDashboardPage}
								auth={ROUTES.market.marketDashboard.auth}
								exact
							/>

							<AuthRoute
								path={[
									ROUTES.crm.members.path,
									ROUTES.crm.members.path + ROUTE_PATH_PARAMS.detail,
								]}
								component={MembersPage}
								auth={ROUTES.crm.members.auth}
								exact
							/>
							<AuthRoute
								path={ROUTES.crm.crmDashboard.path}
								component={CrmDashboardPage}
								auth={ROUTES.crm.crmDashboard.auth}
								exact
							/>
							<AuthRoute
								path={[
									ROUTES.app.settings.path,
									ROUTES.app.settings.path + ROUTE_PATH_PARAMS.panel,
								]}
								component={SettingsPage}
								auth={ROUTES.app.settings.auth}
								exact
							/>
							<AuthRoute
								path={[
									ROUTES.app.users.path,
									ROUTES.app.users.path + ROUTE_PATH_PARAMS.detail,
								]}
								component={UsersPage}
								auth={ROUTES.app.users.auth}
								exact
							/>
							<AuthRoute
								path={[
									ROUTES.app.posts.path,
									ROUTES.app.posts.path + ROUTE_PATH_PARAMS.detail,
								]}
								component={PostsPage}
								auth={ROUTES.app.posts.auth}
								exact
							/>
							<AuthRoute
								path={[
									ROUTES.app.uploads.path,
									ROUTES.app.uploads.path + ROUTE_PATH_PARAMS.detail,
								]}
								component={UploadsPage}
								auth={ROUTES.app.uploads.auth}
								exact
							/>
							<AuthRoute
								path={[
									ROUTES.app.menu.path,
									ROUTES.app.menu.path + ROUTE_PATH_PARAMS.detail,
								]}
								component={MenuPage}
								auth={ROUTES.app.menu.auth}
								exact
							/>
							<AuthRoute
								path={[
									ROUTES.app.tags.path,
									ROUTES.app.tags.path + ROUTE_PATH_PARAMS.detail,
								]}
								component={TagsPage}
								auth={ROUTES.app.tags.auth}
								exact
							/>
							<AuthRoute
								path={[
									ROUTES.app.categories.path,
									ROUTES.app.categories.path + ROUTE_PATH_PARAMS.detail,
								]}
								component={CategoriesPage}
								auth={ROUTES.app.categories.auth}
								exact
							/>
							<AuthRoute
								path={[
									ROUTES.app.translations.path,
									ROUTES.app.translations.path + ROUTE_PATH_PARAMS.detail,
								]}
								component={TranslationsPage}
								auth={ROUTES.app.translations.auth}
								exact
							/>
							<AuthRoute
								path={[
									ROUTES.app.pages.path,
									ROUTES.app.pages.path + ROUTE_PATH_PARAMS.detail,
								]}
								component={PagesPage}
								auth={ROUTES.app.pages.auth}
								exact
							/>
							<AuthRoute
								path={[
									ROUTES.app.help.path,
									ROUTES.app.help.path + ROUTE_PATH_PARAMS.panel,
								]}
								component={HelpPage}
								auth={ROUTES.app.help.auth}
								exact
							/>
							<Route
								path={[
									ROUTES.app.lostPassword.path,
									ROUTES.app.lostPassword.path + ROUTE_PATH_PARAMS.token,
								]}
								component={LostPasswordPage}
								exact
							/>
							<Route path={ROUTES.app.login.path} component={LoginPage} />
							<AuthRoute
								path={ROUTES.app.profile.path}
								component={ProfilePage}
								auth={ROUTES.app.profile.auth}
								exact
							/>
							<AuthRoute
								path={ROUTES.app.dashboard.path}
								component={DashboardPage}
								auth={ROUTES.app.dashboard.auth}
								exact
							/>
							<Route component={Error404Page} />
						</Switch>
					</Router>
					<ToastsModule />
				</ErrorBoundary>
			</ThemeProvider>
		</ThemeProviderSC>
	);
};

export default App;
