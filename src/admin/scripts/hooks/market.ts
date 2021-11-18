import useSWR, { mutate } from 'swr';

import { get, post, postRaw } from '../utils/api';
import {
	ProductsItemProps,
	ProductsOptionsItemProps,
	StoresItemProps,
	ProducersItemProps,
	PaymentsItemProps,
	DistributorsItemProps,
	DeliveriesItemProps,
	OrdersItemProps,
} from '../types/model';

export function useProducts() {
	const { data, error } = useSWR(`/api/get_products`, get);

	return {
		Products: [
			{
				id: 1,
				name: 'Product 1 name',
				active: true,
			},
			{
				id: 2,
				name: 'Product 2 name',
				active: false,
			},
			{
				id: 3,
				name: 'Product 3 name',
				active: true,
			},
			{
				id: 4,
				name: 'Product 4 name',
				active: true,
			},
			{
				id: 5,
				name: 'Product 5 name',
				active: true,
			},
		],
		products_loading: !data && !error,
		products_error: error,
		reloadProducts: () => mutate(`/api/get_products`),
		createProducts: (data: ProductsItemProps) =>
			post('/api/create_products', data),
		updateProducts: (data: ProductsItemProps) =>
			post('/api/update_products', data),
		toggleProducts: (data: (number | string)[]) =>
			post('/api/toggle_products', data),
		deleteProducts: (data: (number | string)[]) =>
			post('/api/delete_products', data),
	};
}

export function useProductsOptions() {
	const { data, error } = useSWR(`/api/get_productsOptions`, get);

	return {
		ProductsOptions: [
			{
				id: 1,
				name: 'ProductsOption 1 name',
				active: true,
			},
			{
				id: 2,
				name: 'ProductsOption 2 name',
				active: false,
			},
			{
				id: 3,
				name: 'ProductsOption 3 name',
				active: true,
			},
			{
				id: 4,
				name: 'ProductsOption 4 name',
				active: true,
			},
			{
				id: 5,
				name: 'ProductsOption 5 name',
				active: true,
			},
		],
		productsOptions_loading: !data && !error,
		productsOptions_error: error,
		reloadProductsOptions: () => mutate(`/api/get_productsOptions`),
		createProductsOptions: (data: ProductsOptionsItemProps) =>
			post('/api/create_productsOptions', data),
		updateProductsOptions: (data: ProductsOptionsItemProps) =>
			post('/api/update_productsOptions', data),
		toggleProductsOptions: (data: (number | string)[]) =>
			post('/api/toggle_productsOptions', data),
		deleteProductsOptions: (data: (number | string)[]) =>
			post('/api/delete_productsOptions', data),
	};
}

export function useStores() {
	const { data, error } = useSWR(`/api/get_stores`, get);

	return {
		Stores: [
			{
				id: 1,
				name: 'Store 1 name',
				active: true,
			},
			{
				id: 2,
				name: 'Store 2 name',
				active: false,
			},
			{
				id: 3,
				name: 'Store 3 name',
				active: true,
			},
			{
				id: 4,
				name: 'Store 4 name',
				active: true,
			},
			{
				id: 5,
				name: 'Store 5 name',
				active: true,
			},
		],
		stores_loading: !data && !error,
		stores_error: error,
		reloadStores: () => mutate(`/api/get_stores`),
		createStores: (data: StoresItemProps) => post('/api/create_stores', data),
		updateStores: (data: StoresItemProps) => post('/api/update_stores', data),
		toggleStores: (data: (number | string)[]) =>
			post('/api/toggle_stores', data),
		deleteStores: (data: (number | string)[]) =>
			post('/api/delete_stores', data),
	};
}

export function useProducers() {
	const { data, error } = useSWR(`/api/get_producers`, get);

	return {
		Producers: [
			{
				id: 1,
				name: 'Producer 1 name',
				active: true,
			},
			{
				id: 2,
				name: 'Producer 2 name',
				active: false,
			},
			{
				id: 3,
				name: 'Producer 3 name',
				active: true,
			},
			{
				id: 4,
				name: 'Producer 4 name',
				active: true,
			},
			{
				id: 5,
				name: 'Producer 5 name',
				active: true,
			},
		],
		producers_loading: !data && !error,
		producers_error: error,
		reloadProducers: () => mutate(`/api/get_producers`),
		createProducers: (data: ProducersItemProps) =>
			post('/api/create_producers', data),
		updateProducers: (data: ProducersItemProps) =>
			post('/api/update_producers', data),
		toggleProducers: (data: (number | string)[]) =>
			post('/api/toggle_producers', data),
		deleteProducers: (data: (number | string)[]) =>
			post('/api/delete_producers', data),
	};
}

