import Page from './page';

class ExamplePage extends Page {
	get menuToggle() {
		return $('[data-app-id="toggle.sidebar"]');
	}

	get menuLink() {
		return $('[data-app-id="navbar.primary.item.Posts"]');
	}

	openAdmin() {
		return super.openUrl('http://cms2022/admin');
	}
}

export default new ExamplePage();
