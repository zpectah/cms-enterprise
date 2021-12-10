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

export function useCmsRequests() {
	const { data, error } = useSWR(
		`${config.project.api.base}/get_cms_requests`,
		get,
	);

	return {
		CmsRequests: data?.data as CmsRequestsItemProps[],
		cmsRequests_loading: !data && !error,
		cmsRequests_error: error,
		reloadCmsRequests: () =>
			mutate(`${config.project.api.base}/get_cms_requests`),
		createCmsRequests: (data: CmsRequestsItemProps) =>
			post(`${config.project.api.base}/create_cms_requests`, data),
		updateCmsRequests: (data: CmsRequestsItemProps) =>
			post(`${config.project.api.base}/update_cms_requests`, data),
		toggleCmsRequests: (data: (number | string)[]) =>
			post(`${config.project.api.base}/toggle_cms_requests`, data),
		deleteCmsRequests: (data: (number | string)[]) =>
			post(`${config.project.api.base}/delete_cms_requests`, data),
	};
}

export function usePosts() {
	const { data, error } = useSWR(`${config.project.api.base}/get_posts`, get);

	return {
		Posts: data?.data as PostsItemProps[],
		posts_loading: !data && !error,
		posts_error: error,
		reloadPosts: () => mutate(`${config.project.api.base}/get_posts`),
		createPosts: (data: PostsItemProps) =>
			post(`${config.project.api.base}/create_posts`, data),
		updatePosts: (data: PostsItemProps) =>
			post(`${config.project.api.base}/update_posts`, data),
		togglePosts: (data: (number | string)[]) =>
			post(`${config.project.api.base}/toggle_posts`, data),
		deletePosts: (data: (number | string)[]) =>
			post(`${config.project.api.base}/delete_posts`, data),
	};
}

export function useCategories() {
	const { data, error } = useSWR(
		`${config.project.api.base}/get_categories`,
		get,
	);

	return {
		Categories: data?.data as CategoriesItemProps[],
		categories_loading: !data && !error,
		categories_error: error,
		reloadCategories: () => mutate(`${config.project.api.base}/get_categories`),
		createCategories: (data: CategoriesItemProps) =>
			post(`${config.project.api.base}/create_categories`, data),
		updateCategories: (data: CategoriesItemProps) =>
			post(`${config.project.api.base}/update_categories`, data),
		toggleCategories: (data: (number | string)[]) =>
			post(`${config.project.api.base}/toggle_categories`, data),
		deleteCategories: (data: (number | string)[]) =>
			post(`${config.project.api.base}/delete_categories`, data),
	};
}

export function useMenu() {
	const { data, error } = useSWR(`${config.project.api.base}/get_menu`, get);

	return {
		Menu: data?.data as MenuItemProps[],
		menu_loading: !data && !error,
		menu_error: error,
		reloadMenu: () => mutate(`${config.project.api.base}/get_menu`),
		createMenu: (data: MenuItemProps) =>
			post(`${config.project.api.base}/create_menu`, data),
		updateMenu: (data: MenuItemProps) =>
			post(`${config.project.api.base}/update_menu`, data),
		toggleMenu: (data: (number | string)[]) =>
			post(`${config.project.api.base}/toggle_menu`, data),
		deleteMenu: (data: (number | string)[]) =>
			post(`${config.project.api.base}/delete_menu`, data),
	};
}

export function useMenuItems() {
	const { data, error } = useSWR(
		`${config.project.api.base}/get_menu_items`,
		get,
	);

	return {
		MenuItems: data?.data as MenuItemItemProps[],
		menuItems_loading: !data && !error,
		menuItems_error: error,
		reloadMenuItems: () => mutate(`${config.project.api.base}/get_menu_items`),
		createMenuItems: (data: MenuItemItemProps) =>
			post(`${config.project.api.base}/create_menu_items`, data),
		updateMenuItems: (data: MenuItemItemProps) =>
			post(`${config.project.api.base}/update_menu_items`, data),
		toggleMenuItems: (data: (number | string)[]) =>
			post(`${config.project.api.base}/toggle_menu_items`, data),
		deleteMenuItems: (data: (number | string)[]) =>
			post(`${config.project.api.base}/delete_menu_items`, data),
	};
}

