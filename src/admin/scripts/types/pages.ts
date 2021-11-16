import { APP_MODULE_TYPES, APP_PAGE_TYPES } from '../constants.ts';

export type appModuleTypesProps = typeof APP_MODULE_TYPES[number];
export type pagesTypesProps = typeof APP_PAGE_TYPES[number];

export interface routeItemProps {
	path: string;
	name: string;
	auth: number;
}

export interface pageObjectProps {
	app: appModuleTypesProps;
	name: pagesTypesProps;
	route: routeItemProps;
}

export interface navItemProps {
	name: string;
	path: string;
	active: boolean;
	auth: number;
}
