import Vue from 'vue';

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
	data: {
		to: {},
	},
	mounted: async function () {
		await get('/api/get_translations?parsed=true').then((response) => {
			if (response.data) {
				console.log('get_translations', response);
				this.to = response.data;
			}
		});
	},
	computed: {},
	methods: {
		t: function (key) {
			console.log('translation', key);

			return key;
		},
	},
});
