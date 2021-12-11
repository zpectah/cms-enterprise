import React from 'react';

import { usePayments } from '../../hooks/model';
import PickerBase, { PickerBaseInitialProps } from './PickerBase';

interface PaymentsPickerProps {
	ignored?: any[];
}

const PaymentsPicker = (
	props: PaymentsPickerProps & PickerBaseInitialProps,
) => {
	const { responsiveWidth, dataTestId, ignored = [], ...rest } = props;
	const { Payments, payments_loading } = usePayments();

	const getOptionsList = () => {
		let options = [];
		Payments?.map((item) => {
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
			dataTestId={`PaymentsPicker.${dataTestId}`}
			responsiveWidth={responsiveWidth}
			loading={payments_loading}
			{...rest}
		/>
	);
};

export default PaymentsPicker;
