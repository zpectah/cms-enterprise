import useSWR, { mutate } from 'swr';

import config from '../config';
import { get, post, postRaw } from '../utils/api';
import {
	CmsRequestsItemProps,
	PostsItemProps,
	CategoriesItemProps,
	MenuItemProps,
	MenuItemItemProps,
	PagesItemProps,
	TagsItemProps,
	TranslationsItemProps,
	UploadsItemProps,
	UsersItemProps,
	MembersItemProps,
	ProductsItemProps,
	ProductsOptionsItemProps,
	StoresItemProps,
	ProducersItemProps,
	PaymentsItemProps,
	DistributorsItemProps,
	DeliveriesItemProps,
	OrdersItemProps,
} from '../types/model';

const api_path_prefix = config.project.api.base;

export function useCmsRequests() {
	const { data, error } = useSWR(`${api_path_prefix}/get_cms_requests`, get);

	return {
		CmsRequests: data?.data as CmsRequestsItemProps[],
		cmsRequests_loading: !data && !error,
		cmsRequests_error: error,
		reloadCmsRequests: () => mutate(`${api_path_prefix}/get_cms_requests`),
		createCmsRequests: (data: CmsRequestsItemProps) =>
			post(`${api_path_prefix}/create_cms_requests`, data),
		updateCmsRequests: (data: CmsRequestsItemProps) =>
			post(`${api_path_prefix}/update_cms_requests`, data),
		toggleCmsRequests: (data: (number | string)[]) =>
			post(`${api_path_prefix}/toggle_cms_requests`, data),
		deleteCmsRequests: (data: (number | string)[]) =>
			post(`${api_path_prefix}/delete_cms_requests`, data),
	};
}

export function usePosts() {
	const { data, error } = useSWR(`${api_path_prefix}/get_posts`, get);

	return {
		Posts: [
			{
				id: 1,
				type: `article`,
				name: `Post 1 name`,
				active: true,
			},
			{
				id: 2,
				type: `blog`,
				name: `Post 2 name`,
				active: false,
			},
			{
				id: 3,
				type: `article`,
				name: `Post 3 name`,
				active: true,
			},
			{
				id: 4,
				type: `reference`,
				name: `Post 4 name`,
				active: true,
			},
			{
				id: 5,
				type: `testimonial`,
				name: `Post 5 name`,
				active: true,
			},
			{
				id: 6,
				type: `article`,
				name: `Post 6 name`,
				active: true,
			},
		] as PostsItemProps[],
		posts_loading: !data && !error,
		posts_error: error,
		reloadPosts: () => mutate(`${api_path_prefix}/get_posts`),
		createPosts: (data: PostsItemProps) =>
			post(`${api_path_prefix}/create_posts`, data),
		updatePosts: (data: PostsItemProps) =>
			post(`${api_path_prefix}/update_posts`, data),
		togglePosts: (data: (number | string)[]) =>
			post(`${api_path_prefix}/toggle_posts`, data),
		deletePosts: (data: (number | string)[]) =>
			post(`${api_path_prefix}/delete_posts`, data),
	};
}

export function useCategories() {
	const { data, error } = useSWR(`${api_path_prefix}/get_categories`, get);

	return {
		Categories: [
			{
				id: 1,
				type: `default`,
				name: `Category 1 name`,
				active: true,
			},
			{
				id: 2,
				type: `default`,
				name: `Category 2 name`,
				active: false,
			},
			{
				id: 3,
				type: `default`,
				name: `Category 3 name`,
				active: true,
			},
			{
				id: 4,
				type: `default`,
				name: `Category 4 name`,
				active: true,
			},
			{
				id: 5,
				type: `default`,
				name: `Category 5 name`,
				active: true,
			},
		] as CategoriesItemProps[],
		categories_loading: !data && !error,
		categories_error: error,
		reloadCategories: () => mutate(`${api_path_prefix}/get_categories`),
		createCategories: (data: CategoriesItemProps) =>
			post(`${api_path_prefix}/create_categories`, data),
		updateCategories: (data: CategoriesItemProps) =>
			post(`${api_path_prefix}/update_categories`, data),
		toggleCategories: (data: (number | string)[]) =>
			post(`${api_path_prefix}/toggle_categories`, data),
		deleteCategories: (data: (number | string)[]) =>
			post(`${api_path_prefix}/delete_categories`, data),
	};
}

