import $ from 'jquery';
// https://mitchel.me/2018/writing-javascript-components-with-jquery/

class BasketWidget {
	constructor({ root }) {
		this.root = $(root);
		this.state = {
			itemsLength: 0,
		};
		this.list = this.root.find('[data-component="BasketWidgetList"]');
		this.items = this.root.find('[data-component="BasketWidgetItem"]');

		this.state.itemsLength = this.items.length;

		console.log('this.state.itemsLength', this.state.itemsLength);
	}

	get itemsCount() {
		return this.items.length;
	}
}

new BasketWidget({ root: '[data-component="BasketWidget"]' });
