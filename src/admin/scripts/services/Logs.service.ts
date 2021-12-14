import { ErrorInfo } from 'react';
import { post } from '../utils/api';

import config from '../config';

class LogsService {
	init(): void {}

	create(data: { method: string; status: string; content?: string }) {
		return post(`${config.project.api.base}/create_log`, data).then(
			(response) => {
				return response;
			},
		);
	}
}

export default new LogsService();
