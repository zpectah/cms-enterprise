import React from 'react';

import { useDeliveries } from '../../hooks/model';
import PickerBase, { PickerBaseInitialProps } from './PickerBase';

interface DeliveriesPickerProps {
	ignored?: any[];
}

const DeliveriesPicker = (
	props: DeliveriesPickerProps & PickerBaseInitialProps,
) => {
	const { responsiveWidth, dataTestId, ignored = [], ...rest } = props;
	const { Deliveries, deliveries_loading } = useDeliveries();

	const getOptionsList = () => {
		let options = [];
		Deliveries?.map((item) => {
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
			dataTestId={`DeliveriesPicker.${dataTestId}`}
			responsiveWidth={responsiveWidth}
			loading={deliveries_loading}
			{...rest}
		/>
	);
};

export default DeliveriesPicker;
