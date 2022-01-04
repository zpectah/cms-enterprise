import { storage } from '../../../../utils/utils';
import { STORAGE_KEY_BASKET_ITEMS } from '../constants';
import { get, post } from '../utils/http';
import BasketWidget from '../components/Basket/BasketWidget';
import BasketAddButton from '../components/Basket/BasketAddButton';
import PageBasketList from '../components/Basket/PageBasketList';
import PageBasketSummary from '../components/Basket/PageBasketSummary';
import PageBasketConfirmation from '../components/Basket/PageBasketConfirmation';

const BasketMixin = {
	components: {
		'basket-widget': BasketWidget,
		'basket-add-button': BasketAddButton,
		'page-basket-list': PageBasketList,
		'page-basket-summary': PageBasketSummary,
		'page-basket-confirmation': PageBasketConfirmation,
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
			_products: [],
			// _deliveries: [],
			// _payments: [],
		};
	},
	mounted: async function () {
		await get('/api/get_products').then((response) => {
			if (response.data) {
				this._products = response.data;
				this.basket_items = this.get_basket_items();
				this.basket_price = this.get_basket_price();
			}
		});
	},
	methods: {
		get_product_detail: function (id) {
			const item = this._products.find((fi) => Number(fi.id) === Number(id));

			return {
				title: item.lang[this.$root.lang].title,
				price: item.item_price,
			};
		},
		get_basket_items: function () {
			const items = storage.get(STORAGE_KEY_BASKET_ITEMS);
			const items_array = items ? items.split(',') : [];
			let tmp = [];
			items_array.map((item) => {
				let pi = item.split(':');
				tmp.push({
					id: Number(pi[0]),
					count: Number(pi[1]),
					...this.get_product_detail(Number(pi[0])),
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
			storage.set(STORAGE_KEY_BASKET_ITEMS, tmp.toString());
		},
		add_to_basket: function (id, count = 1) {
			const items = this.get_basket_items();
			const index = items.findIndex((item) => Number(item.id) === Number(id));
			if (index > -1) {
				items[index].count = items[index].count + count;
			} else {
				const item = this._products.find((fi) => Number(fi.id) === Number(id));
				items.push({
					id: Number(id),
					count: Number(count),
					title: item.lang[this.$root.lang].title,
					price: item.item_price,
				});
			}
			this.basket_items = items;
			this.update_storage(items);
		},
		remove_from_basket: function (id) {
			const items = this.get_basket_items();
			const index = items.findIndex((item) => Number(item.id) === Number(id));
			if (index > -1) {
				items.splice(index, 1);
			}
			this.basket_items = items;
			this.update_storage(items);
		},
		update_basket_item: function (id, count) {
			const items = this.get_basket_items();
			const index = items.findIndex((item) => Number(item.id) === Number(id));
			if (index > -1) {
				if (count < 0) return this.remove_from_basket(id);
				items[index].count = count;
			}
			this.basket_items = items;
			this.update_storage(items);
		},
	},
};

export default BasketMixin;
