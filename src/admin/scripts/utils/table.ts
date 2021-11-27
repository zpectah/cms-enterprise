export function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

export function getComparator<Key extends keyof any>(
	order: 'asc' | 'desc',
	orderBy: any,
): (a: { [key in Key]: any }, b: { [key in Key]: any }) => number {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort<T>(
	array: readonly T[],
	comparator: (a: T, b: T) => number,
) {
	const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) {
			return order;
		}
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
}

export const getSearchAttrs = (attrs, lang) => {
	let na = [];

	attrs.map((attr) => {
		let ni = attr.replace('[lang]', lang);
		na.push(ni);
	});

	return na;
};

export const getTypesFromData = (data: any[]) => {
	let list = [];

	data.map((item) => {
		let type = item.type;

		if (list.indexOf(type) < 0) list.push(type);
	});

	return list;
};