export function useMenu() {
	const { data, error } = useSWR(`${api_path_prefix}/get_menu`, get);

	return {
		Menu: [
			{
				id: 1,
				type: `primary`,
				name: `Menu 1 name`,
				active: true,
			},
			{
				id: 2,
				type: `secondary`,
				name: `Menu 2 name`,
				active: false,
			},
			{
				id: 3,
				type: `custom`,
				name: `Menu 3 name`,
				active: true,
			},
		] as MenuItemProps[],
		menu_loading: !data && !error,
		menu_error: error,
		reloadMenu: () => mutate(`/api/get_menu`),
		createMenu: (data: MenuItemProps) => post(`/api/create_menu`, data),
		updateMenu: (data: MenuItemProps) => post(`/api/update_menu`, data),
		toggleMenu: (data: (number | string)[]) => post(`/api/toggle_menu`, data),
		deleteMenu: (data: (number | string)[]) => post(`/api/delete_menu`, data),
	};
}

export function useMenuItems() {
	const { data, error } = useSWR(`${api_path_prefix}/get_menuItems`, get);

	return {
		MenuItems: [
			{
				id: 1,
				type: `default`,
				name: `MenuItem 1 name`,
				active: true,
			},
			{
				id: 2,
				type: `default`,
				name: `MenuItem 2 name`,
				active: false,
			},
			{
				id: 3,
				type: `default`,
				name: `MenuItem 3 name`,
				active: true,
			},
			{
				id: 4,
				type: `default`,
				name: `MenuItem 4 name`,
				active: true,
			},
			{
				id: 5,
				type: `default`,
				name: `MenuItem 5 name`,
				active: true,
			},
		] as MenuItemItemProps[],
		menuItems_loading: !data && !error,
		menuItems_error: error,
		reloadMenuItems: () => mutate(`${api_path_prefix}/get_menuItems`),
		createMenuItems: (data: MenuItemItemProps) =>
			post(`${api_path_prefix}/create_menuItems`, data),
		updateMenuItems: (data: MenuItemItemProps) =>
			post(`${api_path_prefix}/update_menuItems`, data),
		toggleMenuItems: (data: (number | string)[]) =>
			post(`${api_path_prefix}/toggle_menuItems`, data),
		deleteMenuItems: (data: (number | string)[]) =>
			post(`${api_path_prefix}/delete_menuItems`, data),
	};
}

export function usePages() {
	const { data, error } = useSWR(`${api_path_prefix}/get_pages`, get);

	return {
		Pages: [
			{
				id: 1,
				type: `default`,
				name: `Page 1 name`,
				active: true,
			},
			{
				id: 2,
				type: `default`,
				name: `Page 2 name`,
				active: false,
			},
			{
				id: 3,
				type: `default`,
				name: `Page 3 name`,
				active: true,
			},
			{
				id: 4,
				type: `default`,
				name: `Page 4 name`,
				active: true,
			},
			{
				id: 5,
				type: `default`,
				name: `Page 5 name`,
				active: true,
			},
		] as PagesItemProps[],
		pages_loading: !data && !error,
		pages_error: error,
		reloadPages: () => mutate(`${api_path_prefix}/get_pages`),
		createPages: (data: PagesItemProps) =>
			post(`${api_path_prefix}/create_pages`, data),
		updatePages: (data: PagesItemProps) =>
			post(`${api_path_prefix}/update_pages`, data),
		togglePages: (data: (number | string)[]) =>
			post(`${api_path_prefix}/toggle_pages`, data),
		deletePages: (data: (number | string)[]) =>
			post(`${api_path_prefix}/delete_pages`, data),
	};
}

