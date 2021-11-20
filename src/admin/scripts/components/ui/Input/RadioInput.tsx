import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup, { RadioGroupProps } from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { getElTestAttr } from '../../../utils/tests';

interface RadioInputProps {
	dataAppId?: string;
	options: { label: string; value: string | number }[];
	label?: string;
}

const RadioInput = (props: RadioInputProps & RadioGroupProps) => {
	const {
		dataAppId = 'radio.input.default',
		options = [],
		label,
		...rest
	} = props;

	return (
		<FormControl component="fieldset">
			{label && <FormLabel component="legend">{label}</FormLabel>}
			<RadioGroup {...rest} {...getElTestAttr(dataAppId)}>
				{options.map((option) => (
					<FormControlLabel
						key={option.value}
						value={option.value}
						control={
							<Radio {...getElTestAttr(`${dataAppId}.item.${option.value}`)} />
						}
						label={option.label}
					/>
				))}
			</RadioGroup>
		</FormControl>
	);
};

export default RadioInput;
