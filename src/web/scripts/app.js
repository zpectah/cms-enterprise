import Vue from 'vue';

// Standalone components

// Mixins
import BasketMixin from './mixins/BasketMixin';

// Components
import demoComponent from './components/demoComponent';

// Vue init
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
