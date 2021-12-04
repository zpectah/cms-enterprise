import ExamplePageClass from '../pages/example.page';
import { ExampleStepsClass } from '../steps/example.steps';

describe('Example test', () => {
	let exampleSteps;

	before('', () => {
		exampleSteps = new ExampleStepsClass();
	});

	it('Open admin page, open menu and click', async () => {
		exampleSteps.go_to_login();
		/*
		await ExamplePageClass.openAdmin();

		// wait ...
		browser.pause(2500);

		await ExamplePageClass.menuToggle.waitForClickable();
		await ExamplePageClass.menuToggle.click();

		// wait ...
		browser.pause(2500);

		await ExamplePageClass.menuLink.waitForClickable();
		await ExamplePageClass.menuLink.click();

		// wait ...
		browser.pause(2500);

		*/

		await expect(ExamplePageClass.menuLink).toBeExisting();
	});
});
