import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import { useTranslation } from 'react-i18next';

import { Input } from '../ui';

export interface PickerBaseInitialProps {
	value: any;
	onChange: (e: any) => void;
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
	const { t } = useTranslation(['common', 'form']);
	const getOptionsList = () => {
		const placeholder = {
			label: t('form:label.no_selected'),
			value: '0',
			disabled: false,
		};

		return !multiple ? [placeholder, ...items] : items;
	};
	const options = getOptionsList();

	return (
		<>
			{options.length > (!multiple ? 1 : 0) ? (
				<Input.Select
					options={options}
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
				<Skeleton animation="wave" width={'50%'} />
			)}
		</>
	);
};

export default PickerBase;
