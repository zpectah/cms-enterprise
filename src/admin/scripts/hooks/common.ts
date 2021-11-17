import useSWR, { mutate } from 'swr';

import { get, post, postRaw } from '../utils/api';

export function useSystem() {
	return {};
}

export function useProfile() {
	return {};
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
