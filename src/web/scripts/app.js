import Vue from 'vue';

import demoComponent from './components/demoComponent';

import BasketMixin from './module/BasketMixin';

new Vue({
	el: '#vue-app',
	mixins: [BasketMixin],
	components: {
		'demo-component': demoComponent,
	},
	data: {},
	computed: {},
	methods: {},
});
