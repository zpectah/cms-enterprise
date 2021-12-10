import useSWR, { mutate } from 'swr';

import config from '../config';
import { UsersItemProps } from '../types/model';
import { cmsSettingsObjectProps } from '../types/modules';
import { addToast } from '../store/actions';
import { get, post, postRaw } from '../utils/api';

export function useSystem() {
	return {
		createLog: (data: any) =>
			post(`${config.project.api.base}/create_log`, data),
		getLogList: (data: any) =>
			post(`${config.project.api.base}/get_log_list`, data),
		installLanguage: (data: any) =>
			post(`${config.project.api.base}/install_language`, data),
		installModule: (data: any) =>
			post(`${config.project.api.base}/install_module`, data),
		repairLanguageTables: (data: any) =>
			post(`${config.project.api.base}/repair_language_tables`, data),
		exportSqlDump: (data: any) =>
			postRaw(`${config.project.api.base}/export_table_dump`, data),
		importSqlDump: (data: any) =>
			post(`${config.project.api.base}/import_table_data`, data),
	};
}

export function useProfile() {
	const { data, error } = useSWR(
		`${config.project.api.base}/get_user_profile`,
		get,
	);
	const data_loading = !(!(!data && data == null) && !error);

	return {
		Profile: data as UsersItemProps,
		profile_loading: data_loading,
		profile_error: error,
		reloadProfile: () => mutate(`${config.project.api.base}/get_user_profile`),
		updateProfile: (data: UsersItemProps) =>
			post(`${config.project.api.base}/update_user_profile`, data),
		userLogin: (data: { email: string; password: string }) =>
			post(`${config.project.api.base}/user_login`, data),
		userLogout: () => post(`${config.project.api.base}/user_logout`, {}),
		userLostPassword: (data: { email: string }) =>
			post(`${config.project.api.base}/user_lost_password`, data),
		userLostPasswordReset: (data: { token: string }) =>
			post(`${config.project.api.base}/user_lost_password_reset`, data),
		userCreateNewPassword: (data: { password: string; token: string }) =>
			post(`${config.project.api.base}/user_create_new_password`, data),
		userShouldDisplay: (level: number) =>
			Number(data?.user_level) >= Number(level),
	};
}

export function useSettings() {
	const { data, error } = useSWR(
		`${config.project.api.base}/get_cms_settings`,
		get,
	);
	const data_loading = !(!(!data && data == null) && !error);

	return {
		Settings: data as cmsSettingsObjectProps,
		settings_loading: data_loading,
		settings_error: error,
		reloadSettings: () => mutate(`${config.project.api.base}/get_cms_settings`),
		updateSettings: (data: cmsSettingsObjectProps) =>
			post(`${config.project.api.base}/update_cms_settings`, data),
	};
}

export function useToasts(dispatch) {
	return {
		createToasts: (data: any) => dispatch(addToast(data)),
	};
}