export function usePages() {
	const { data, error } = useSWR(`${config.project.api.base}/get_pages`, get);

	return {
		Pages: data?.data as PagesItemProps[],
		pages_loading: !data && !error,
		pages_error: error,
		reloadPages: () => mutate(`${config.project.api.base}/get_pages`),
		createPages: (data: PagesItemProps) =>
			post(`${config.project.api.base}/create_pages`, data),
		updatePages: (data: PagesItemProps) =>
			post(`${config.project.api.base}/update_pages`, data),
		togglePages: (data: (number | string)[]) =>
			post(`${config.project.api.base}/toggle_pages`, data),
		deletePages: (data: (number | string)[]) =>
			post(`${config.project.api.base}/delete_pages`, data),
	};
}

export function useTags() {
	const { data, error } = useSWR(`${config.project.api.base}/get_tags`, get);

	return {
		Tags: data?.data as TagsItemProps[],
		tags_loading: !data && !error,
		tags_error: error,
		reloadTags: () => mutate(`${config.project.api.base}/get_tags`),
		createTags: (data: TagsItemProps) =>
			post(`${config.project.api.base}/create_tags`, data),
		updateTags: (data: TagsItemProps) =>
			post(`${config.project.api.base}/update_tags`, data),
		toggleTags: (data: (number | string)[]) =>
			post(`${config.project.api.base}/toggle_tags`, data),
		deleteTags: (data: (number | string)[]) =>
			post(`${config.project.api.base}/delete_tags`, data),
	};
}

export function useTranslations() {
	const { data, error } = useSWR(
		`${config.project.api.base}/get_translations`,
		get,
	);

	return {
		Translations: data?.data as TranslationsItemProps[],
		translations_loading: !data && !error,
		translations_error: error,
		reloadTranslations: () =>
			mutate(`${config.project.api.base}/get_translations`),
		createTranslations: (data: TranslationsItemProps) =>
			post(`${config.project.api.base}/create_translations`, data),
		updateTranslations: (data: TranslationsItemProps) =>
			post(`${config.project.api.base}/update_translations`, data),
		toggleTranslations: (data: (number | string)[]) =>
			post(`${config.project.api.base}/toggle_translations`, data),
		deleteTranslations: (data: (number | string)[]) =>
			post(`${config.project.api.base}/delete_translations`, data),
	};
}

export function useUploads() {
	const { data, error } = useSWR(`${config.project.api.base}/get_uploads`, get);

	return {
		Uploads: data?.data as UploadsItemProps[],
		uploads_loading: !data && !error,
		uploads_error: error,
		reloadUploads: () => mutate(`${config.project.api.base}/get_uploads`),
		createUploads: (data: UploadsItemProps) =>
			post(`${config.project.api.base}/create_uploads`, data),
		updateUploads: (data: UploadsItemProps) =>
			post(`${config.project.api.base}/update_uploads`, data),
		toggleUploads: (data: (number | string)[]) =>
			post(`${config.project.api.base}/toggle_uploads`, data),
		deleteUploads: (data: (number | string)[]) =>
			post(`${config.project.api.base}/delete_uploads`, data),
	};
}

export function useUsers() {
	const { data, error } = useSWR(`${config.project.api.base}/get_users`, get);

	return {
		Users: data?.data as UsersItemProps[],
		users_loading: !data && !error,
		users_error: error,
		reloadUsers: () => mutate(`${config.project.api.base}/get_users`),
		createUsers: (data: UsersItemProps) =>
			post(`${config.project.api.base}/create_users`, data),
		updateUsers: (data: UsersItemProps) =>
			post(`${config.project.api.base}/update_users`, data),
		toggleUsers: (data: (number | string)[]) =>
			post(`${config.project.api.base}/toggle_users`, data),
		deleteUsers: (data: (number | string)[]) =>
			post(`${config.project.api.base}/delete_users`, data),
	};
}

