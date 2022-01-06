import Vue from 'vue';

import { DEFAULT_LANGUAGE } from './constants';

// Standalone components

// Mixins
import BasketMixin from './mixins/BasketMixin';

// Components
import demoComponent from './components/demoComponent';
import { get } from './utils/http';

// Vue init
new Vue({
	el: '#vue-app',
	mixins: [BasketMixin],
	components: {
		'demo-component': demoComponent,
	},
	data: function () {
		return {
			lang: DEFAULT_LANGUAGE,
			to: {},
		};
	},
	mounted: async function () {
		this.lang = this.$el.dataset.lang;
		await get(
			`/api/get_translations?parsed=true&lang=${this.$el.dataset.lang}`,
		).then((response) => {
			if (response.data) this.to = response.data;
		});
	},
	computed: {},
	methods: {
		// Translations
		t: function (key) {
			let label = key;
			if (this.to[key]) {
				label = this.to[key];
			} else {
				console.warn(`Missing translation key: "${key}"`);
			}

			return label;
		},
		// Custom callback for finish order
		onFinishOrder: function (id, price, unit, url) {
			const request = {
				token: 'unknown', // secret service token
				id: id, // unique order id
				price: price, // price of items, payment and delivery
				unit: unit, // price unit
				url: url, // return url
			};

			// TODO
			console.log('order request to payment gate', request);
			setTimeout(() => {
				window.location.href = `${url}&status=success`;
			}, 2500);
		},
	},
});