export function useTags() {
	const { data, error } = useSWR(`${api_path_prefix}/get_tags`, get);

	return {
		Tags: data?.data as TagsItemProps[],
		tags_loading: !data && !error,
		tags_error: error,
		reloadTags: () => mutate(`${api_path_prefix}/get_tags`),
		createTags: (data: TagsItemProps) =>
			post(`${api_path_prefix}/create_tags`, data),
		updateTags: (data: TagsItemProps) =>
			post(`${api_path_prefix}/update_tags`, data),
		toggleTags: (data: (number | string)[]) =>
			post(`${api_path_prefix}/toggle_tags`, data),
		deleteTags: (data: (number | string)[]) =>
			post(`${api_path_prefix}/delete_tags`, data),
	};
}

export function useTranslations() {
	const { data, error } = useSWR(`${api_path_prefix}/get_translations`, get);

	return {
		Translations: [
			{
				id: 1,
				type: `default`,
				name: `Translation 1 name`,
				active: true,
				lang: {
					en: {
						id: 1,
						value: 'Translation EN value 1',
					},
					cs: {
						id: 1,
						value: 'Translation CS value 1',
					},
				},
			},
			{
				id: 2,
				type: `default`,
				name: `Translation 2 name`,
				active: false,
				lang: {
					en: {
						id: 2,
						value: 'Translation EN value 2',
					},
					cs: {
						id: 2,
						value: 'Translation CS value 2',
					},
				},
			},
			{
				id: 3,
				type: `default`,
				name: `Translation 3 name`,
				active: true,
				lang: {
					en: {
						id: 3,
						value: 'Translation EN value 3',
					},
					cs: {
						id: 3,
						value: 'Translation CS value 3',
					},
				},
			},
			{
				id: 4,
				type: `default`,
				name: `Translation 4 name`,
				active: true,
				lang: {
					en: {
						id: 4,
						value: 'Translation EN value 4',
					},
					cs: {
						id: 4,
						value: 'Translation CS value 4',
					},
				},
			},
			{
				id: 5,
				type: `default`,
				name: `Translation 5 name`,
				active: true,
				lang: {
					en: {
						id: 5,
						value: 'Translation EN value 5',
					},
					cs: {
						id: 5,
						value: 'Translation CS value 5',
					},
				},
			},
		] as TranslationsItemProps[],
		translations_loading: !data && !error,
		translations_error: error,
		reloadTranslations: () => mutate(`${api_path_prefix}/get_translations`),
		createTranslations: (data: TranslationsItemProps) =>
			post(`${api_path_prefix}/create_translations`, data),
		updateTranslations: (data: TranslationsItemProps) =>
			post(`${api_path_prefix}/update_translations`, data),
		toggleTranslations: (data: (number | string)[]) =>
			post(`${api_path_prefix}/toggle_translations`, data),
		deleteTranslations: (data: (number | string)[]) =>
			post(`${api_path_prefix}/delete_translations`, data),
	};
}

export function useUploads() {
	const { data, error } = useSWR(`${api_path_prefix}/get_uploads`, get);

	return {
		Uploads: [
			{
				id: 1,
				type: `image`,
				name: `Upload 1 name`,
				active: true,
			},
			{
				id: 2,
				type: `audio`,
				name: `Upload 2 name`,
				active: false,
			},
			{
				id: 3,
				type: `image`,
				name: `Upload 3 name`,
				active: true,
			},
			{
				id: 4,
				type: `document`,
				name: `Upload 4 name`,
				active: true,
			},
			{
				id: 5,
				type: `image`,
				name: `Upload 5 name`,
				active: true,
			},
		] as UploadsItemProps[],
		uploads_loading: !data && !error,
		uploads_error: error,
		reloadUploads: () => mutate(`${api_path_prefix}/get_uploads`),
		createUploads: (data: UploadsItemProps) =>
			post(`${api_path_prefix}/create_uploads`, data),
		updateUploads: (data: UploadsItemProps) =>
			post(`${api_path_prefix}/update_uploads`, data),
		toggleUploads: (data: (number | string)[]) =>
			post(`${api_path_prefix}/toggle_uploads`, data),
		deleteUploads: (data: (number | string)[]) =>
			post(`${api_path_prefix}/delete_uploads`, data),
	};
}

