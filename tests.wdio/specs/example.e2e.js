import ExamplePage from '../pages/example.page';

describe('Example test', () => {
	it('Open admin page, open menu and click', async () => {
		await ExamplePage.openAdmin();

		// wait ...
		browser.pause(2500);

		await ExamplePage.menuToggle.waitForClickable();
		await ExamplePage.menuToggle.click();

		// wait ...
		browser.pause(2500);

		await ExamplePage.menuLink.waitForClickable();
		await ExamplePage.menuLink.click();

		// wait ...
		browser.pause(2500);

		await expect(ExamplePage.menuLink).toBeExisting();
	});
});
