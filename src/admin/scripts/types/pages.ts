export interface routeItemProps {
	path: string;
	name: string;
	auth: number;
}

export interface pageObjectProps {
	app: 'app' | 'crm' | 'market';
	name: string;
	route: routeItemProps;
}

export interface navItemProps {
	name: string;
	path: string;
	active: boolean;
	auth: number;
}
