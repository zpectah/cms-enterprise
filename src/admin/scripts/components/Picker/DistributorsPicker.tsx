import React from 'react';

import { useDistributors } from '../../hooks/model';
import PickerBase, { PickerBaseInitialProps } from './PickerBase';

interface DistributorsPickerProps {
	ignored?: any[];
}

const DistributorsPicker = (
	props: DistributorsPickerProps & PickerBaseInitialProps,
) => {
	const { responsiveWidth, dataTestId, ignored = [], ...rest } = props;
	const { Distributors } = useDistributors();

	const getOptionsList = () => {
		let options = [];
		Distributors?.map((item) => {
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
			dataTestId={`DistributorsPicker.${dataTestId}`}
			responsiveWidth={responsiveWidth}
			{...rest}
		/>
	);
};

export default DistributorsPicker;
