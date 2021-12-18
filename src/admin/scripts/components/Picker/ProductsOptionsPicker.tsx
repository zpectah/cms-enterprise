import React from 'react';

import { useProductsOptions } from '../../hooks/model';
import PickerBase, { PickerBaseInitialProps } from './PickerBase';

interface ProductsOptionsPickerProps {
	ignored?: any[];
}

const ProductsOptionsPicker = (
	props: ProductsOptionsPickerProps & PickerBaseInitialProps,
) => {
	const { responsiveWidth, dataTestId, ignored = [], ...rest } = props;
	const { ProductsOptions, productsOptions_loading } = useProductsOptions();

	const getOptionsList = () => {
		let options = [];
		ProductsOptions?.map((item) => {
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
			dataTestId={`ProductsOptionsPicker.${dataTestId}`}
			responsiveWidth={responsiveWidth}
			loading={productsOptions_loading}
			{...rest}
		/>
	);
};

export default ProductsOptionsPicker;
