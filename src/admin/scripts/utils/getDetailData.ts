import { appModelProps } from '../types/app';
import {
	PostsItemProps,
	CategoriesItemProps,
	MenuItemProps,
	PagesItemProps,
	TagsItemProps,
	TranslationsItemProps,
	UploadsItemProps,
	UsersItemProps,
	MembersItemProps,
	DeliveriesItemProps,
	OrdersItemProps,
	PaymentsItemProps,
	ProducersItemProps,
	ProductsItemProps,
	StoresItemProps,
	DistributorsItemProps,
} from '../types/model';

export const blankDataItem = {
	Categories: {
		id: 'new',
		name: '',
		active: true,
	} as CategoriesItemProps,
	Menu: {
		id: 'new',
		name: '',
		active: true,
	} as MenuItemProps,
	Posts: {
		id: 'new',
		name: '',
		active: true,
	} as PostsItemProps,
	Pages: {
		id: 'new',
		name: '',
		active: true,
	} as PagesItemProps,
	Tags: {
		id: 'new',
		name: '',
		active: true,
	} as TagsItemProps,
	Translations: {
		id: 'new',
		name: '',
		active: true,
	} as TranslationsItemProps,
	Uploads: {
		id: 'new',
		name: '',
		active: true,
	} as UploadsItemProps,
	Users: {
		id: 'new',
		type: 'default',
		email: '',
		password: '',
		password_confirm: '',
		nick_name: '',
		first_name: '',
		middle_name: '',
		last_name: '',
		user_level: 2,
		user_group: '',
		img_avatar: '',
		active: true,
	} as UsersItemProps,

	Members: {
		id: 'new',
		name: '',
		active: true,
	} as MembersItemProps,
	Deliveries: {
		id: 'new',
		name: '',
		active: true,
	} as DeliveriesItemProps,
	Distributors: {
		id: 'new',
		name: '',
		active: true,
	} as DistributorsItemProps,
	Orders: {
		id: 'new',
		name: '',
		active: true,
	} as OrdersItemProps,
	Payments: {
		id: 'new',
		name: '',
		active: true,
	} as PaymentsItemProps,
	Producers: {
		id: 'new',
		name: '',
		active: true,
	} as ProducersItemProps,
	Products: {
		id: 'new',
		name: '',
		active: true,
	} as ProductsItemProps,
	Stores: {
		id: 'new',
		name: '',
		active: true,
	} as StoresItemProps,
};

export default (id: number | string, model: appModelProps, items: any[]) => {
	let item;

	if (id == 'new') {
		item = blankDataItem[model];
	} else {
		item = items.find((item) => item.id == id);
	}

	return item;
};