export function usePayments() {
	const { data, error } = useSWR(`/api/get_payments`, get);

	return {
		Payments: [
			{
				id: 1,
				name: 'Payment 1 name',
				active: true,
			},
			{
				id: 2,
				name: 'Payment 2 name',
				active: false,
			},
			{
				id: 3,
				name: 'Payment 3 name',
				active: true,
			},
			{
				id: 4,
				name: 'Payment 4 name',
				active: true,
			},
			{
				id: 5,
				name: 'Payment 5 name',
				active: true,
			},
		],
		payments_loading: !data && !error,
		payments_error: error,
		reloadPayments: () => mutate(`/api/get_payments`),
		createPayments: (data: PaymentsItemProps) =>
			post('/api/create_payments', data),
		updatePayments: (data: PaymentsItemProps) =>
			post('/api/update_payments', data),
		togglePayments: (data: (number | string)[]) =>
			post('/api/toggle_payments', data),
		deletePayments: (data: (number | string)[]) =>
			post('/api/delete_payments', data),
	};
}

export function useDistributors() {
	const { data, error } = useSWR(`/api/get_distributors`, get);

	return {
		Distributors: [
			{
				id: 1,
				name: 'Distributor 1 name',
				active: true,
			},
			{
				id: 2,
				name: 'Distributor 2 name',
				active: false,
			},
			{
				id: 3,
				name: 'Distributor 3 name',
				active: true,
			},
			{
				id: 4,
				name: 'Distributor 4 name',
				active: true,
			},
			{
				id: 5,
				name: 'Distributor 5 name',
				active: true,
			},
		],
		distributors_loading: !data && !error,
		distributors_error: error,
		reloadDistributors: () => mutate(`/api/get_distributors`),
		createDistributors: (data: DistributorsItemProps) =>
			post('/api/create_distributors', data),
		updateDistributors: (data: DistributorsItemProps) =>
			post('/api/update_distributors', data),
		toggleDistributors: (data: (number | string)[]) =>
			post('/api/toggle_distributors', data),
		deleteDistributors: (data: (number | string)[]) =>
			post('/api/delete_distributors', data),
	};
}

export function useDeliveries() {
	const { data, error } = useSWR(`/api/get_deliveries`, get);

	return {
		Deliveries: [
			{
				id: 1,
				name: 'Delivery 1 name',
				active: true,
			},
			{
				id: 2,
				name: 'Delivery 2 name',
				active: false,
			},
			{
				id: 3,
				name: 'Delivery 3 name',
				active: true,
			},
			{
				id: 4,
				name: 'Delivery 4 name',
				active: true,
			},
			{
				id: 5,
				name: 'Delivery 5 name',
				active: true,
			},
		],
		deliveries_loading: !data && !error,
		deliveries_error: error,
		reloadDeliveries: () => mutate(`/api/get_deliveries`),
		createDeliveries: (data: DeliveriesItemProps) =>
			post('/api/create_deliveries', data),
		updateDeliveries: (data: DeliveriesItemProps) =>
			post('/api/update_deliveries', data),
		toggleDeliveries: (data: (number | string)[]) =>
			post('/api/toggle_deliveries', data),
		deleteDeliveries: (data: (number | string)[]) =>
			post('/api/delete_deliveries', data),
	};
}

export function useOrders() {
	const { data, error } = useSWR(`/api/get_orders`, get);

	return {
		Orders: [
			{
				id: 1,
				name: 'Order 1 name',
				active: true,
			},
			{
				id: 2,
				name: 'Order 2 name',
				active: false,
			},
			{
				id: 3,
				name: 'Order 3 name',
				active: true,
			},
			{
				id: 4,
				name: 'Order 4 name',
				active: true,
			},
			{
				id: 5,
				name: 'Order 5 name',
				active: true,
			},
		],
		orders_loading: !data && !error,
		orders_error: error,
		reloadOrders: () => mutate(`/api/get_orders`),
		createOrders: (data: OrdersItemProps) => post('/api/create_orders', data),
		updateOrders: (data: OrdersItemProps) => post('/api/update_orders', data),
		toggleOrders: (data: (number | string)[]) =>
			post('/api/toggle_orders', data),
		deleteOrders: (data: (number | string)[]) =>
			post('/api/delete_orders', data),
	};
}
