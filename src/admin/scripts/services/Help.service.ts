import { storage } from '../../../../utils/utils';
import config from '../config';

class HelpService {
	init(): void {
		storage.set(config.project.keys.help, this.get());
	}

	get(): string {
		return storage.get(config.project.keys.help) || 'true';
	}

	set(value): void {
		storage.set(config.project.keys.help, value);
	}
}

export default new HelpService();
