import { OrdersItemProps } from '../../types/model';

export default {
	id: 'new',
	type: 'default',
	name: '',
	email: '',
	phone: '',
	customer_name: '',
	country: '',
	city: '',
	address: '',
	zip: '',
	delivery: '',
	payment: '',
	description: '',
	items: [],
	price_total: 0,
	status: 1,
} as OrdersItemProps;
