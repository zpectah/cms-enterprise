export const PIXEL_COEFFICIENT = 0.02;
export const RESPONSIVE_BREAKPOINTS = {
	xs: 0,
	sm: 576,
	md: 768,
	lg: 992,
	xl: 1200,
	xxl: 1400,
};
export const UI_VIEW_TOLERANCE = 50;
export const EMAIL_REGEX =
	/^(?:(?!.*?[.]{2})[a-zA-Z0-9](?:[a-zA-Z0-9.+!%-]{1,64}|)|\"[a-zA-Z0-9.+!% -]{1,64}\")@[a-zA-Z0-9][a-zA-Z0-9.-]+(.[a-z]{2,}|.[0-9]{1,})$/;
export const DEFAULT_UNITS = {
	price: 'EUR',
	weight: 'Kg',
	length: 'mm',
};
export const ELEMENT_DATA_TEST_ATTR = 'data-app-id';
export const USER_LEVEL = {
	demo: {
		id: 0,
		key: 'demo',
	},
	redactor: {
		id: 2,
		key: 'redactor',
	},
	chief_redactor: {
		id: 3,
		key: 'chief_redactor',
	},
	admin: {
		id: 5,
		key: 'admin',
	},
	super_admin: {
		id: 7,
		key: 'super_admin',
	},
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
	//
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
};
export const ROUTE_SUFFIX = {
	detail: '/id',
	detailId: '/id/:id',
	panel: '/:panel',
	token: '/:token',
};
export const ROUTE_PATH_ROOT = '/admin';
export const ROUTES = {
	app: {
		error404: {
			path: null,
			name: 'Error404',
			auth: 0,
		},
		login: {
			path: ROUTE_PATH_ROOT + '/login',
			name: 'Login',
			auth: 0,
		},
		lostPassword: {
			path: ROUTE_PATH_ROOT + '/lost-password',
			name: 'LostPassword',
			auth: 0,
		},
		dashboard: {
			path: ROUTE_PATH_ROOT,
			name: 'Dashboard',
			auth: USER_LEVEL.redactor.id,
		},
		settings: {
			path: ROUTE_PATH_ROOT + '/settings',
			name: 'Settings',
			auth: USER_LEVEL.admin.id,
		},
		help: {
			path: ROUTE_PATH_ROOT + '/help',
			name: 'Help',
			auth: USER_LEVEL.redactor.id,
		},
		profile: {
			path: ROUTE_PATH_ROOT + '/profile',
			name: 'Profile',
			auth: USER_LEVEL.redactor.id,
		},
		posts: {
			path: ROUTE_PATH_ROOT + '/posts',
			name: 'Posts',
			auth: USER_LEVEL.redactor.id,
		},
		users: {
			path: ROUTE_PATH_ROOT + '/users',
			name: 'Users',
			auth: USER_LEVEL.admin.id,
		},
		tags: {
			path: ROUTE_PATH_ROOT + '/tags',
			name: 'Tags',
			auth: USER_LEVEL.redactor.id,
		},
		translations: {
			path: ROUTE_PATH_ROOT + '/translations',
			name: 'Translations',
			auth: USER_LEVEL.chief_redactor.id,
		},
		categories: {
			path: ROUTE_PATH_ROOT + '/categories',
			name: 'Categories',
			auth: USER_LEVEL.redactor.id,
		},
		pages: {
			path: ROUTE_PATH_ROOT + '/pages',
			name: 'Pages',
			auth: USER_LEVEL.chief_redactor.id,
		},
		uploads: {
			path: ROUTE_PATH_ROOT + '/uploads',
			name: 'Uploads',
			auth: USER_LEVEL.redactor.id,
		},
		menu: {
			path: ROUTE_PATH_ROOT + '/menu',
			name: 'Menu',
			auth: USER_LEVEL.chief_redactor.id,
		},
	},
	crm: {},
	market: {},
};
export const NAV_ITEMS = {
	app: [
		{
			name: ROUTES.app.dashboard.name,
			path: ROUTES.app.dashboard.path,
			active: true,
			auth: USER_LEVEL.redactor.id,
		},
		{
			name: ROUTES.app.users.name,
			path: ROUTES.app.users.path,
			active: true,
			auth: USER_LEVEL.admin.id,
		},
		{
			name: ROUTES.app.posts.name,
			path: ROUTES.app.posts.path,
			active: true,
			auth: USER_LEVEL.redactor.id,
		},
		{
			name: ROUTES.app.tags.name,
			path: ROUTES.app.tags.path,
			active: true,
			auth: USER_LEVEL.redactor.id,
		},
		{
			name: ROUTES.app.categories.name,
			path: ROUTES.app.categories.path,
			active: true,
			auth: USER_LEVEL.redactor.id,
		},
		{
			name: ROUTES.app.translations.name,
			path: ROUTES.app.translations.path,
			active: true,
			auth: USER_LEVEL.chief_redactor.id,
		},
		{
			name: ROUTES.app.pages.name,
			path: ROUTES.app.pages.path,
			active: true,
			auth: USER_LEVEL.chief_redactor.id,
		},
		{
			name: ROUTES.app.uploads.name,
			path: ROUTES.app.uploads.path,
			active: true,
			auth: USER_LEVEL.redactor.id,
		},
		{
			name: ROUTES.app.menu.name,
			path: ROUTES.app.menu.path,
			active: true,
			auth: USER_LEVEL.chief_redactor.id,
		},
	],
	crm: [],
	market: [],
};
