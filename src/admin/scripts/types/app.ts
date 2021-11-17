import { APP_MODEL_TYPES } from '../constants.ts';

import { routeItemProps } from './pages';

export type appModelProps = typeof APP_MODEL_TYPES[number];

export interface moduleObjectProps {
	model: appModelProps;
	route: routeItemProps;
	detail: {};
	table: {};
}

export interface formLayoutObjectProps {
	model: appModelProps;
	id: string;
	route?: routeItemProps;
	detailOptions?: {};
}
