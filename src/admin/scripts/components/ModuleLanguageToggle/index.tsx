import React, { useState } from 'react';

import { Input } from '../ui';

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

	const getOptions = () => {
		let options = [];

		languageList.map((lang) => {
			options.push({
				label: lang,
				value: lang,
			});
		});

		return options;
	};

	return (
		<Input.Toggle
			value={lang}
			exclusive
			onChange={changeHandler}
			aria-label="module-language-toggle"
			size="small"
			style={style}
			options={getOptions()}
			dataTestId={`button.languageToggle`}
		/>
	);
};

export default ModuleLanguageToggle;
