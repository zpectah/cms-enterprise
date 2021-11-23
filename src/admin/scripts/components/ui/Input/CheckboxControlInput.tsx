import React from 'react';
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';
import FormControlLabel, {
	FormControlLabelProps,
} from '@mui/material/FormControlLabel';
import styled from 'styled-components';

import { getElTestAttr } from '../../../utils/tests';

const StyledLabel = styled(FormControlLabel)``;

interface CheckboxControlInputProps {
	dataTestId?: string;
	label?: string;
	labelProps?: FormControlLabelProps;
}

const CheckboxControlInput = (
	props: CheckboxControlInputProps & CheckboxProps,
) => {
	const {
		dataTestId = 'checkbox-control.input.default',
		label = '',
		labelProps,
		...rest
	} = props;

	return (
		<StyledLabel
			control={<Checkbox {...rest} {...getElTestAttr(dataTestId)} />}
			label={label}
			{...labelProps}
		/>
	);
};

export default CheckboxControlInput;
