import React from 'react';

import { useTags } from '../../hooks/model';
import PickerBase, { PickerBaseInitialProps } from './PickerBase';

interface TagsPickerProps {
	ignored?: any[];
}

const TagsPicker = (props: TagsPickerProps & PickerBaseInitialProps) => {
	const { responsiveWidth, dataTestId, ignored = [], ...rest } = props;
	const { Tags } = useTags();

	const getOptionsList = () => {
		let options = [];
		Tags?.map((item) => {
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
			dataTestId={`TagsPicker.${dataTestId}`}
			responsiveWidth={responsiveWidth}
			{...rest}
		/>
	);
};

export default TagsPicker;
