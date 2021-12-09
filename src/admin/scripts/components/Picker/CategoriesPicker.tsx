import React from 'react';
import { useTranslation } from 'react-i18next';

import { useCategories } from '../../hooks/model';
import PickerBase, { PickerBaseInitialProps } from './PickerBase';

interface CategoriesPickerProps {
	ignored?: any[];
}

const CategoriesPicker = (
	props: CategoriesPickerProps & PickerBaseInitialProps,
) => {
	const { responsiveWidth, dataTestId, ignored = [], ...rest } = props;
	const { t } = useTranslation(['common', 'form']);
	const { Categories } = useCategories();

	const getOptionsList = () => {
		let options = [];
		if (!props.multiple)
			options.push({
				label: t('form:label.no_selected'),
				value: '0',
				disabled: false,
			});

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
			dataTestId={`CategoriesPicker.${dataTestId}`}
			responsiveWidth={responsiveWidth}
			{...rest}
		/>
	);
};

export default CategoriesPicker;
