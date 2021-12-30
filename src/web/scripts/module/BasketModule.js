import $ from 'jquery';

import { storage } from '../../../../utils/utils';

class BasketModule {
	constructor(
		opt = {
			storageKey: 'basket-items',
		},
		sel = {
			root: 'BasketModule',
			basketWidget: 'BasketWidget',
			basketWidgetList: 'BasketWidgetList',
			basketWidgetItem: 'BasketWidgetItem',
			basketWidgetItemAdd: 'BasketAddTrigger',
			basketWidgetItemRemove: 'BasketWidgetRemoveTrigger',
			basketWidgetItemInput: 'BasketWidgetItemInput',
			listItemProduct: 'ProductItem',
			basketItemId: 'widgetProductItem_',
		},
	) {
		this.root = $(`[data-module="${sel.root}"]`);
		this.opt = opt;
		this.sel = sel;
		this.storage_items = storage.get(opt.storageKey);
		this.basket_items = this.storage_items ? this.storage_items.split(',') : [];
		this.widget = this.root.find(`[data-component="${sel.basketWidget}"]`);
		this.widgetList = this.widget.find(
			`[data-component="${sel.basketWidgetList}"]`,
		);
		this.basket_items.map((item) => {
			const id = item.split(':')[0];
			const value = item.split(':')[1];
			this.addHandler(id, value);
		});
		this.initEvents();
	}

	initEvents() {
		this.addTrigger = this.root.find(
			`[data-component="${this.sel.basketWidgetItemAdd}"]`,
		);
		this.removeTrigger = this.root.find(
			`[data-component="${this.sel.basketWidgetItemRemove}"]`,
		);
		this.widgetItemInput = this.root.find(
			`[data-component="${this.sel.basketWidgetItemInput}"]`,
		);
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
		let sel = this.sel;
		this.root
			.find(`[data-component="${this.sel.basketWidgetItem}"]`)
			.each(function (index, item) {
				let id = $(item).data('id');
				let input = $(item).find(
					`[data-component="${sel.basketWidgetItemInput}"]`,
				);
				let count = input.val();
				arr.push(`${id}:${count}`);
			});
		storage.set(this.opt.storageKey, arr.toString());
	}

	updateProductItem(id, method = 'update') {
		const el = this.root.find(
			`[data-component="${this.sel.listItemProduct}"][data-component-id="${id}"]`,
		);
		if (method === 'update') {
			el.addClass('in-basket');
		} else if (method === 'remove') {
			el.removeClass('in-basket');
		}
	}

	addHandler(id, value = 1) {
		const item = this.widgetList.find(`#${this.sel.basketItemId}${id}`);
		if (item.length === 0) {
			this.widgetList.append(
				`<div 
					id="${this.sel.basketItemId}${id}" 
					data-component="${this.sel.basketWidgetItem}"
					data-id="${id}"
				>
					<input 
						type="number" 
						id="${this.sel.basketItemId}value_${id}" 
						data-component="${this.sel.basketWidgetItemInput}"
						value="${value}" 
						data-id="${id}" 
					/>
					product #${id}
					<button 
						type="button" 
						data-component="${this.sel.basketWidgetItemRemove}" 
						data-id="${id}"
					>
						Remove
					</button>
				</div>`,
			);
		} else {
			let e_value = item.find(`#${this.sel.basketItemId}value_${id}`).val();
			e_value = Number(e_value) + Number(value);
			this.widgetList.find(`#${this.sel.basketItemId}value_${id}`).val(e_value);
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

new BasketModule();
