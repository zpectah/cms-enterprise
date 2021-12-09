import React from 'react';
import { useTranslation } from 'react-i18next';

import { useProducts } from '../../hooks/model';
import PickerBase, { PickerBaseInitialProps } from './PickerBase';

interface ProductsPickerProps {
	ignored?: any[];
}

const ProductsPicker = (
	props: ProductsPickerProps & PickerBaseInitialProps,
) => {
	const { responsiveWidth, dataTestId, ignored = [], ...rest } = props;
	const { t } = useTranslation(['common', 'form']);
	const { Products } = useProducts();

	const getOptionsList = () => {
		let options = [];
		if (!props.multiple)
			options.push({
				label: t('form:label.no_selected'),
				value: '0',
				disabled: false,
			});

		Products?.map((item) => {
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
			dataTestId={`ProductsPicker.${dataTestId}`}
			responsiveWidth={responsiveWidth}
			{...rest}
		/>
	);
};

export default ProductsPicker;
