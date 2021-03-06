import { storage, string } from '../../../../utils/utils';
import CFG from '../config';
import LangService from '../services/Language.service';
import ThemeService from '../services/Theme.service';
import UiStoreState from './store';
import {
	LANGUAGE_TOGGLE,
	SIDEBAR_TOGGLE,
	THEME_TOGGLE,
	ADD_TOAST,
	REMOVE_TOAST,
} from './types';

function Reducer(state = UiStoreState, action) {
	let newToast;

	switch (action.type) {
		case LANGUAGE_TOGGLE:
			LangService.set(action.payload);
			return Object.assign({}, state, {
				language: action.payload,
			});

		case THEME_TOGGLE:
			ThemeService.set(action.payload);
			return Object.assign({}, state, {
				theme: action.payload,
			});

		case SIDEBAR_TOGGLE:
			storage.set(CFG.project.keys.sidebar, action.payload);
			return Object.assign({}, state, {
				sideBarOpen: action.payload,
			});

		case ADD_TOAST:
			newToast = {
				id: string.getToken(3, ''),
				...action.payload,
			};
			return Object.assign({}, state, {
				toasts: [newToast, ...state.toasts],
			});

		case REMOVE_TOAST:
			return Object.assign({}, state, {
				toasts: state.toasts.filter((item) => {
					return item.id !== action.payload;
				}),
			});
	}

	return state;
}

export default Reducer;