export function useMembers() {
	const { data, error } = useSWR(`${config.project.api.base}/get_members`, get);

	return {
		Members: data?.data as MembersItemProps[],
		members_loading: !data && !error,
		members_error: error,
		reloadMembers: () => mutate(`${config.project.api.base}/get_members`),
		createMembers: (data: MembersItemProps) =>
			post(`${config.project.api.base}/create_members`, data),
		updateMembers: (data: MembersItemProps) =>
			post(`${config.project.api.base}/update_members`, data),
		toggleMembers: (data: (number | string)[]) =>
			post(`${config.project.api.base}/toggle_members`, data),
		deleteMembers: (data: (number | string)[]) =>
			post(`${config.project.api.base}/delete_members`, data),
	};
}

export function useProducts() {
	const { data, error } = useSWR(
		`${config.project.api.base}/get_products`,
		get,
	);

	return {
		Products: data?.data as ProductsItemProps[],
		products_loading: !data && !error,
		products_error: error,
		reloadProducts: () => mutate(`${config.project.api.base}/get_products`),
		createProducts: (data: ProductsItemProps) =>
			post(`${config.project.api.base}/create_products`, data),
		updateProducts: (data: ProductsItemProps) =>
			post(`${config.project.api.base}/update_products`, data),
		toggleProducts: (data: (number | string)[]) =>
			post(`${config.project.api.base}/toggle_products`, data),
		deleteProducts: (data: (number | string)[]) =>
			post(`${config.project.api.base}/delete_products`, data),
	};
}

export function useProductsOptions() {
	const { data, error } = useSWR(
		`${config.project.api.base}/get_productsOptions`,
		get,
	);

	return {
		ProductsOptions: data?.data as ProductsOptionsItemProps[],
		productsOptions_loading: !data && !error,
		productsOptions_error: error,
		reloadProductsOptions: () =>
			mutate(`${config.project.api.base}/get_productsOptions`),
		createProductsOptions: (data: ProductsOptionsItemProps) =>
			post(`${config.project.api.base}/create_productsOptions`, data),
		updateProductsOptions: (data: ProductsOptionsItemProps) =>
			post(`${config.project.api.base}/update_productsOptions`, data),
		toggleProductsOptions: (data: (number | string)[]) =>
			post(`${config.project.api.base}/toggle_productsOptions`, data),
		deleteProductsOptions: (data: (number | string)[]) =>
			post(`${config.project.api.base}/delete_productsOptions`, data),
	};
}

export function useStores() {
	const { data, error } = useSWR(`${config.project.api.base}/get_stores`, get);

	return {
		Stores: data?.data as StoresItemProps[],
		stores_loading: !data && !error,
		stores_error: error,
		reloadStores: () => mutate(`${config.project.api.base}/get_stores`),
		createStores: (data: StoresItemProps) =>
			post(`${config.project.api.base}/create_stores`, data),
		updateStores: (data: StoresItemProps) =>
			post(`${config.project.api.base}/update_stores`, data),
		toggleStores: (data: (number | string)[]) =>
			post(`${config.project.api.base}/toggle_stores`, data),
		deleteStores: (data: (number | string)[]) =>
			post(`${config.project.api.base}/delete_stores`, data),
	};
}

export function useProducers() {
	const { data, error } = useSWR(
		`${config.project.api.base}/get_producers`,
		get,
	);

	return {
		Producers: data?.data as ProducersItemProps[],
		producers_loading: !data && !error,
		producers_error: error,
		reloadProducers: () => mutate(`${config.project.api.base}/get_producers`),
		createProducers: (data: ProducersItemProps) =>
			post(`${config.project.api.base}/create_producers`, data),
		updateProducers: (data: ProducersItemProps) =>
			post(`${config.project.api.base}/update_producers`, data),
		toggleProducers: (data: (number | string)[]) =>
			post(`${config.project.api.base}/toggle_producers`, data),
		deleteProducers: (data: (number | string)[]) =>
			post(`${config.project.api.base}/delete_producers`, data),
	};
}

