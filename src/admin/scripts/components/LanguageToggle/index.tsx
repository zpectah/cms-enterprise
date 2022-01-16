import React from 'react';
import i18n from 'i18next';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import config from '../../config';
import LanguageService from '../../services/Language.service';

const LanguageToggle = () => {
	const lang_list = config.project.admin.language.list;
	const lang_current = i18n.language;
	const changeLanguageHandler = (lang: string) => {
		i18n.changeLanguage(lang).then(() => LanguageService.set(lang));
	};

	return (
		<ButtonGroup
			variant="outlined"
			aria-label="outlined button group"
			size="small"
		>
			{lang_list.map((lang) => (
				<Button
					key={lang}
					onClick={() => changeLanguageHandler(lang)}
					variant={lang === lang_current ? 'contained' : 'outlined'}
					color="secondary"
				>
					{lang}
				</Button>
			))}
		</ButtonGroup>
	);
};

export default LanguageToggle;
