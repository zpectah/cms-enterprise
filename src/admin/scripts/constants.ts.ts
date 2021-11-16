export const APP_MODULE_TYPES = ['app', 'crm', 'market'] as const;
export const APP_MODEL_TYPES = [
	'Categories',
	'Menu',
	'MenuItems',
	'Pages',
	'Posts',
	'Tags',
	'Translations',
	'Uploads',
	'Users',
] as const;
export const APP_PAGE_TYPES = [
	'Dashboard',
	'Settings',
	'Profile',
	'Help',
	'Error404',
	'Login',
	'LostPassword',
	...APP_MODEL_TYPES,
] as const;
