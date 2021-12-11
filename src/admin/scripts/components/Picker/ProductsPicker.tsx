import React from 'react';

import { useProducts } from '../../hooks/model';
import PickerBase, { PickerBaseInitialProps } from './PickerBase';

interface ProductsPickerProps {
	ignored?: any[];
}

const ProductsPicker = (
	props: ProductsPickerProps & PickerBaseInitialProps,
) => {
	const { responsiveWidth, dataTestId, ignored = [], ...rest } = props;
	const { Products, products_loading } = useProducts();

	const getOptionsList = () => {
		let options = [];
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
			loading={products_loading}
			{...rest}
		/>
	);
};

export default ProductsPicker;
