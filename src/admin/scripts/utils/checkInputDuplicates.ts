export default (
	items: any[],
	id: number | string,
	name: string,
	value: string,
) => {
	let is_duplicates = false;
	items?.map((item) => {
		if (
			(item[name] == value || item[name] == value.split(' ').join('-')) &&
			item.id !== id
		)
			is_duplicates = true;
	});

	return is_duplicates;
};
