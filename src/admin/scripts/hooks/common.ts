import useSWR, { mutate } from 'swr';

import { get, post, postRaw } from '../utils/api';

export function useSystem() {
	return {};
}

export function useProfile() {
	return {
		Profile: {},
		profile_loading: false,
		profile_error: false,
		reloadProfile: () => {},
		updateProfile: (data: any) => {
			console.log(`update `, data);
		},
		userLogin: (data: any) => {
			console.log(`userLogin `, data);
		},
		userLostPassword: (data: any) => {
			console.log(`userLostPassword `, data);
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

export function useToasts() {
	return {};
}
