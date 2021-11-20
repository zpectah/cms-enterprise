import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectProps } from '@mui/material/Select';
import styled from 'styled-components';

import media from '../../../styles/responsive';
import { getElTestAttr } from '../../../utils/tests';

const StyledInput = styled(Select)<{ responsive: string }>`
	width: 100%;

	${media.min.md} {
		width: ${(props) => (props.responsive ? props.responsive : '100%')};
	}
`;

interface SelectInputProps {
	dataAppId?: string;
	options: { label: string; value: string | number }[];
	responsiveWidth?: string;
}

const SelectInput = (props: SelectInputProps & SelectProps) => {
	const {
		dataAppId = 'select.input.default',
		options = [],
		responsiveWidth,
		label,
		labelId,
		size = 'small',
		...rest
	} = props;

	return (
		<FormControl fullWidth size={size}>
			{label && <InputLabel id={labelId}>{label}</InputLabel>}
			<StyledInput
				labelId={labelId}
				label={label}
				variant="outlined"
				size={size}
				{...rest}
				responsive={responsiveWidth}
				{...getElTestAttr(dataAppId)}
			>
				{options.map((option) => (
					<MenuItem
						key={option.label}
						value={option.value}
						{...getElTestAttr(`${dataAppId}.item.${option.value}`)}
					>
						{option.label}
					</MenuItem>
				))}
			</StyledInput>
		</FormControl>
	);
};

export default SelectInput;
