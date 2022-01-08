import Vue from 'vue';

import { get } from './utils/http';
import { DEFAULT_LANGUAGE } from './constants';

// Standalone components

// Mixins
import BasketMixin from './mixins/Basket.mixin';
import MembersMixin from './mixins/Members.mixin';

// Components
import demoComponent from './components/demoComponent';

// Vue init
new Vue({
	el: '#vue-app',
	mixins: [BasketMixin, MembersMixin],
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
				// console.warn(`Missing translation key: "${key}"`);
			}

			return label;
		},
	},
});
