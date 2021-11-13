import { ELEMENT_DATA_TEST_ATTR } from '../constants';

export const getElTestAttr = (value: string) => {
	const attrs = {};
	attrs[ELEMENT_DATA_TEST_ATTR] = value;

	return attrs;
};
