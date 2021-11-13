import { storage } from '../../../../utils/utils';
import config from '../config';

class ThemeService {
	init(): void {
		document.querySelector(':root').setAttribute('theme', this.get());
		storage.set(config.project.keys.theme, this.get());
	}

	get(): string {
		return storage.get(config.project.keys.theme) || 'default';
	}

	set(theme): void {
		document.querySelector(':root').setAttribute('theme', theme);
		storage.set(config.project.keys.theme, theme);
	}
}

export default new ThemeService();
