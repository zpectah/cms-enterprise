import { ErrorInfo } from 'react';

import config from '../config';

class LogsService {
	init(): void {}

	create(error: Error, errorInfo: ErrorInfo, desc?: string): void {
		console.log('Error ', desc, error, errorInfo);

		// async api request for create log
	}
}

export default new LogsService();
