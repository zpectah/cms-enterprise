import React from 'react';
import { useTranslation } from 'react-i18next';

import { useMenuItems } from '../../hooks/model';
import PickerBase from './PickerBase';

interface MenuItemsPickerProps {
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

const MenuItemsPicker = (props: MenuItemsPickerProps) => {
	const { responsiveWidth, dataTestId, ignored = [], ...rest } = props;
	const { t } = useTranslation(['common', 'form']);
	const { MenuItems } = useMenuItems();

	const getOptionsList = () => {
		let options = [];
		if (!props.multiple)
			options.push({
				label: t('form:label.no_selected'),
				value: '',
				disabled: false,
			});

		MenuItems?.map((item) => {
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
			dataTestId={`MenuItemsPicker.${dataTestId}`}
			responsiveWidth={responsiveWidth}
			{...rest}
		/>
	);
};

export default MenuItemsPicker;
