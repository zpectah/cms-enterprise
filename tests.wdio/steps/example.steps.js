import { expect } from 'chai';

import PageClass from '../pages/page';
import ExamplePageClass from '../pages/example.page';

export default class ExampleStepsClass {
	constructor(selectedBrowsers) {
		this.ExampleClass = new ExamplePageClass(selectedBrowsers);
		this.Page = new PageClass(selectedBrowsers);
	}

	go_to_login() {
		this.ExampleClass.openAdmin();
	}
}
