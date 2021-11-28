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
	'Settings',
	'Profile',
	'Login',
	'LostPassword',
	'NewPassword',
	'Requests',
	// TODO
	'Members',
	'Deliveries',
	'Distributors',
	'Orders',
	'Payments',
	'Producers',
	'Products',
	'ProductsOptions',
	'Stores',
] as const;
export const APP_PAGE_TYPES = [
	'Dashboard',
	'Help',
	'Error404',
	'CrmDashboard',
	'MarketDashboard',
	...APP_MODEL_TYPES,
] as const;
