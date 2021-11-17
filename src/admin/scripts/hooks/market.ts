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
		products_loading: false,
		products_error: false,
		reloadProducts: () => {},
		createProducts: (data: ProductsItemProps) => {
			console.log(`create Products`, data);
		},
		updateProducts: (data: ProductsItemProps) => {
			console.log(`update Products`, data);
		},
		toggleProducts: (data: (number | string)[]) => {
			console.log(`toggle Products`, data);
		},
		deleteProducts: (data: (number | string)[]) => {
			console.log(`delete Products`, data);
		},
	};
}

export function useProductsOptions() {
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
		productsOptions_loading: false,
		productsOptions_error: false,
		reloadProductsOptions: () => {},
		createProductsOptions: (data: ProductsOptionsItemProps) => {
			console.log(`create ProductsOptions`, data);
		},
		updateProductsOptions: (data: ProductsOptionsItemProps) => {
			console.log(`update ProductsOptions`, data);
		},
		toggleProductsOptions: (data: (number | string)[]) => {
			console.log(`toggle ProductsOptions`, data);
		},
		deleteProductsOptions: (data: (number | string)[]) => {
			console.log(`delete ProductsOptions`, data);
		},
	};
}

export function useStores() {
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
		stores_loading: false,
		stores_error: false,
		reloadStores: () => {},
		createStores: (data: StoresItemProps) => {
			console.log(`create Stores`, data);
		},
		updateStores: (data: StoresItemProps) => {
			console.log(`update Stores`, data);
		},
		toggleStores: (data: (number | string)[]) => {
			console.log(`toggle Stores`, data);
		},
		deleteStores: (data: (number | string)[]) => {
			console.log(`delete Stores`, data);
		},
	};
}

export function useProducers() {
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
		producers_loading: false,
		producers_error: false,
		reloadProducers: () => {},
		createProducers: (data: ProducersItemProps) => {
			console.log(`create Producers`, data);
		},
		updateProducers: (data: ProducersItemProps) => {
			console.log(`update Producers`, data);
		},
		toggleProducers: (data: (number | string)[]) => {
			console.log(`toggle Producers`, data);
		},
		deleteProducers: (data: (number | string)[]) => {
			console.log(`delete Producers`, data);
		},
	};
}

export function usePayments() {
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
		payments_loading: false,
		payments_error: false,
		reloadPayments: () => {},
		createPayments: (data: PaymentsItemProps) => {
			console.log(`create Payments`, data);
		},
		updatePayments: (data: PaymentsItemProps) => {
			console.log(`update Payments`, data);
		},
		togglePayments: (data: (number | string)[]) => {
			console.log(`toggle Payments`, data);
		},
		deletePayments: (data: (number | string)[]) => {
			console.log(`delete Payments`, data);
		},
	};
}

export function useDistributors() {
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
		distributors_loading: false,
		distributors_error: false,
		reloadDistributors: () => {},
		createDistributors: (data: DistributorsItemProps) => {
			console.log(`create Distributors`, data);
		},
		updateDistributors: (data: DistributorsItemProps) => {
			console.log(`update Distributors`, data);
		},
		toggleDistributors: (data: (number | string)[]) => {
			console.log(`toggle Distributors`, data);
		},
		deleteDistributors: (data: (number | string)[]) => {
			console.log(`delete Distributors`, data);
		},
	};
}

export function useDeliveries() {
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
		deliveries_loading: false,
		deliveries_error: false,
		reloadDeliveries: () => {},
		createDeliveries: (data: DeliveriesItemProps) => {
			console.log(`create Deliveries`, data);
		},
		updateDeliveries: (data: DeliveriesItemProps) => {
			console.log(`update Deliveries`, data);
		},
		toggleDeliveries: (data: (number | string)[]) => {
			console.log(`toggle Deliveries`, data);
		},
		deleteDeliveries: (data: (number | string)[]) => {
			console.log(`delete Deliveries`, data);
		},
	};
}

export function useOrders() {
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
		orders_loading: false,
		orders_error: false,
		reloadOrders: () => {},
		createOrders: (data: OrdersItemProps) => {
			console.log(`create Orders`, data);
		},
		updateOrders: (data: OrdersItemProps) => {
			console.log(`update Orders`, data);
		},
		toggleOrders: (data: (number | string)[]) => {
			console.log(`toggle Orders`, data);
		},
		deleteOrders: (data: (number | string)[]) => {
			console.log(`delete Orders`, data);
		},
	};
}
