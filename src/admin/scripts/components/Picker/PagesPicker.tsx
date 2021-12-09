import React from 'react';

import { usePages } from '../../hooks/model';
import PickerBase, { PickerBaseInitialProps } from './PickerBase';

interface PagesPickerProps {
	ignored?: any[];
}

const PagesPicker = (props: PagesPickerProps & PickerBaseInitialProps) => {
	const { responsiveWidth, dataTestId, ignored = [], ...rest } = props;
	const { Pages } = usePages();

	const getOptionsList = () => {
		let options = [];
		Pages?.map((item) => {
			options.push({
				label: item.name,
				value: item.id as string,
				disabled: ignored.includes(item.id) || item.type == 'system',
			});
		});

		return options;
	};

	return (
		<PickerBase
			items={getOptionsList()}
			dataTestId={`PagesPicker.${dataTestId}`}
			responsiveWidth={responsiveWidth}
			{...rest}
		/>
	);
};

export default PagesPicker;
