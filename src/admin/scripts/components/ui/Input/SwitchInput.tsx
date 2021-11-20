import React from 'react';
import Switch, { SwitchProps } from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

import { getElTestAttr } from '../../../utils/tests';

interface SwitchInputProps {
	dataAppId?: string;
	label?: string;
}

const SwitchInput = (props: SwitchInputProps & SwitchProps) => {
	const { dataAppId = 'switch.input.default', label, ...rest } = props;

	return (
		<FormControlLabel
			control={<Switch size="small" {...rest} {...getElTestAttr(dataAppId)} />}
			label={label}
		/>
	);
};

export default SwitchInput;
