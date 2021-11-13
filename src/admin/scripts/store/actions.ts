import { SIDEBAR_TOGGLE, THEME_TOGGLE, HELP_TOGGLE } from './types';

export function sidebarToggle(payload) {
	return { type: SIDEBAR_TOGGLE, payload };
}

export function themeToggle(payload) {
	return { type: THEME_TOGGLE, payload };
}

export function helpToggle(payload) {
	return { type: HELP_TOGGLE, payload };
}
