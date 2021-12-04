import { ELEMENT_DATA_TEST_ATTR } from '../constants.js';

export default class Page {
	constructor(browser) {}

	openUrl(path) {
		return browser.url(path);
	}

	wait(timeout) {
		return browser.pause(timeout);
	}

	getElm(selector, prefix = '', suffix = '') {
		return browser.$(
			`${prefix}[${ELEMENT_DATA_TEST_ATTR}="${selector}"]${suffix}`,
		);
	}

	getElmAll(selector, prefix = '', suffix = '') {
		return browser.$$(
			`${prefix}[${ELEMENT_DATA_TEST_ATTR}="${selector}"]${suffix}`,
		);
	}
}
