import { storage } from '../../../../utils/utils';

import BasketWidget from '../components/BasketWidget';
import BasketAddButton from '../components/BasketAddButton';

const BasketMixin = {
	components: {
		'basket-widget': BasketWidget,
		'basket-add-button': BasketAddButton,
	},
	data: function () {
		return {
			basket_items: [],
			basket_price: {
				items: 0,
				payment: 0,
				delivery: 0,
				tax: 0,
				total: 0,
			},
		};
	},
	mounted: async function () {
		this.basket_items = this.get_basket_items();
		this.basket_price = this.get_basket_price();
	},
	methods: {
		get_basket_items: function () {
			const items = storage.get('web_basket_items');
			const items_array = items ? items.split(',') : [];
			let tmp = [];
			items_array.map((item) => {
				let pi = item.split(':');
				tmp.push({
					id: Number(pi[0]),
					count: Number(pi[1]),
				});
			});

			return tmp;
		},
		get_basket_price: function () {
			// TODO

			return {
				items: 0,
				payment: 0,
				delivery: 0,
				tax: 0,
				total: 0,
			};
		},
		update_storage: function (array = []) {
			let tmp = [];
			array.map((item) => {
				tmp.push(`${item.id}:${item.count}`);
			});
			storage.set('web_basket_items', tmp.toString());
		},
		add_to_basket: function (id, count = 1) {
			const items = this.get_basket_items();
			const index = items.findIndex((item) => Number(item.id) === Number(id));
			if (index > -1) {
				items[index].count = items[index].count + count;
			} else {
				items.push({
					id: Number(id),
					count: Number(count),
				});
			}
			this.basket_items = items;
			this.update_storage(items);
		},
		remove_from_basket: function (id) {
			const items = this.get_basket_items();
			const index = items.findIndex((item) => Number(item.id) === Number(id));
			if (index > -1) items.splice(index, 1);
			this.basket_items = items;
			this.update_storage(items);
		},
		update_basket_item: function (id, count) {
			console.log('Update handler', id, count, this);
			// TODO
		},
	},
};

export default BasketMixin;
