import React from 'react';
import Switch, { SwitchProps } from '@mui/material/Switch';

import { getElTestAttr } from '../../../utils/tests';

interface SwitchInputProps {
	dataTestId?: string;
	label?: string;
}

const SwitchInput = (props: SwitchInputProps & SwitchProps) => {
	const { dataTestId = 'switch.input.default', label, ...rest } = props;

	return <Switch size="small" {...rest} {...getElTestAttr(dataTestId)} />;
};

export default SwitchInput;
