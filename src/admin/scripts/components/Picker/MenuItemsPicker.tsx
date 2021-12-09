import React from 'react';

import { useMenuItems } from '../../hooks/model';
import PickerBase, { PickerBaseInitialProps } from './PickerBase';

interface MenuItemsPickerProps {
	ignored?: any[];
}

const MenuItemsPicker = (
	props: MenuItemsPickerProps & PickerBaseInitialProps,
) => {
	const { responsiveWidth, dataTestId, ignored = [], ...rest } = props;
	const { MenuItems } = useMenuItems();

	const getOptionsList = () => {
		let options = [];
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
