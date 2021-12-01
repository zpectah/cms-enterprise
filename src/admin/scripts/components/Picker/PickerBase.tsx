import React from 'react';

import { Input, Preloader } from '../ui';

export interface PickerBaseProps {
	items: { label: string; value: any; disabled?: boolean }[];
	value: any;
	onChange: () => void;
	responsiveWidth?: string;
	dataTestId?: string;
	multiple?: boolean;
	name?: string;
	id?: string;
	label?: string;
}

const PickerBase = ({
	items,
	value,
	onChange,
	responsiveWidth,
	dataTestId,
	multiple = false,
	name,
	id,
	label,
}: PickerBaseProps) => {
	return (
		<>
			{items ? (
				<Input.Select
					options={items}
					value={value}
					onChange={onChange}
					responsiveWidth={responsiveWidth}
					dataTestId={dataTestId}
					multiple={multiple}
					name={name}
					id={id}
					label={label}
				/>
			) : (
				<Preloader.Block />
			)}
		</>
	);
};

export default PickerBase;
