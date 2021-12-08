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
	country?: string;
	city?: string;
	address?: string;
	zip?: string;
	phone_alt?: selectedArrayProps;
	email_alt?: selectedArrayProps;
	description?: string;
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

export interface CmsRequestsItemProps {
	id: number;
	type: string;
	context: string;
	value: string;
	token: string;
	status: number;
}
