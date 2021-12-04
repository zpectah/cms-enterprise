import { PATH } from '../constants.js';
import Page from './page';

export default class AdminLogin_PageClass extends Page {
	constructor(selectedBrowser) {
		super(selectedBrowser);
	}

	open_login_page() {
		return super.openUrl(PATH.admin.login);
	}

	get form_input_email() {
		return this.getElm('LoginForm.input.email', '', ' input');
	}

	get form_input_password() {
		return this.getElm('LoginForm.input.password', '', ' input');
	}

	get form_submit_button() {
		return this.getElm('LoginForm.button.submit');
	}

	get menu_link() {
		return this.getElm('navbar.primary.item.Posts');
	}
}
