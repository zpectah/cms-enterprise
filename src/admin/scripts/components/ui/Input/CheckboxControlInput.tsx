import React from 'react';
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';
import FormControlLabel, {
	FormControlLabelProps,
} from '@mui/material/FormControlLabel';

import { getElTestAttr } from '../../../utils/tests';

interface CheckboxControlInputProps {
	dataTestId?: string;
	checkboxProps?: CheckboxProps;
}

const CheckboxControlInput = (
	props: CheckboxControlInputProps & FormControlLabelProps,
) => {
	const {
		dataTestId = 'checkbox-control.input.default',
		checkboxProps,
		...rest
	} = props;

	return (
		<FormControlLabel
			{...rest}
			control={<Checkbox {...checkboxProps} {...getElTestAttr(dataTestId)} />}
		/>
	);
};

export default CheckboxControlInput;
