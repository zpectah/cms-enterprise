import { storage } from '../../../../utils/utils';
import {
	STORAGE_KEY_BASKET_ITEMS,
	STORAGE_KEY_BASKET_SUMMARY,
} from '../constants';
import { get, post } from '../utils/http';
import BasketWidget from '../components/Basket/BasketWidget';
import BasketAddButton from '../components/Basket/BasketAddButton';
import PageBasketList from '../components/Basket/PageBasketList';
import PageBasketSummary from '../components/Basket/PageBasketSummary';
import PageBasketConfirmation from '../components/Basket/PageBasketConfirmation';
import PageBasketFinish from '../components/Basket/PageBasketFinish';

const BasketMixin = {
	components: {
		'basket-widget': BasketWidget,
		'basket-add-button': BasketAddButton,
		'page-basket-list': PageBasketList,
		'page-basket-summary': PageBasketSummary,
		'page-basket-confirmation': PageBasketConfirmation,
		'page-basket-finish': PageBasketFinish,
	},
	data: function () {
		return {
			basket_items: [],
			_products: [],
		};
	},
	mounted: async function () {
		await get('/api/get_products').then((response) => {
			if (response.data) {
				this._products = response.data;
				this.basket_items = this.get_basket_items();
			}
		});
	},
	methods: {
		get_basket_items: function () {
			const items = storage.get(STORAGE_KEY_BASKET_ITEMS);
			const items_array = items ? items.split(',') : [];
			let tmp = [];
			items_array.map((item) => {
				let pi = item.split(':');
				const fit = this._products.find(
					(fi) => Number(fi.id) === Number(pi[0]),
				);
				let no = {
					id: Number(pi[0]),
					count: Number(pi[1]),
					title: fit.lang[this.$root.lang].title,
					price: Number(fit.item_price),
					weight: Number(fit.item_weight),
					in_stock: fit.in_stock,
				};
				tmp.push(no);
			});

			return tmp;
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
					weight: item.item_weight,
					in_stock: item.in_stock,
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
		clear_storage: function () {
			storage.remove(STORAGE_KEY_BASKET_ITEMS);
			storage.remove(STORAGE_KEY_BASKET_SUMMARY);
		},
		order_finish: async function (master, id, price, unit, url) {
			await post('/api/create_orders', master).then((response) => {
				if (response.data && response.data.id) {
					//
					// TODO -> Payment service request
					//
					const request = {
						token: 'unknown',
						email: master.email,
						id: id,
						price: price,
						unit: unit,
						url: url,
					};
					console.log('order request to payment gate', request);
					setTimeout(() => {
						window.location.href = `${url}?oid=${id}&order_status=success`;
					}, 2500);
				}
			});
		},
	},
};

export default BasketMixin;
