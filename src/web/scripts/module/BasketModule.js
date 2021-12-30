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
			//
			pageBasketList: 'PageBasketList',
			pageBasketListItem: 'PageBasketListItem',
			pageBasketListItemRemove: 'PageBasketListItemRemoveTrigger',
			pageBasketListItemInput: 'PageBasketListItemInput',
			pageListItemId: 'pageListProductItem_',
		},
	) {
		this.root = $(`[data-module="${sel.root}"]`);
		this.pageBasketList = $(`[data-module="${sel.pageBasketList}"]`);
		this.opt = opt;
		this.sel = sel;
		this.storage_items = storage.get(opt.storageKey);
		this.basket_items = this.storage_items ? this.storage_items.split(',') : [];
		this.widget = this.root.find(`[data-component="${sel.basketWidget}"]`);
		this.widgetList = this.widget.find(
			`[data-component="${sel.basketWidgetList}"]`,
		);
		this.data_context =
			this.widget.length > 0
				? 'widget'
				: this.pageBasketList.length > 0
				? 'list'
				: 'summary';
		this.root.attr('data-basket-context', this.data_context);
		//
		this.basket_items.map((item) => {
			const id = item.split(':')[0];
			const value = item.split(':')[1];
			this.addHandler(id, value);
		});
		if (this.data_context === 'widget') this.initWidgetEvents();
		if (this.data_context === 'list') this.initPageListEvents();
	}

	initWidgetEvents() {
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

	initPageListEvents() {
		this.pageBasketListItemRemove = this.root.find(
			`[data-component="${this.sel.pageBasketListItemRemove}"]`,
		);
		this.pageBasketListItemInput = this.root.find(
			`[data-component="${this.sel.pageBasketListItemInput}"]`,
		);

		this.pageBasketListItemRemove.off().on('click', (e) => {
			e.preventDefault();
			this.removeHandler(e.target.dataset.id);
		});
		this.pageBasketListItemInput.on('change blur', (e) => {
			e.preventDefault();
			this.updateHandler(e.target.dataset.id, e.target.value);
		});
	}

	updateStorageData() {
		const arr = [];
		const sel = this.sel;
		switch (this.data_context) {
			case 'list':
			case 'summary':
				this.root
					.find(`[data-component="${this.sel.pageBasketListItem}"]`)
					.each(function (index, item) {
						let id = $(item).data('id');
						let input = $(item).find(
							`[data-component="${sel.pageBasketListItemInput}"]`,
						);
						let count = input.val();
						arr.push(`${id}:${count}`);
					});
				storage.set(this.opt.storageKey, arr.toString());
				break;

			case 'widget':
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
				break;

			default:
				storage.set(this.opt.storageKey, this.storage_items);
				break;
		}
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

	renderWidgetListItem(id, value) {
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
	}

	renderPageListItem(id, value) {
		this.pageBasketList.append(
			`<div 
					id="${this.sel.pageListItemId}${id}" 
					data-component="${this.sel.pageBasketListItem}"
					data-id="${id}"
				>
					<input 
						type="number" 
						id="${this.sel.pageListItemId}value_${id}" 
						data-component="${this.sel.pageBasketListItemInput}"
						value="${value}" 
						data-id="${id}" 
					/>
					product #${id}
					<button 
						type="button" 
						data-component="${this.sel.pageBasketListItemRemove}" 
						data-id="${id}"
					>
						Remove
					</button>
				</div>`,
		);
	}

	addHandler(id, value = 1) {
		let item;
		if (this.data_context === 'widget')
			item = this.widgetList.find(`#${this.sel.basketItemId}${id}`);
		if (this.data_context === 'list')
			item = this.pageBasketList.find(`#${this.sel.pageListItemId}${id}`);
		if (item.length === 0) {
			if (this.data_context === 'widget') this.renderWidgetListItem(id, value);
			if (this.data_context === 'list') this.renderPageListItem(id, value);
		} else {
			let e_value =
				item.find(`#${this.sel.basketItemId}value_${id}`).val() ||
				item.find(`#${this.sel.pageListItemId}value_${id}`).val();
			e_value = Number(e_value) + Number(value);
			if (this.data_context === 'widget')
				this.widgetList
					.find(`#${this.sel.basketItemId}value_${id}`)
					.val(e_value);
			if (this.data_context === 'list')
				this.pageBasketList
					.find(`#${this.sel.pageListItemId}value_${id}`)
					.val(e_value);
		}
		this.updateProductItem(id);
		this.updateStorageData();
		if (this.data_context === 'widget') this.initWidgetEvents();
		if (this.data_context === 'list') this.initPageListEvents();
	}

	updateHandler(id, count) {
		this.updateProductItem(id);
		this.updateStorageData();
	}

	removeHandler(id) {
		let item;
		if (this.data_context === 'widget')
			item = this.widgetList.find(`#${this.sel.basketItemId}${id}`);
		if (this.data_context === 'list')
			item = this.pageBasketList.find(`#${this.sel.pageListItemId}${id}`);
		if (item.length !== 0) item.remove();
		this.updateProductItem(id, 'remove');
		this.updateStorageData();
		if (this.data_context === 'widget') this.initWidgetEvents();
		if (this.data_context === 'list') this.initPageListEvents();
	}
}

new BasketModule();
