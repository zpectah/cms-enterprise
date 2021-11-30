import { ErrorInfo } from 'react';
import { post } from '../utils/api';

import config from '../config';

class LogsService {
	init(): void {}

	create(data: { user: string; method: string; status: string }) {
		return post(`api/create_log`, data).then((response) => {
			console.log('log created', response);
		});
	}
}

export default new LogsService();
