import { storage } from '../../../../utils/utils';
import config from '../config';

class LanguageService {
	init(): void {
		storage.set(config.project.keys.lang, this.get());
	}

	get(): string {
		return (
			storage.get(config.project.keys.lang) ||
			config.project.admin.language.default
		);
	}

	set(lang): void {
		storage.set(config.project.keys.lang, lang);
	}
}

export default new LanguageService();
