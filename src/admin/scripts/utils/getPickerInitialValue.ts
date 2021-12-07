export default (value: (number | string)[] | string) => {
	if (value == '') return [];
	if (typeof value == 'string') {
		return [value];
	} else if (typeof value == 'object') {
		return [...value];
	} else {
		return [];
	}
};