export function useUsers() {
	const { data, error } = useSWR(`${api_path_prefix}/get_users`, get);

	return {
		Users: data?.data as UsersItemProps[],
		users_loading: !data && !error,
		users_error: error,
		reloadUsers: () => mutate(`${api_path_prefix}/get_users`),
		createUsers: (data: UsersItemProps) =>
			post(`${api_path_prefix}/create_users`, data),
		updateUsers: (data: UsersItemProps) =>
			post(`${api_path_prefix}/update_users`, data),
		toggleUsers: (data: (number | string)[]) =>
			post(`${api_path_prefix}/toggle_users`, data),
		deleteUsers: (data: (number | string)[]) =>
			post(`${api_path_prefix}/delete_users`, data),
	};
}

export function useMembers() {
	const { data, error } = useSWR(`${api_path_prefix}/get_members`, get);

	return {
		Members: [
			{
				id: 1,
				type: `default`,
				name: `Member 1 name`,
				active: true,
			},
			{
				id: 2,
				type: `default`,
				name: `Post 2 name`,
				active: false,
			},
			{
				id: 3,
				type: `default`,
				name: `Post 3 name`,
				active: true,
			},
			{
				id: 4,
				type: `default`,
				name: `Post 4 name`,
				active: true,
			},
			{
				id: 5,
				type: `default`,
				name: `Post 5 name`,
				active: true,
			},
		] as MembersItemProps[],
		members_loading: !data && !error,
		members_error: error,
		reloadMembers: () => mutate(`${api_path_prefix}/get_members`),
		createMembers: (data: MembersItemProps) =>
			post(`${api_path_prefix}/create_members`, data),
		updateMembers: (data: MembersItemProps) =>
			post(`${api_path_prefix}/update_members`, data),
		toggleMembers: (data: (number | string)[]) =>
			post(`${api_path_prefix}/toggle_members`, data),
		deleteMembers: (data: (number | string)[]) =>
			post(`${api_path_prefix}/delete_members`, data),
	};
}

export function useProducts() {
	const { data, error } = useSWR(`${api_path_prefix}/get_products`, get);

	return {
		Products: [
			{
				id: 1,
				type: `default`,
				name: `Product 1 name`,
				active: true,
			},
			{
				id: 2,
				type: `default`,
				name: `Product 2 name`,
				active: false,
			},
			{
				id: 3,
				type: `default`,
				name: `Product 3 name`,
				active: true,
			},
			{
				id: 4,
				type: `default`,
				name: `Product 4 name`,
				active: true,
			},
			{
				id: 5,
				type: `default`,
				name: `Product 5 name`,
				active: true,
			},
		] as ProductsItemProps[],
		products_loading: !data && !error,
		products_error: error,
		reloadProducts: () => mutate(`${api_path_prefix}/get_products`),
		createProducts: (data: ProductsItemProps) =>
			post(`${api_path_prefix}/create_products`, data),
		updateProducts: (data: ProductsItemProps) =>
			post(`${api_path_prefix}/update_products`, data),
		toggleProducts: (data: (number | string)[]) =>
			post(`${api_path_prefix}/toggle_products`, data),
		deleteProducts: (data: (number | string)[]) =>
			post(`${api_path_prefix}/delete_products`, data),
	};
}

export function useProductsOptions() {
	const { data, error } = useSWR(`${api_path_prefix}/get_productsOptions`, get);

	return {
		ProductsOptions: [
			{
				id: 1,
				type: `default`,
				name: `ProductsOption 1 name`,
				active: true,
			},
			{
				id: 2,
				type: `default`,
				name: `ProductsOption 2 name`,
				active: false,
			},
			{
				id: 3,
				type: `default`,
				name: `ProductsOption 3 name`,
				active: true,
			},
			{
				id: 4,
				type: `default`,
				name: `ProductsOption 4 name`,
				active: true,
			},
			{
				id: 5,
				type: `default`,
				name: `ProductsOption 5 name`,
				active: true,
			},
		] as ProductsOptionsItemProps[],
		productsOptions_loading: !data && !error,
		productsOptions_error: error,
		reloadProductsOptions: () =>
			mutate(`${api_path_prefix}/get_productsOptions`),
		createProductsOptions: (data: ProductsOptionsItemProps) =>
			post(`${api_path_prefix}/create_productsOptions`, data),
		updateProductsOptions: (data: ProductsOptionsItemProps) =>
			post(`${api_path_prefix}/update_productsOptions`, data),
		toggleProductsOptions: (data: (number | string)[]) =>
			post(`${api_path_prefix}/toggle_productsOptions`, data),
		deleteProductsOptions: (data: (number | string)[]) =>
			post(`${api_path_prefix}/delete_productsOptions`, data),
	};
}

