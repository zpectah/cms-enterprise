import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

import { TOASTS_TIMEOUT_DEFAULT } from '../../constants';
import { useSettings } from '../../hooks/common';
import { cmsSettingsObjectProps } from '../../types/modules';
import SettingsForm from './SettingsForm';
import { useToasts } from '../../hooks/common';
import { Preloader } from '../../components/ui';

interface SettingsModuleProps {}

const SettingsModule = ({}: SettingsModuleProps) => {
	const { t } = useTranslation(['common', 'messages', 'form']);
	const dispatch = useDispatch();
	const { createToasts } = useToasts(dispatch);
	const {
		Settings,
		updateSettings,
		reloadSettings,
		settings_loading,
		settings_error,
	} = useSettings();
	const [processing, setProcessing] = useState<boolean>(false);

	const formSubmitHandler = (data: any, e: any) => {
		const master: cmsSettingsObjectProps = _.cloneDeep(data);
		setProcessing(true);
		updateSettings(master).then((response) => {
			reloadSettings();
			createToasts({
				title: t('messages:success.newSettingsUpdated'),
				context: 'success',
				timeout: TOASTS_TIMEOUT_DEFAULT,
			});
			setProcessing(false);
		});
	};

	const formSubmitErrorHandler = (error: any, e: any) => console.warn(error, e);

	return (
		<>
			{Settings ? (
				<SettingsForm
					formData={Settings}
					onSubmit={formSubmitHandler}
					onSubmitError={formSubmitErrorHandler}
					languageList={Settings.language_active}
					languageDefault={Settings.language_default}
					afterLanguageInstall={(installed) => reloadSettings()}
					afterModuleInstall={() => reloadSettings()}
				/>
			) : (
				<Preloader.Block />
			)}
			<Preloader.Bar isProcessing={processing || settings_loading} />
		</>
	);
};

export default SettingsModule;
