import React from 'react';

import { useProducers } from '../../hooks/model';
import PickerBase, { PickerBaseInitialProps } from './PickerBase';

interface ProducersPickerProps {
	ignored?: any[];
}

const ProducersPicker = (
	props: ProducersPickerProps & PickerBaseInitialProps,
) => {
	const { responsiveWidth, dataTestId, ignored = [], ...rest } = props;
	const { Producers } = useProducers();

	const getOptionsList = () => {
		let options = [];
		Producers?.map((item) => {
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
			dataTestId={`ProducersPicker.${dataTestId}`}
			responsiveWidth={responsiveWidth}
			{...rest}
		/>
	);
};

export default ProducersPicker;
