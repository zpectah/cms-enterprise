import $ from 'jquery';

import { storage } from '../../../../utils/utils';

class BasketModule {
	constructor(options) {
		this.root = $(`[data-module="BasketModule"]`);

		this.storage_items = storage.get('basket-items').split(',');

		//
		this.productItem = this.root.find('[data-component="ProductItem"]');

		//
		this.widget = this.root.find('[data-component="BasketWidget"]');
		this.widgetList = this.widget.find('[data-component="BasketWidgetList"]');
		this.widgetListItems = this.widget.find(
			'[data-component="BasketWidgetItem"]',
		);

		//
		this.storage_items.map((item) => {
			const id = item.split(':')[0];
			const value = item.split(':')[1];

			this.addHandler(id, value);
		});

		this.initEvents();
	}

	initEvents() {
		this.addTrigger = this.root.find('[data-component="BasketAddTrigger"]');
		this.removeTrigger = this.root.find(
			'[data-component="BasketRemoveTrigger"]',
		);
		this.widgetItemInput = this.root.find('[data-component="BasketItemInput"]');

		this.addTrigger.off().on('click', (e) => {
			e.preventDefault();
			this.addHandler(e.target.dataset.id);
		});
		this.removeTrigger.off().on('click', (e) => {
			e.preventDefault();
			this.removeHandler(e.target.dataset.id);
		});
		this.widgetItemInput.on('change blur', (e) => {
			e.preventDefault();
			this.updateHandler(e.target.dataset.id, e.target.value);
		});
	}

	updateStorageData() {
		let arr = [];
		this.root
			.find('[data-component="BasketWidgetItem"]')
			.each(function (index, item) {
				let id = $(item).data('id');
				let count = $(item).find('[data-component="BasketItemInput"]').val();
				arr.push(`${id}:${count}`);
			});
		storage.set('basket-items', arr.toString());
	}

	updateProductItem(id, method = 'update') {
		const el = this.root.find(
			`[data-component="ProductItem"][data-component-id="${id}"]`,
		);
		if (method === 'update') {
			el.addClass('in-basket');
		} else if (method === 'remove') {
			el.removeClass('in-basket');
		}
	}

	addHandler(id, value = 1) {
		const item = this.widgetList.find(`#widgetProductItem_${id}`);
		if (item.length === 0) {
			this.widgetList.append(
				`<div 
					id="widgetProductItem_${id}" 
					data-component="BasketWidgetItem"
					data-id="${id}"
				>
					<input 
						type="number" 
						id="widgetProductItem_value_${id}" 
						data-component="BasketItemInput"
						value="${value}" 
						data-id="${id}" 
					/>
					product #${id}
					<button 
						type="button" 
						data-component="BasketRemoveTrigger" 
						data-id="${id}"
					>
						Remove
					</button>
				</div>`,
			);
		} else {
			let e_value = item.find(`#widgetProductItem_value_${id}`).val();
			e_value = Number(e_value) + Number(value);
			this.widgetList.find(`#widgetProductItem_value_${id}`).val(e_value);
		}
		this.updateProductItem(id);
		this.updateStorageData();
		this.initEvents();
	}

	updateHandler(id, count) {
		this.updateProductItem(id);
		this.updateStorageData();
	}

	removeHandler(id) {
		const item = this.widgetList.find(`#widgetProductItem_${id}`);
		if (item.length !== 0)
			this.widgetList.find(`#widgetProductItem_${id}`).remove();
		this.updateProductItem(id, 'remove');
		this.updateStorageData();
		this.initEvents();
	}
}

new BasketModule({});
