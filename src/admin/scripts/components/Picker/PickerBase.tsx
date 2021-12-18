import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { Input } from '../ui';

const NoListPlaceholder = styled.div<{ width: string }>`
	width: ${(props) => props.width};
	height: 37.15px;
	padding: 0 2rem;
	display: flex;
	align-items: center;
	justify-content: center;
	border: ${(props) => props.theme.picker.noItems.border};
	border-radius: ${(props) => props.theme.picker.noItems.radius};
`;

export interface PickerBaseInitialProps {
	value: any;
	onChange: (e: any) => void;
	responsiveWidth?: string;
	dataTestId?: string;
	multiple?: boolean;
	name?: string;
	id?: string;
	label?: string;
	placeholder?: string;
	required?: boolean;
	disabled?: boolean;
	loading?: boolean;
	style?: React.CSSProperties;
	disabledPlaceholder?: boolean;
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
	placeholder,
	required,
	disabled,
	loading,
	style,
	disabledPlaceholder,
}: PickerBaseProps) => {
	const { t } = useTranslation(['common', 'form']);
	const getOptionsList = () => {
		const placeholder = {
			label: t('form:label.no_selected'),
			value: '0',
			disabled: disabledPlaceholder,
		};

		return !multiple ? [placeholder, ...items] : items;
	};
	const options = getOptionsList();
	const showSelect = options.length > (!multiple ? 1 : 0);

	return (
		<>
			{loading && <Skeleton animation="wave" width={responsiveWidth} />}
			{showSelect ? (
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
					placeholder={placeholder}
					required={required}
					disabled={disabled || items.length == 0}
					style={style}
				/>
			) : (
				<NoListPlaceholder width={responsiveWidth} style={style}>
					No options
				</NoListPlaceholder>
			)}
		</>
	);
};

export default PickerBase;
