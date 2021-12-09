import React from 'react';

import { Input, Preloader } from '../ui';

export interface PickerBaseInitialProps {
	value: any;
	onChange: () => void;
	responsiveWidth?: string;
	dataTestId?: string;
	multiple?: boolean;
	name?: string;
	id?: string;
	label?: string;
	required?: boolean;
	disabled?: boolean;
}
interface PickerBaseProps extends PickerBaseInitialProps {
	items: { label: string; value: any; disabled?: boolean }[];
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
	required,
	disabled,
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
					required={required}
					disabled={disabled || items.length == 0}
				/>
			) : (
				<Preloader.Block />
			)}
		</>
	);
};

export default PickerBase;
