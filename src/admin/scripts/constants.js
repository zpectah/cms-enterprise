export const PIXEL_COEFFICIENT = 0.02;
export const RESPONSIVE_BREAKPOINTS = {
	xs: 0,
	sm: 576,
	md: 768,
	lg: 992,
	xl: 1200,
	xxl: 1400,
};
export const TOASTS_TIMEOUT_DEFAULT = 3500;
export const TOASTS_TIMEOUT_ERROR = 5000;
export const UI_VIEW_TOLERANCE = 50;
export const EMAIL_REGEX =
	/^(?:(?!.*?[.]{2})[a-zA-Z0-9](?:[a-zA-Z0-9.+!%-]{1,64}|)|\"[a-zA-Z0-9.+!% -]{1,64}\")@[a-zA-Z0-9][a-zA-Z0-9.-]+(.[a-z]{2,}|.[0-9]{1,})$/;
export const DEFAULT_UNITS = {
	price: 'czk',
	weight: 'kg',
	length: 'mm',
	units: 'pcs',
};
export const FORM_INPUT_MIN_LENGTH = 3;
export const FORM_INPUT_MAX_LENGTH = 500;
export const ELEMENT_DATA_TEST_ATTR = 'data-test-id';
export const USER_LEVEL_NUMS = {
	none: 0,
	demo: 1,
	redactor: 2,
	chief_redactor: 3,
	admin: 5,
	super_admin: 7,
};
export const USER_NUMS_LEVEL = {
	0: 'none',
	1: 'demo',
	2: 'redactor',
	3: 'chief_redactor',
	5: 'admin',
	7: 'super_admin',
};
export const ORDER_STATUS_NUMS = {
	0: 'canceled',
	1: 'created',
	2: 'confirmed',
	3: 'deleted',
};
export const IMAGE_CROP_OPTIONS = [
	{
		label: '1:1',
		value: 1 / 1,
	},
	{
		label: '3:2',
		value: 3 / 2,
	},
	{
		label: '4:3',
		value: 4 / 3,
	},
	{
		label: '16:9',
		value: 16 / 9,
	},
	{
		label: '2:3',
		value: 2 / 3,
	},
	{
		label: '3:4',
		value: 3 / 4,
	},
	{
		label: '9:16',
		value: 9 / 16,
	},
];
export const DATA_TABLE = {
	rowsPerPage: [5, 10, 25, 50, 100],
	rowsDefault: 25,
	rowHeightDefault: 55,
	sortDefault: 'asc',
};
export const ROUTE_SUFFIX = {
	detail: '/id',
	panel: '',
	token: '/token',
};
export const ROUTE_PATH_PARAMS = {
	detail: ROUTE_SUFFIX.detail + '/:id',
	panel: ROUTE_SUFFIX.panel + '/:panel',
	token: ROUTE_SUFFIX.token + '/:token',
};
export const ROUTE_PATH_ROOT = '/admin';
export const ROUTE_PATH_CRM = '/crm';
export const ROUTE_PATH_MARKET = '/market';
export const ROUTE_SETTINGS_DEFAULT_PANEL = '/global';
export const ROUTE_HELP_DEFAULT_PANEL = '/common';
export const ROUTES = {
	module: {
		app: {
			auth: USER_LEVEL_NUMS.redactor,
		},
		crm: {
			auth: USER_LEVEL_NUMS.chief_redactor,
		},
		market: {
			auth: USER_LEVEL_NUMS.chief_redactor,
		},
	},
	app: {
		error404: {
			path: null,
			name: 'Error404',
			auth: USER_LEVEL_NUMS.none,
		},
		login: {
			path: ROUTE_PATH_ROOT + '/login',
			name: 'Login',
			auth: USER_LEVEL_NUMS.none,
		},
		lostPassword: {
			path: ROUTE_PATH_ROOT + '/lost-password',
			name: 'LostPassword',
			auth: USER_LEVEL_NUMS.none,
		},
		dashboard: {
			path: ROUTE_PATH_ROOT,
			name: 'Dashboard',
			auth: USER_LEVEL_NUMS.redactor,
		},
		settings: {
			path: ROUTE_PATH_ROOT + '/settings',
			name: 'Settings',
			auth: USER_LEVEL_NUMS.admin,
		},
		help: {
			path: ROUTE_PATH_ROOT + '/help',
			name: 'Help',
			auth: USER_LEVEL_NUMS.redactor,
		},
		profile: {
			path: ROUTE_PATH_ROOT + '/profile',
			name: 'Profile',
			auth: USER_LEVEL_NUMS.redactor,
		},
		posts: {
			path: ROUTE_PATH_ROOT + '/posts',
			name: 'Posts',
			auth: USER_LEVEL_NUMS.redactor,
		},
		users: {
			path: ROUTE_PATH_ROOT + '/users',
			name: 'Users',
			auth: USER_LEVEL_NUMS.admin,
		},
		tags: {
			path: ROUTE_PATH_ROOT + '/tags',
			name: 'Tags',
			auth: USER_LEVEL_NUMS.redactor,
		},
		translations: {
			path: ROUTE_PATH_ROOT + '/translations',
			name: 'Translations',
			auth: USER_LEVEL_NUMS.chief_redactor,
		},
		categories: {
			path: ROUTE_PATH_ROOT + '/categories',
			name: 'Categories',
			auth: USER_LEVEL_NUMS.redactor,
		},
		pages: {
			path: ROUTE_PATH_ROOT + '/pages',
			name: 'Pages',
			auth: USER_LEVEL_NUMS.chief_redactor,
		},
		uploads: {
			path: ROUTE_PATH_ROOT + '/uploads',
			name: 'Uploads',
			auth: USER_LEVEL_NUMS.redactor,
		},
		menu: {
			path: ROUTE_PATH_ROOT + '/menu',
			name: 'Menu',
			auth: USER_LEVEL_NUMS.chief_redactor,
		},
	},
	crm: {
		crmDashboard: {
			path: ROUTE_PATH_ROOT + ROUTE_PATH_CRM + '/',
			name: 'CrmDashboard',
			auth: USER_LEVEL_NUMS.chief_redactor,
		},
		members: {
			path: ROUTE_PATH_ROOT + ROUTE_PATH_CRM + '/members',
			name: 'Members',
			auth: USER_LEVEL_NUMS.chief_redactor,
		},
	},
	market: {
		marketDashboard: {
			path: ROUTE_PATH_ROOT + ROUTE_PATH_MARKET + '/',
			name: 'MarketDashboard',
			auth: USER_LEVEL_NUMS.chief_redactor,
		},
		deliveries: {
			path: ROUTE_PATH_ROOT + ROUTE_PATH_MARKET + '/deliveries',
			name: 'Deliveries',
			auth: USER_LEVEL_NUMS.chief_redactor,
		},
		distributors: {
			path: ROUTE_PATH_ROOT + ROUTE_PATH_MARKET + '/distributors',
			name: 'Distributors',
			auth: USER_LEVEL_NUMS.chief_redactor,
		},
		orders: {
			path: ROUTE_PATH_ROOT + ROUTE_PATH_MARKET + '/orders',
			name: 'Orders',
			auth: USER_LEVEL_NUMS.chief_redactor,
		},
		payments: {
			path: ROUTE_PATH_ROOT + ROUTE_PATH_MARKET + '/payments',
			name: 'Payments',
			auth: USER_LEVEL_NUMS.chief_redactor,
		},
		producers: {
			path: ROUTE_PATH_ROOT + ROUTE_PATH_MARKET + '/producers',
			name: 'Producers',
			auth: USER_LEVEL_NUMS.chief_redactor,
		},
		products: {
			path: ROUTE_PATH_ROOT + ROUTE_PATH_MARKET + '/products',
			name: 'Products',
			auth: USER_LEVEL_NUMS.chief_redactor,
		},
		stores: {
			path: ROUTE_PATH_ROOT + ROUTE_PATH_MARKET + '/stores',
			name: 'Stores',
			auth: USER_LEVEL_NUMS.chief_redactor,
		},
	},
};
export const NAV_ITEMS = {
	app: [
		{
			name: ROUTES.app.dashboard.name,
			path: ROUTES.app.dashboard.path,
			active: true,
			auth: USER_LEVEL_NUMS.redactor,
		},
		{
			name: ROUTES.app.settings.name,
			path: ROUTES.app.settings.path,
			active: true,
			auth: USER_LEVEL_NUMS.admin,
		},
		{
			name: ROUTES.app.users.name,
			path: ROUTES.app.users.path,
			active: true,
			auth: USER_LEVEL_NUMS.admin,
		},
		{
			name: ROUTES.app.posts.name,
			path: ROUTES.app.posts.path,
			active: true,
			auth: USER_LEVEL_NUMS.redactor,
		},
		{
			name: ROUTES.app.tags.name,
			path: ROUTES.app.tags.path,
			active: true,
			auth: USER_LEVEL_NUMS.redactor,
		},
		{
			name: ROUTES.app.categories.name,
			path: ROUTES.app.categories.path,
			active: true,
			auth: USER_LEVEL_NUMS.redactor,
		},
		{
			name: ROUTES.app.translations.name,
			path: ROUTES.app.translations.path,
			active: true,
			auth: USER_LEVEL_NUMS.chief_redactor,
		},
		{
			name: ROUTES.app.pages.name,
			path: ROUTES.app.pages.path,
			active: true,
			auth: USER_LEVEL_NUMS.chief_redactor,
		},
		{
			name: ROUTES.app.uploads.name,
			path: ROUTES.app.uploads.path,
			active: true,
			auth: USER_LEVEL_NUMS.redactor,
		},
		{
			name: ROUTES.app.menu.name,
			path: ROUTES.app.menu.path,
			active: true,
			auth: USER_LEVEL_NUMS.chief_redactor,
		},
	],
	crm: [
		{
			name: ROUTES.crm.crmDashboard.name,
			path: ROUTES.crm.crmDashboard.path,
			active: true,
			auth: USER_LEVEL_NUMS.chief_redactor,
		},
		{
			name: ROUTES.crm.members.name,
			path: ROUTES.crm.members.path,
			active: true,
			auth: USER_LEVEL_NUMS.chief_redactor,
		},
	],
	market: [
		{
			name: ROUTES.market.marketDashboard.name,
			path: ROUTES.market.marketDashboard.path,
			active: true,
			auth: USER_LEVEL_NUMS.chief_redactor,
		},
		{
			name: ROUTES.market.deliveries.name,
			path: ROUTES.market.deliveries.path,
			active: true,
			auth: USER_LEVEL_NUMS.chief_redactor,
		},
		{
			name: ROUTES.market.payments.name,
			path: ROUTES.market.payments.path,
			active: true,
			auth: USER_LEVEL_NUMS.chief_redactor,
		},
		{
			name: ROUTES.market.stores.name,
			path: ROUTES.market.stores.path,
			active: true,
			auth: USER_LEVEL_NUMS.chief_redactor,
		},
		{
			name: ROUTES.market.orders.name,
			path: ROUTES.market.orders.path,
			active: true,
			auth: USER_LEVEL_NUMS.chief_redactor,
		},
		{
			name: ROUTES.market.products.name,
			path: ROUTES.market.products.path,
			active: true,
			auth: USER_LEVEL_NUMS.chief_redactor,
		},
		{
			name: ROUTES.market.distributors.name,
			path: ROUTES.market.distributors.path,
			active: true,
			auth: USER_LEVEL_NUMS.chief_redactor,
		},
		{
			name: ROUTES.market.producers.name,
			path: ROUTES.market.producers.path,
			active: true,
			auth: USER_LEVEL_NUMS.chief_redactor,
		},
	],
};
export const MAPBOX_DEFAULTS = {
	// token is in: config.project.private.mapboxToken
	defaultLocation: {
		longitude: 14.501273600376752,
		latitude: 50.08322927731517,
		zoom: 10,
	},
};