export function useStores() {
	const { data, error } = useSWR(`${api_path_prefix}/get_stores`, get);

	return {
		Stores: [
			{
				id: 1,
				type: `default`,
				name: `Store 1 name`,
				active: true,
			},
			{
				id: 2,
				type: `default`,
				name: `Store 2 name`,
				active: false,
			},
			{
				id: 3,
				type: `default`,
				name: `Store 3 name`,
				active: true,
			},
			{
				id: 4,
				type: `default`,
				name: `Store 4 name`,
				active: true,
			},
			{
				id: 5,
				type: `default`,
				name: `Store 5 name`,
				active: true,
			},
		] as StoresItemProps[],
		stores_loading: !data && !error,
		stores_error: error,
		reloadStores: () => mutate(`${api_path_prefix}/get_stores`),
		createStores: (data: StoresItemProps) =>
			post(`${api_path_prefix}/create_stores`, data),
		updateStores: (data: StoresItemProps) =>
			post(`${api_path_prefix}/update_stores`, data),
		toggleStores: (data: (number | string)[]) =>
			post(`${api_path_prefix}/toggle_stores`, data),
		deleteStores: (data: (number | string)[]) =>
			post(`${api_path_prefix}/delete_stores`, data),
	};
}

export function useProducers() {
	const { data, error } = useSWR(`${api_path_prefix}/get_producers`, get);

	return {
		Producers: [
			{
				id: 1,
				type: `default`,
				name: `Producer 1 name`,
				active: true,
			},
			{
				id: 2,
				type: `default`,
				name: `Producer 2 name`,
				active: false,
			},
			{
				id: 3,
				type: `default`,
				name: `Producer 3 name`,
				active: true,
			},
			{
				id: 4,
				type: `default`,
				name: `Producer 4 name`,
				active: true,
			},
			{
				id: 5,
				type: `default`,
				name: `Producer 5 name`,
				active: true,
			},
		] as ProducersItemProps[],
		producers_loading: !data && !error,
		producers_error: error,
		reloadProducers: () => mutate(`${api_path_prefix}/get_producers`),
		createProducers: (data: ProducersItemProps) =>
			post(`${api_path_prefix}/create_producers`, data),
		updateProducers: (data: ProducersItemProps) =>
			post(`${api_path_prefix}/update_producers`, data),
		toggleProducers: (data: (number | string)[]) =>
			post(`${api_path_prefix}/toggle_producers`, data),
		deleteProducers: (data: (number | string)[]) =>
			post(`${api_path_prefix}/delete_producers`, data),
	};
}

export function usePayments() {
	const { data, error } = useSWR(`${api_path_prefix}/get_payments`, get);

	return {
		Payments: [
			{
				id: 1,
				type: `default`,
				name: `Payment 1 name`,
				active: true,
			},
			{
				id: 2,
				type: `default`,
				name: `Payment 2 name`,
				active: false,
			},
			{
				id: 3,
				type: `default`,
				name: `Payment 3 name`,
				active: true,
			},
			{
				id: 4,
				type: `default`,
				name: `Payment 4 name`,
				active: false,
			},
			{
				id: 5,
				type: `default`,
				name: `Payment 5 name`,
				active: true,
			},
		] as PaymentsItemProps[],
		payments_loading: !data && !error,
		payments_error: error,
		reloadPayments: () => mutate(`${api_path_prefix}/get_payments`),
		createPayments: (data: PaymentsItemProps) =>
			post(`${api_path_prefix}/create_payments`, data),
		updatePayments: (data: PaymentsItemProps) =>
			post(`${api_path_prefix}/update_payments`, data),
		togglePayments: (data: (number | string)[]) =>
			post(`${api_path_prefix}/toggle_payments`, data),
		deletePayments: (data: (number | string)[]) =>
			post(`${api_path_prefix}/delete_payments`, data),
	};
}

