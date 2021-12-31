process.env.NODE_ENV = window.APPENV;

import '../../../node_modules/bootstrap/dist/js/bootstrap';

// Modules
import BasketModule from './module/BasketModule';

new BasketModule(
	{},
	{},
	(items) => {
		console.log(
			'onChangeCallback',
			'event trigger when basket has changed',
			items,
		);
	},
	(attr) => {
		window.location.href = attr.callbackUrl + '?status=success';
	},
	(attr) => {
		console.log('afterPaymentCallback', attr);
	},
);

// Components
