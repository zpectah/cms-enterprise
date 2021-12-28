import $ from 'jquery';
// https://mitchel.me/2018/writing-javascript-components-with-jquery/

class BasketAddTrigger {
	constructor({ root }) {
		this.root = $(root);
		this.state = {};
		this.root.on('click', (e) => {
			e.preventDefault();
			this.addHandler(e.target.dataset.id);
		});
	}

	addHandler(id) {
		console.log('addHandler click ', id);
	}
}

new BasketAddTrigger({ root: '[data-component="BasketAddTrigger"]' });
