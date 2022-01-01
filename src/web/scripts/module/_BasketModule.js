import $ from 'jquery';

import { storage } from '../../../../utils/utils';

const getModuleContext = (
	widgetEl,
	listEl,
	summaryEl,
	confirmationEl,
	finishEl,
) => {
	let ctx = 'widget';
	if (listEl) {
		ctx = 'list';
	} else if (summaryEl) {
		ctx = 'summary';
	} else if (confirmationEl) {
		ctx = 'confirmation';
	} else if (finishEl) {
		ctx = 'finish';
	}

	return ctx;
};

export default class BasketModule {
	constructor(
		opt,
		sel,
		onChangeCallback,
		paymentCallback,
		afterPaymentCallback,
	) {
		this.opt = {
			storageKey: 'web_basket_items',
			...opt,
		};
		this.sel = {
			root: 'BasketModule',
			basketWidget: 'BasketWidget',
			basketWidgetLink: 'BasketWidgetLink',
			basketWidgetList: 'BasketWidgetList',
			basketWidgetItem: 'BasketWidgetItem',
			basketWidgetItemAdd: 'BasketAddTrigger',
			basketWidgetItemRemove: 'BasketWidgetRemoveTrigger',
			basketWidgetItemInput: 'BasketWidgetItemInput',
			listItemProduct: 'ProductItem',
			basketItemId: 'widgetProductItem_',
			pageBasketList: 'PageBasketList',
			pageBasketListItems: 'PageBasketListItems',
			pageBasketListBtnNext: 'PageBasketListBtnNext',
			pageBasketListItem: 'PageBasketListItem',
			pageBasketListItemRemove: 'PageBasketListItemRemoveTrigger',
			pageBasketListItemInput: 'PageBasketListItemInput',
			pageListItemId: 'pageListProductItem_',
			pageBasketSummary: 'PageBasketSummary',
			pageBasketSummaryBtnNext: 'PageBasketSummaryBtnNext',
			pageBasketConfirmation: 'PageBasketConfirmation',
			pageBasketConfirmationSubmit: 'BasketConfirmButton',
			pageBasketFinish: 'PageBasketFinish',
			...sel,
		};
		this.onChangeCallback = onChangeCallback;
		this.paymentCallback = paymentCallback;
		this.afterPaymentCallback = afterPaymentCallback;
		this.root = $(`[data-module="${this.sel.root}"]`);
		this.pageBasketList = $(`[data-module="${this.sel.pageBasketList}"]`);
		this.pageBasketSummary = $(`[data-module="${this.sel.pageBasketSummary}"]`);
		this.pageBasketConfirmation = $(
			`[data-module="${this.sel.pageBasketConfirmation}"]`,
		);
		this.pageBasketFinish = $(`[data-module="${this.sel.pageBasketFinish}"]`);
		this.storage_items = storage.get(this.opt.storageKey);
		this.basket_items = this.storage_items ? this.storage_items.split(',') : [];
		this.pageBasketListItems = this.root.find(
			`[data-component="${this.sel.pageBasketListItems}"]`,
		);
		this.widget = this.root.find(`[data-component="${this.sel.basketWidget}"]`);
		this.widgetList = this.widget.find(
			`[data-component="${this.sel.basketWidgetList}"]`,
		);
		this.widgetLink = this.widget.find(
			`[data-component="${this.sel.basketWidgetLink}"]`,
		);
		this.data_context = getModuleContext(
			this.widget.length > 0,
			this.pageBasketList.length > 0,
			this.pageBasketSummary.length > 0,
			this.pageBasketConfirmation.length > 0,
			this.pageBasketFinish.length > 0,
		);
		this.root.attr('data-basket-context', this.data_context);
		//
		this.basket_items.map((item) => {
			const id = item.split(':')[0];
			const value = item.split(':')[1];
			this.addHandler(id, value);
		});
		if (this.data_context === 'widget') this.initWidgetEvents();
		if (this.data_context === 'list') this.initPageListEvents();
		if (this.data_context === 'summary') this.initSummaryEvents();
		if (this.data_context === 'confirmation') this.initConfirmationEvents();
		if (this.data_context === 'finish') this.initFinishEvents();
	}

	// Change event handler and update storage
	onChange(items) {
		storage.set(this.opt.storageKey, items);
		if (this.onChangeCallback) this.onChangeCallback({ items: items });
	}

