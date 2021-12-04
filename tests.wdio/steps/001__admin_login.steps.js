import { expect } from 'chai';

import PageClass from '../pages/page';
import AdminLogin_PageClass from '../pages/001__admin_login.page';

export default class AdminLogin_StepsClass {
	constructor(selectedBrowsers) {
		this.AdminLoginClass = new AdminLogin_PageClass(selectedBrowsers);
		this.Page = new PageClass(selectedBrowsers);
	}

	go_to_login() {
		this.AdminLoginClass.open_login_page();
	}

	fill_form() {
		this.Page.wait(500);
		this.AdminLoginClass.form_input_email.waitForEnabled();
		this.AdminLoginClass.form_input_email.setValue('sychrat@gmail.com');
		this.Page.wait(500);
		this.AdminLoginClass.form_input_password.waitForEnabled();
		this.AdminLoginClass.form_input_password.setValue('bomboklad');
	}

	submit_form() {
		this.AdminLoginClass.form_submit_button.waitForEnabled();
		this.AdminLoginClass.form_submit_button.click();
		this.Page.wait(2500);
	}
}
