import React from 'react';

import { useStores } from '../../hooks/model';
import PickerBase, { PickerBaseInitialProps } from './PickerBase';

interface StoresPickerProps {
	ignored?: any[];
}

const StoresPicker = (props: StoresPickerProps & PickerBaseInitialProps) => {
	const { responsiveWidth, dataTestId, ignored = [], ...rest } = props;
	const { Stores, stores_loading } = useStores();

	const getOptionsList = () => {
		let options = [];
		Stores?.map((item) => {
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
			dataTestId={`StoresPicker.${dataTestId}`}
			responsiveWidth={responsiveWidth}
			loading={stores_loading}
			{...rest}
		/>
	);
};

export default StoresPicker;
