import useSWR, { mutate } from 'swr';

import config from '../config';
import { UsersItemProps } from '../types/model';
import { cmsSettingsObjectProps } from '../types/cms_settings';
import { addToast } from '../store/actions';
import { get, post, postRaw } from '../utils/api';

const api_path_prefix = config.project.api.base;

export function useSystem() {
	return {
		installLanguage: (data: any) =>
			post(`${api_path_prefix}/install_language`, data),
		installModule: (data: any) =>
			post(`${api_path_prefix}/install_module`, data),
		repairLanguageTables: (data: any) =>
			post(`${api_path_prefix}/repair_language_tables`, data),
		exportSqlDump: (data: any) =>
			postRaw(`${api_path_prefix}/export_table_dump`, data),
		importSqlDump: (data: any) =>
			post(`${api_path_prefix}/import_table_data`, data),
	};
}

export function useProfile() {
	const { data, error } = useSWR(`${api_path_prefix}/get_user_profile`, get);

	return {
		Profile: data as UsersItemProps,
		profile_loading: (!data || false) && !error,
		profile_error: error,
		reloadProfile: () => mutate(`${api_path_prefix}/get_user_profile`),
		updateProfile: (data: UsersItemProps) =>
			post(`${api_path_prefix}/update_user_profile`, data),
		userLogin: (data: { email: string; password: string }) =>
			post(`${api_path_prefix}/user_login`, data),
		userLogout: () => post(`${api_path_prefix}/user_logout`, {}),
		userLostPassword: (data: { email: string }) =>
			post(`${api_path_prefix}/user_lost_password`, data),
		userLostPasswordReset: (data: { token: string }) =>
			post(`${api_path_prefix}/user_lost_password_reset`, data),
		userCreateNewPassword: (data: { password: string; token: string }) =>
			post(`${api_path_prefix}/user_create_new_password`, data),
		userShouldDisplay: (level: number) =>
			Number(data?.user_level) >= Number(level),
	};
}

export function useSettings() {
	const { data, error } = useSWR(`${api_path_prefix}/get_cms_settings`, get);

	return {
		Settings: data as cmsSettingsObjectProps,
		settings_loading: !data && !error,
		settings_error: error,
		reloadSettings: () => mutate(`${api_path_prefix}/get_cms_settings`),
		updateSettings: (data: cmsSettingsObjectProps) =>
			post(`${api_path_prefix}/update_cms_settings`, data),
	};
}

export function useToasts(dispatch) {
	return {
		createToasts: (data: any) => dispatch(addToast(data)),
	};
}
