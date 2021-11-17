import React, { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { getElTestAttr } from '../../utils/tests';

interface ModuleLanguageToggleProps {
	language: string;
	languageList: string[];
	onChange: (lang: string) => void;
	style?: {};
}

const ModuleLanguageToggle = ({
	language,
	languageList,
	onChange,
	style,
}: ModuleLanguageToggleProps) => {
	const [lang, setLang] = useState<string>(language);

	const changeHandler = (
		event: React.MouseEvent<HTMLElement, MouseEvent>,
		value: string | null,
	) => {
		setLang(value);
		onChange(value);
	};

	return (
		<ToggleButtonGroup
			value={lang}
			exclusive
			onChange={changeHandler}
			aria-label="module-language-toggle"
			size="small"
			style={style}
		>
			{languageList.map((lng) => (
				<ToggleButton
					key={lng}
					value={lng}
					aria-label={lng}
					{...getElTestAttr(`button.languageToggle.${lng}`)}
				>
					{lng}
				</ToggleButton>
			))}
		</ToggleButtonGroup>
	);
};

export default ModuleLanguageToggle;
