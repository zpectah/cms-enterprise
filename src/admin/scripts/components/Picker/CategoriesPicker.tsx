import React from 'react';
import { useTranslation } from 'react-i18next';

import { useCategories } from '../../hooks/model';
import PickerBase, { PickerBaseInitialProps } from './PickerBase';

interface CategoriesPickerProps {
	ignored?: any[];
	forModel?: 'posts' | 'products' | 'all';
	showLabelWithType?: boolean;
}

const CategoriesPicker = (
	props: CategoriesPickerProps & PickerBaseInitialProps,
) => {
	const {
		responsiveWidth,
		dataTestId,
		ignored = [],
		forModel = 'all',
		showLabelWithType,
		...rest
	} = props;
	const { t } = useTranslation(['types']);
	const { Categories } = useCategories();

	const getOptionsList = () => {
		let options = [];
		Categories?.map((item) => {
			if (forModel == 'all' || forModel == item.type) {
				options.push({
					label: `${item.name} ${
						showLabelWithType && '[' + t('types:' + item.type) + ']'
					}`,
					value: item.id as string,
					disabled: ignored.includes(item.id),
				});
			}
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
