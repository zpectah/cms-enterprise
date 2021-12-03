import React from 'react';
import { useTranslation } from 'react-i18next';

import { usePages } from '../../hooks/model';
import PickerBase from './PickerBase';

interface PagesPickerProps {
	value: any;
	onChange: () => void;
	responsiveWidth?: string;
	dataTestId?: string;
	name?: string;
	id?: string;
	label?: string;
	ignored?: any[];
	multiple?: boolean;
	required?: boolean;
}

const PagesPicker = (props: PagesPickerProps) => {
	const { responsiveWidth, dataTestId, ignored = [], ...rest } = props;
	const { t } = useTranslation(['common', 'form']);
	const { Pages } = usePages();

	const getOptionsList = () => {
		let options = [];
		if (!props.multiple)
			options.push({
				label: t('form:label.no_selected'),
				value: '',
				disabled: false,
			});

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
