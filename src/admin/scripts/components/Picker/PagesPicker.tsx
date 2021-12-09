import React from 'react';
import { useTranslation } from 'react-i18next';

import { usePages } from '../../hooks/model';
import PickerBase, { PickerBaseInitialProps } from './PickerBase';

interface PagesPickerProps {
	ignored?: any[];
}

const PagesPicker = (props: PagesPickerProps & PickerBaseInitialProps) => {
	const { responsiveWidth, dataTestId, ignored = [], ...rest } = props;
	const { t } = useTranslation(['common', 'form']);
	const { Pages } = usePages();

	const getOptionsList = () => {
		let options = [];
		if (!props.multiple)
			options.push({
				label: t('form:label.no_selected'),
				value: '0',
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
