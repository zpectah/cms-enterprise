import React from 'react';
import { useTranslation } from 'react-i18next';

import { useCategories } from '../../hooks/model';
import PickerBase from './PickerBase';

interface CategoriesPickerProps {
	value: any;
	onChange: () => void;
	responsiveWidth?: string;
	dataTestId?: string;
	name?: string;
	id?: string;
	label?: string;
	ignored?: any[];
}

const CategoriesPicker = ({
	value,
	onChange,
	responsiveWidth,
	dataTestId,
	name,
	id,
	label,
	ignored = [],
}: CategoriesPickerProps) => {
	const { t } = useTranslation(['common', 'form']);
	const { Categories } = useCategories();

	const getOptionsList = () => {
		let options = [
			{
				label: t('form:label.no_parent'),
				value: '',
				disabled: false,
			},
		];

		Categories?.map((item) => {
			options.push({
				label: item.name,
				value: item.id as string,
				disabled: ignored.includes(item.id),
			});
		});

		return options;
	};

	return (
		<PickerBase
			items={getOptionsList()}
			value={value}
			onChange={onChange}
			responsiveWidth={responsiveWidth}
			dataTestId={`CategoriesPicker.${dataTestId}`}
			name={name}
			id={id}
			label={label}
		/>
	);
};

export default CategoriesPicker;
