import { selectedArrayProps } from './table';

interface commonItemProps {
	id: number | string;
	type: string;
	active: boolean;
}

export interface RequestsItemProps {
	id: number | string;
	type: string;
	status: number;
}

export interface CategoriesItemLangProps {
	id?: number | string;
	title: string;
	description?: string;
}
export interface CategoriesItemProps extends commonItemProps {
	name: string;
	parent?: string;
	img_main?: string;
	img_thumbnail?: string;
	lang: {
		[k: string]: CategoriesItemLangProps;
	};
}

export interface MenuItemLangProps {
	id?: number | string;
	label: string;
}
export interface MenuItemProps extends commonItemProps {
	name: string;
	lang: {
		[k: string]: MenuItemLangProps;
	};
}

export interface MenuItemItemLangProps {
	id?: number | string;
	label: string;
}
export interface MenuItemItemProps extends commonItemProps {
	name: string;
	page?: string;
	path_url?: string;
	menu: number;
	parent?: string;
	item_order: number;
	lang: {
		[k: string]: MenuItemItemLangProps;
	};
}

export interface PagesItemLangProps {
	id?: number | string;
	title: string;
	description?: string;
	content: string;
}
export interface PagesItemProps extends commonItemProps {
	name: string;
	type_id?: string;
	meta_robots: string;
	page_elements?: [];
	lang: {
		[k: string]: PagesItemLangProps;
	};
}

export interface PostsItemLangProps {
	id?: number | string;
	title: string;
	description?: string;
	content?: string;
}
export interface PostsItemProps extends commonItemProps {
	name: string;
	categories?: string[];
	tags?: string[];
	event_start?: string;
	event_end?: string;
	event_location?: string;
	event_address?: string;
	event_country?: string;
	event_city?: string;
	event_zip?: string;
	media?: selectedArrayProps;
	attachments?: selectedArrayProps;
	img_main?: string;
	img_thumbnail?: string;
	published: string;
	links: selectedArrayProps;
	author: number;
	approved: boolean;
	rating: number;
	template: boolean;
	lang: {
		[k: string]: PostsItemLangProps;
	};
}

export interface TagsItemProps extends commonItemProps {
	name: string;
}

export interface TranslationsItemLangProps {
	id?: number | string;
	value: string;
}
export interface TranslationsItemProps extends commonItemProps {
	name: string;
	lang: {
		[k: string]: TranslationsItemLangProps;
	};
}

export interface UploadsItemLangProps {
	id?: number | string;
	label: string;
}
export interface UploadsItemProps extends commonItemProps {
	name: string;
	fileBase64?: Blob;
	fileBase64_cropped?: Blob;
	file_extension: string;
	file_name: string;
	file_mime: string;
	file_size: number | string;
	lang: {
		[k: string]: UploadsItemLangProps;
	};
	valid?: boolean;
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
	description?: string;
}

export interface MembersItemProps extends commonItemProps {
	email: string;
	password?: string;
	phone?: string;
	nick_name: string;
	first_name?: string;
	middle_name?: string;
	last_name: string;
	position?: string;
	country?: string;
	city?: string;
	address?: string;
	zip?: string;
	phone_alt?: selectedArrayProps;
	email_alt?: selectedArrayProps;
	description?: string;
	subscription?: boolean;
}

export interface DeliveriesItemLangProps {
	id?: number | string;
	title: string;
	description?: string;
}
export interface DeliveriesItemProps extends commonItemProps {
	name: string;
	item_price: number;
	item_limit_weight: number;
	item_limit_units: number;
	store_id: number;
	lang: {
		[k: string]: DeliveriesItemLangProps;
	};
}

export interface DistributorsItemProps extends commonItemProps {
	name: string;
	img_thumbnail?: string;
}

export interface OrdersItemProps {
	id: number | string;
	type: string;
	name: string;
	email: string;
	phone?: string;
	customer_name: string;
	country?: string;
	city?: string;
	address?: string;
	zip?: string;
	delivery: string;
	payment: string;
	description: string;
	company_name: string;
	company_id: string;
	delivery_country: string;
	delivery_city: string;
	delivery_address: string;
	delivery_zip: string;
	items: string[];
	price_total: number;
	status: number;
}

export interface PaymentsItemLangProps {
	id?: number | string;
	title: string;
	description?: string;
}
export interface PaymentsItemProps extends commonItemProps {
	name: string;
	item_price: number;
	item_limit_weight: number;
	item_limit_units: number;
	lang: {
		[k: string]: PaymentsItemLangProps;
	};
}

export interface ProducersItemProps extends commonItemProps {
	name: string;
	img_thumbnail?: string;
}

export interface ProductsItemLangProps {
	id?: number | string;
	title: string;
	description?: string;
	content?: string;
}
export interface ProductsItemProps extends commonItemProps {
	name: string;
	categories?: string[];
	tags?: string[];
	item_price: number;
	item_discount: number;
	item_weight: number;
	item_depth: number;
	item_height: number;
	item_width: number;
	related: selectedArrayProps;
	gallery: selectedArrayProps;
	attachments: selectedArrayProps;
	img_main?: string;
	img_thumbnail?: string;
	producers?: selectedArrayProps;
	distributors?: selectedArrayProps;
	options?: selectedArrayProps;
	rating: number;
	manager: number;
	template: boolean;
	is_new: boolean;
	is_used: boolean;
	is_unboxed: boolean;
	in_stock: boolean;
	lang: {
		[k: string]: ProductsItemLangProps;
	};
}

export interface ProductsOptionsItemProps extends commonItemProps {
	name: string;
	value: string;
}

export interface StoresItemLangProps {
	id?: number | string;
	title: string;
	description?: string;
}
export interface StoresItemProps extends commonItemProps {
	name: string;
	country?: string;
	city?: string;
	address?: string;
	zip?: string;
	location?: string;
	phone?: selectedArrayProps;
	email?: selectedArrayProps;
	attachments?: selectedArrayProps;
	img_main?: string;
	img_thumbnail?: string;
	lang: {
		[k: string]: StoresItemLangProps;
	};
}

export interface CmsRequestsItemProps {
	id: number;
	type: string;
	context: string;
	value: string;
	token: string;
	status: number;
}

export interface CommentsItemProps {
	id?: number | string;
	email?: string;
	title: string;
	content: string;
	assigned?: string;
	assigned_id?: number;
	parent?: number | string;
	status?: number;
	created?: string;
	mode?: 'new' | 'edit' | 'reply';
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
