import useSWR, { mutate } from 'swr';

import config from '../config';
import { UsersItemProps } from '../types/model';
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
		profile_loading: !data && !error,
		profile_error: error,
		reloadProfile: () => mutate(`${api_path_prefix}/get_user_profile`),
		updateProfile: (data: UsersItemProps) =>
			post('/api/update_user_profile', data),
		userLogin: (data: { email: string; password: string }) =>
			post('/api/user_login', data),
		userLogout: () => post('/api/user_logout', {}),
		userLostPassword: (data: { email: string }) =>
			post('/api/user_lost_password', data),
		userLostPasswordReset: (data: { token: string }) =>
			post('/api/user_lost_password_reset', data),
		userShouldDisplay: (level: number) => {
			const userLevel = data?.data?.user_level;

			return Number(userLevel) >= Number(level);
		},
	};
}

export function useSettings() {
	return {
		Settings: {
			language_default: 'en',
			language_installed: ['en', 'cs'],
			language_active: ['en', 'cs'],
		},
		settings_loading: false,
		settings_error: false,
		reloadSettings: () => {},
		updateSettings: (data: any) => {
			console.log(`update `, data);
		},
	};
}

export function useToasts(dispatch) {
	return {
		createToasts: (data: any) => dispatch(addToast(data)),
	};
}
