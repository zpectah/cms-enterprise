import React from 'react';
import Switch, { SwitchProps } from '@mui/material/Switch';
import FormControlLabel, {
	FormControlLabelProps,
} from '@mui/material/FormControlLabel';
import styled from 'styled-components';

import { getElTestAttr } from '../../../utils/tests';

const StyledLabel = styled(FormControlLabel)`
	.MuiFormControlLabel-label {
		padding-left: calc(${(props) => props.theme.spacer} / 2);
	}
`;

interface SwitchControlInputProps {
	dataTestId?: string;
	label?: string;
	labelProps?: FormControlLabelProps;
}

const SwitchControlInput = (props: SwitchControlInputProps & SwitchProps) => {
	const {
		dataTestId = 'switch-control.input.default',
		label = '',
		labelProps,
		...rest
	} = props;

	return (
		<StyledLabel
			control={<Switch size="small" {...rest} {...getElTestAttr(dataTestId)} />}
			label={label}
			{...labelProps}
		/>
	);
};

export default SwitchControlInput;
