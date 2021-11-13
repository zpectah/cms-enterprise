import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import CFG from '../config';
import LanguageService from '../services/Language.service';
import resources from './resources';

i18n.use(initReactI18next).init({
	resources,
	defaultNS: 'common',
	lng: LanguageService.get(),
	fallbackLng: CFG.project.admin.language.list,
	react: {
		bindI18n: 'languageChanged',
		useSuspense: true,
	},
});

export default i18n;
