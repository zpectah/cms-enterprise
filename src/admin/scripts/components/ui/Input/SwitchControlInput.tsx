import React from 'react';
import Switch, { SwitchProps } from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
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
}

const SwitchControlInput = (props: SwitchControlInputProps & SwitchProps) => {
	const { dataTestId = 'switch.input.default', label = '', ...rest } = props;

	return (
		<StyledLabel
			control={<Switch size="small" {...rest} {...getElTestAttr(dataTestId)} />}
			label={label}
		/>
	);
};

export default SwitchControlInput;