	// Get basket items and parse data
	setBasketItemsData() {
		const arr = [];
		const sel = this.sel;
		switch (this.data_context) {
			case 'list':
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
				this.onChange(arr.toString());
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
				this.onChange(arr.toString());
				break;

			default:
				this.onChange(this.storage_items);
				break;
		}
	}

	// Events for basket widget
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

	// Events for basket list step
	initPageListEvents() {
		this.pageBasketListItemRemove = this.root.find(
			`[data-component="${this.sel.pageBasketListItemRemove}"]`,
		);
		this.pageBasketListItemInput = this.root.find(
			`[data-component="${this.sel.pageBasketListItemInput}"]`,
		);
		this.pageBasketListBtnNext = this.root.find(
			`[data-component="${this.sel.pageBasketListBtnNext}"]`,
		);

		this.pageBasketListItemRemove.off().on('click', (e) => {
			e.preventDefault();
			this.removeHandler(e.target.dataset.id);
		});
		this.pageBasketListItemInput.on('change blur', (e) => {
			e.preventDefault();
			this.updateHandler(e.target.dataset.id, e.target.value);
		});

		this.pageBasketListBtnNext.off().on('click', (e) => {
			e.preventDefault();
			const items = storage.get(this.opt.storageKey);
			const nextPath = this.pageBasketList.data('nextpath');
			if (items) {
				window.location.href = nextPath;
			} else {
				console.warn('No items in basket!');
			}
		});
	}

	// Events for basket summary step
	initSummaryEvents() {
		this.pageBasketSummaryBtnNext = this.root.find(
			`[data-component="${this.sel.pageBasketSummaryBtnNext}"]`,
		);

		// TODO: init all input fields
		// TODO: Handle errors & messages

		this.pageBasketSummaryBtnNext.off().on('click', (e) => {
			e.preventDefault();
			const items = storage.get(this.opt.storageKey);
			const nextPath = this.pageBasketSummary.data('nextpath');
			if (items) {
				// TODO: handle valid form
				window.location.href = nextPath;
			} else {
				console.warn('No items in basket!');
			}
		});
	}

	// Events for basket confirmation step
	initConfirmationEvents() {
		this.pageBasketConfirmationSubmit = this.pageBasketConfirmation.find(
			`[data-component="${this.sel.pageBasketConfirmationSubmit}"]`,
		);
		this.pageBasketConfirmationSubmit.off().on('click', (e) => {
			e.preventDefault();
			if (this.paymentCallback) {
				this.paymentCallback({ callbackUrl: e.target.dataset.callbackurl });
			}
		});
	}

	// Events after finished order with payment response
	initFinishEvents() {
		if (this.afterPaymentCallback) {
			const urlParams = new URLSearchParams(window.location.href);
			const status = urlParams.get('status');
			storage.remove(this.opt.storageKey);
			this.afterPaymentCallback({ status: status });
		}
	}

	// Update product list item or product detail class even when is in basket
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

	// Render basket widget item
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

	// Render basket list item
	renderPageListItem(id, value) {
		this.pageBasketListItems.append(
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

	// When product list item or product detail item clicked to add to basket
	addHandler(id, value = 1) {
		let item;
		if (this.data_context === 'widget')
			item = this.widgetList.find(`#${this.sel.basketItemId}${id}`);
		if (this.data_context === 'list')
			item = this.pageBasketListItems.find(`#${this.sel.pageListItemId}${id}`);
		if (!item) return;
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
				this.pageBasketListItems
					.find(`#${this.sel.pageListItemId}value_${id}`)
					.val(e_value);
		}
		this.updateProductItem(id);
		this.setBasketItemsData();
		if (this.data_context === 'widget') this.initWidgetEvents();
		if (this.data_context === 'list') this.initPageListEvents();
	}

	// When update basket item count value (widget or basket list)
	updateHandler(id, count) {
		this.updateProductItem(id);
		this.setBasketItemsData();
	}

	// When clicked on remove in basket item (widget or basket list)
	removeHandler(id) {
		let item;
		if (this.data_context === 'widget')
			item = this.widgetList.find(`#${this.sel.basketItemId}${id}`);
		if (this.data_context === 'list')
			item = this.pageBasketListItems.find(`#${this.sel.pageListItemId}${id}`);
		if (item.length !== 0) item.remove();
		this.updateProductItem(id, 'remove');
		this.setBasketItemsData();
		if (this.data_context === 'widget') this.initWidgetEvents();
		if (this.data_context === 'list') this.initPageListEvents();
	}
}
