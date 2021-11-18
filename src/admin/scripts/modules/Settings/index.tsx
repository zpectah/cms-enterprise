import React from 'react';
import { useDispatch } from 'react-redux';

import { ROUTES, ROUTE_SUFFIX, TOASTS_TIMEOUT_DEFAULT } from '../../constants';
import { useSettings } from '../../hooks/common';
import SettingsForm from './SettingsForm';
import { useToasts } from '../../hooks/common';

interface SettingsModuleProps {}

const SettingsModule = ({}: SettingsModuleProps) => {
	const dispatch = useDispatch();

	const { createToasts } = useToasts(dispatch);
	const { Settings } = useSettings();

	const formSubmitHandler = (data: any, e: any) => {
		console.log('formSubmitHandler', data);

		// createToasts({
		// 	title: t('messages:success.itemCreated'),
		// 	context: 'success',
		// 	timeout: TOASTS_TIMEOUT_DEFAULT,
		// });
	};

	const formSubmitErrorHandler = (error: any, e: any) => {
		console.log('formSubmitErrorHandler', error);
	};

	return (
		<>
			<SettingsForm
				formData={Settings}
				onSubmit={formSubmitHandler}
				onSubmitError={formSubmitErrorHandler}
				languageList={Settings.language_active}
				languageDefault={Settings.language_default}
			/>
		</>
	);
};

export default SettingsModule;
