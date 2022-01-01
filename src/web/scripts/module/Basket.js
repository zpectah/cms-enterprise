import { storage } from '../../../../utils/utils';

export default () => {
	const getItems = () => {
		const items = storage.get('web_basket_items');
		const items_array = items ? items.split(',') : [];
		let tmp = [];
		items_array.map((item) => {
			let pi = item.split(':');
			tmp.push({
				id: Number(pi[0]),
				count: Number(pi[1]),
			});
		});

		return tmp;
	};
	const updateStorage = (array = []) => {
		let tmp = [];
		array.map((item) => {
			tmp.push(`${item.id}:${item.count}`);
		});
		storage.set('web_basket_items', tmp.toString());
	};

	const getTotalPrice = () => {
		// TODO

		return 0;
	};

	const addHandler = function (id, count = 1) {
		console.log('Add handler', id, count, this);

		const items = [...getItems()];
		const index = items.findIndex((item) => Number(item.id) === Number(id));
		if (index > -1) {
			items[index].count = items[index].count + count;
		} else {
			items.push({
				id: Number(id),
				count: Number(count),
			});
		}

		updateStorage(items);
	};

	const removeHandler = function (id) {
		console.log('Remove handler', id, this);
		// TODO
	};

	const updateHandler = function (id, count) {
		console.log('Update handler', id, count, this);
		// TODO
	};

	return {
		get_items: getItems,
		get_total_price: getTotalPrice,
		add: addHandler,
		remove: removeHandler,
		update: updateHandler,
	};
};
