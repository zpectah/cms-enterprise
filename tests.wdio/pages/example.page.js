import { PATH } from '../constants.js';
import Page from './page';

class ExamplePage extends Page {
	get menuToggle() {
		return super.getElm('toggle.sidebar');
	}

	get menuLink() {
		return super.getElm('navbar.primary.item.Posts');
	}

	openAdmin() {
		return super.openUrl(PATH.admin);
	}
}

export default new ExamplePage();