export function usePayments() {
	const { data, error } = useSWR(
		`${config.project.api.base}/get_payments`,
		get,
	);

	return {
		Payments: data?.data as PaymentsItemProps[],
		payments_loading: !data && !error,
		payments_error: error,
		reloadPayments: () => mutate(`${config.project.api.base}/get_payments`),
		createPayments: (data: PaymentsItemProps) =>
			post(`${config.project.api.base}/create_payments`, data),
		updatePayments: (data: PaymentsItemProps) =>
			post(`${config.project.api.base}/update_payments`, data),
		togglePayments: (data: (number | string)[]) =>
			post(`${config.project.api.base}/toggle_payments`, data),
		deletePayments: (data: (number | string)[]) =>
			post(`${config.project.api.base}/delete_payments`, data),
	};
}

export function useDistributors() {
	const { data, error } = useSWR(
		`${config.project.api.base}/get_distributors`,
		get,
	);

	return {
		Distributors: data?.data as DistributorsItemProps[],
		distributors_loading: !data && !error,
		distributors_error: error,
		reloadDistributors: () =>
			mutate(`${config.project.api.base}/get_distributors`),
		createDistributors: (data: DistributorsItemProps) =>
			post(`${config.project.api.base}/create_distributors`, data),
		updateDistributors: (data: DistributorsItemProps) =>
			post(`${config.project.api.base}/update_distributors`, data),
		toggleDistributors: (data: (number | string)[]) =>
			post(`${config.project.api.base}/toggle_distributors`, data),
		deleteDistributors: (data: (number | string)[]) =>
			post(`${config.project.api.base}/delete_distributors`, data),
	};
}

export function useDeliveries() {
	const { data, error } = useSWR(
		`${config.project.api.base}/get_deliveries`,
		get,
	);

	return {
		Deliveries: data?.data as DeliveriesItemProps[],
		deliveries_loading: !data && !error,
		deliveries_error: error,
		reloadDeliveries: () => mutate(`${config.project.api.base}/get_deliveries`),
		createDeliveries: (data: DeliveriesItemProps) =>
			post(`${config.project.api.base}/create_deliveries`, data),
		updateDeliveries: (data: DeliveriesItemProps) =>
			post(`${config.project.api.base}/update_deliveries`, data),
		toggleDeliveries: (data: (number | string)[]) =>
			post(`${config.project.api.base}/toggle_deliveries`, data),
		deleteDeliveries: (data: (number | string)[]) =>
			post(`${config.project.api.base}/delete_deliveries`, data),
	};
}

export function useOrders() {
	const { data, error } = useSWR(`${config.project.api.base}/get_orders`, get);

	return {
		Orders: data?.data as OrdersItemProps[],
		orders_loading: !data && !error,
		orders_error: error,
		reloadOrders: () => mutate(`${config.project.api.base}/get_orders`),
		createOrders: (data: OrdersItemProps) =>
			post(`${config.project.api.base}/create_orders`, data),
		updateOrders: (data: OrdersItemProps) =>
			post(`${config.project.api.base}/update_orders`, data),
		toggleOrders: (data: (number | string)[]) =>
			post(`${config.project.api.base}/toggle_orders`, data),
		confirmOrders: (data: (number | string)[]) =>
			post(`${config.project.api.base}/confirm_orders`, data),
		cancelOrders: (data: (number | string)[]) =>
			post(`${config.project.api.base}/cancel_orders`, data),
		deleteOrders: (data: (number | string)[]) =>
			post(`${config.project.api.base}/delete_orders`, data),
	};
}
