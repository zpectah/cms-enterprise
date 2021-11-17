import React from 'react';

import { useSettings } from '../../hooks/common';
import SettingsForm from './SettingsForm';

interface SettingsModuleProps {}

const SettingsModule = ({}: SettingsModuleProps) => {
	const { Settings } = useSettings();

	const formSubmitHandler = (data: any, e: any) => {
		console.log('formSubmitHandler', data);
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
