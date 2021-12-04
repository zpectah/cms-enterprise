import AdminLogin_PageClass from '../pages/001__admin_login.page';
import AdminLogin_StepsClass from '../steps/001__admin_login.steps';

describe('Admin: Login and logout', () => {
	let AdminLoginSteps = new AdminLogin_StepsClass();
	let AdminLoginPage = new AdminLogin_PageClass();

	it('Open login and fill form & submit', async () => {
		await AdminLoginSteps.go_to_login();
		await browser.pause(1000);
		await AdminLoginSteps.fill_form();
		await browser.pause(1000);
		await AdminLoginSteps.submit_form();
		await browser.pause(5000);
		await expect(AdminLoginPage.menu_link).toBeExisting();
	});
});
