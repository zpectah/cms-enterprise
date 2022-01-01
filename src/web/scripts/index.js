process.env.NODE_ENV = window.APPENV;

import Vue from 'vue';
import '../../../node_modules/bootstrap/dist/js/bootstrap';

import demoComponent from './components/demoComponent';

import basketWidget from './components/basketWidget';

new Vue({
	el: '#vue-app',
	components: {
		'demo-component': demoComponent,
		//
		'basket-widget': basketWidget,
	},
});
