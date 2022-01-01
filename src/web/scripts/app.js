import Vue from 'vue';

import { storage } from '../../../utils/utils';

import demoComponent from './components/demoComponent';

import BasketModule from './module/Basket';
import BasketWidget from './components/BasketWidget';
import BasketAddButton from './components/BasketAddButton';

const Basket = BasketModule();

new Vue({
	el: '#vue-app',
	components: {
		'demo-component': demoComponent,
		//
		'basket-widget': BasketWidget,
		'basket-add-button': BasketAddButton,
	},
	data: {
		basket_items: [...Basket.get_items()],
		basket_total_price: Basket.get_total_price(),
	},
	computed: {},
	methods: {
		basket_get_basket_items: Basket.get_items,
		basket_add_item: Basket.add,
		basket_remove_item: Basket.remove,
		basket_update_item: Basket.update,
	},
});
