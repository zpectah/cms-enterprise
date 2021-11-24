import { ELEMENT_DATA_TEST_ATTR } from '../constants.js';

export default class Page {
	openUrl(path) {
		return browser.url(path);
	}

	getElm(selector, prefix = '', suffix = '') {
		return $(`${prefix}[${ELEMENT_DATA_TEST_ATTR}="${selector}"]${suffix}`);
	}
}
