import { SIDEBAR_TOGGLE, THEME_TOGGLE, ADD_TOAST, REMOVE_TOAST } from './types';

export function sidebarToggle(payload) {
	return { type: SIDEBAR_TOGGLE, payload };
}

export function themeToggle(payload) {
	return { type: THEME_TOGGLE, payload };
}

export function addToast(payload) {
	return { type: ADD_TOAST, payload };
}

export function removeToast(payload) {
	return { type: REMOVE_TOAST, payload };
}