export function useDistributors() {
	const { data, error } = useSWR(`${api_path_prefix}/get_distributors`, get);

	return {
		Distributors: [
			{
				id: 1,
				type: `default`,
				name: `Distributor 1 name`,
				active: true,
			},
			{
				id: 2,
				type: `default`,
				name: `Distributor 2 name`,
				active: false,
			},
			{
				id: 3,
				type: `default`,
				name: `Distributor 3 name`,
				active: true,
			},
			{
				id: 4,
				type: `default`,
				name: `Distributor 4 name`,
				active: true,
			},
			{
				id: 5,
				type: `default`,
				name: `Distributor 5 name`,
				active: true,
			},
		] as DistributorsItemProps[],
		distributors_loading: !data && !error,
		distributors_error: error,
		reloadDistributors: () => mutate(`${api_path_prefix}/get_distributors`),
		createDistributors: (data: DistributorsItemProps) =>
			post(`${api_path_prefix}/create_distributors`, data),
		updateDistributors: (data: DistributorsItemProps) =>
			post(`${api_path_prefix}/update_distributors`, data),
		toggleDistributors: (data: (number | string)[]) =>
			post(`${api_path_prefix}/toggle_distributors`, data),
		deleteDistributors: (data: (number | string)[]) =>
			post(`${api_path_prefix}/delete_distributors`, data),
	};
}

export function useDeliveries() {
	const { data, error } = useSWR(`${api_path_prefix}/get_deliveries`, get);

	return {
		Deliveries: [
			{
				id: 1,
				type: `default`,
				name: `Delivery 1 name`,
				active: true,
			},
			{
				id: 2,
				type: `default`,
				name: `Delivery 2 name`,
				active: false,
			},
			{
				id: 3,
				type: `default`,
				name: `Delivery 3 name`,
				active: true,
			},
			{
				id: 4,
				type: `default`,
				name: `Delivery 4 name`,
				active: true,
			},
			{
				id: 5,
				type: `default`,
				name: `Delivery 5 name`,
				active: true,
			},
		] as DeliveriesItemProps[],
		deliveries_loading: !data && !error,
		deliveries_error: error,
		reloadDeliveries: () => mutate(`${api_path_prefix}/get_deliveries`),
		createDeliveries: (data: DeliveriesItemProps) =>
			post(`${api_path_prefix}/create_deliveries`, data),
		updateDeliveries: (data: DeliveriesItemProps) =>
			post(`${api_path_prefix}/update_deliveries`, data),
		toggleDeliveries: (data: (number | string)[]) =>
			post(`${api_path_prefix}/toggle_deliveries`, data),
		deleteDeliveries: (data: (number | string)[]) =>
			post(`${api_path_prefix}/delete_deliveries`, data),
	};
}

export function useOrders() {
	const { data, error } = useSWR(`${api_path_prefix}/get_orders`, get);

	return {
		Orders: [
			{
				id: 1,
				type: `default`,
				name: `Order 1 name`,
				active: true,
			},
			{
				id: 2,
				type: `default`,
				name: `Order 2 name`,
				active: false,
			},
			{
				id: 3,
				type: `default`,
				name: `Order 3 name`,
				active: true,
			},
			{
				id: 4,
				type: `default`,
				name: `Order 4 name`,
				active: true,
			},
			{
				id: 5,
				type: `default`,
				name: `Order 5 name`,
				active: true,
			},
		] as OrdersItemProps[],
		orders_loading: !data && !error,
		orders_error: error,
		reloadOrders: () => mutate(`${api_path_prefix}/get_orders`),
		createOrders: (data: OrdersItemProps) =>
			post(`${api_path_prefix}/create_orders`, data),
		updateOrders: (data: OrdersItemProps) =>
			post(`${api_path_prefix}/update_orders`, data),
		toggleOrders: (data: (number | string)[]) =>
			post(`${api_path_prefix}/toggle_orders`, data),
		deleteOrders: (data: (number | string)[]) =>
			post(`${api_path_prefix}/delete_orders`, data),
	};
}
