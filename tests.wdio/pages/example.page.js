import { PATH } from '../constants.js';
import Page from './page';

export default class ExamplePageClass extends Page {
	constructor(selectedBrowser) {
		super(selectedBrowser);
	}

	get menuToggle() {
		return super.getElm('toggle.sidebar');
	}

	get menuLink() {
		return super.getElm('navbar.primary.item.Posts');
	}

	openAdmin() {
		return super.openUrl(PATH.admin.root);
	}
}
