interface commonItemProps {
	id: number | string;
	type: string;
	active: boolean; // Overrides default DB type
}

export interface RequestsItemProps {
	id: number | string;
	type: string;
	status: number;
}

export interface CategoriesItemProps extends commonItemProps {
	name: string;
}

export interface MenuItemProps extends commonItemProps {
	name: string;
}

export interface MenuItemItemProps extends commonItemProps {
	name: string;
}

export interface PagesItemProps extends commonItemProps {
	name: string;
}

export interface PostsItemProps extends commonItemProps {
	name: string;
}

export interface TagsItemProps extends commonItemProps {
	name: string;
}

export interface TranslationsItemProps extends commonItemProps {
	name: string;
}

export interface UploadsItemProps extends commonItemProps {
	name: string;
}

export interface UsersItemProps extends commonItemProps {
	email: string;
	password?: string;
	nick_name: string;
	first_name?: string;
	middle_name?: string;
	last_name: string;
	user_group: string;
	img_avatar?: string;
	user_level: number;
}

export interface MembersItemProps extends commonItemProps {
	name: string;
}

export interface DeliveriesItemProps extends commonItemProps {
	name: string;
}

export interface DistributorsItemProps extends commonItemProps {
	name: string;
}

export interface OrdersItemProps extends commonItemProps {
	name: string;
}

export interface PaymentsItemProps extends commonItemProps {
	name: string;
}

export interface ProducersItemProps extends commonItemProps {
	name: string;
}

export interface ProductsItemProps extends commonItemProps {
	name: string;
}

export interface ProductsOptionsItemProps extends commonItemProps {
	name: string;
}

export interface StoresItemProps extends commonItemProps {
	name: string;
}

export type oneOfModelItemProps =
	| CategoriesItemProps
	| MenuItemProps
	| PagesItemProps
	| PostsItemProps
	| TagsItemProps
	| TranslationsItemProps
	| UploadsItemProps
	| UsersItemProps
	| MembersItemProps
	| DeliveriesItemProps
	| DistributorsItemProps
	| OrdersItemProps
	| PaymentsItemProps
	| ProducersItemProps
	| ProductsItemProps
	| StoresItemProps;
