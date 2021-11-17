import { APP_MODEL_TYPES } from '../constants.ts';

import { routeItemProps } from './pages';

export type appModelProps = typeof APP_MODEL_TYPES[number];

export interface moduleObjectProps {
	model: appModelProps;
	route: routeItemProps;
	detail: {};
	table: {};
}

export interface commonItemProps {
	id: number | string;
	name: string;
	active: boolean;
}

export interface formDetailObjectProps {
	model: appModelProps;
	id: string;
	route: routeItemProps;
	detailOptions?: {};
}

export interface CategoriesItemProps extends commonItemProps {}

export interface MenuItemProps extends commonItemProps {}

export interface MenuItemItemProps extends commonItemProps {}

export interface PagesItemProps extends commonItemProps {}

export interface PostsItemProps extends commonItemProps {}

export interface TagsItemProps extends commonItemProps {}

export interface TranslationsItemProps extends commonItemProps {}

export interface UploadsItemProps extends commonItemProps {}

export interface UsersItemProps extends commonItemProps {}
