import React from 'react';
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';

import { getElTestAttr } from '../../../utils/tests';

interface CheckboxInputProps {
	dataTestId?: string;
}

const CheckboxInput = (props: CheckboxInputProps & CheckboxProps) => {
	const { dataTestId = 'checkbox.input.default', ...rest } = props;

	return <Checkbox {...rest} {...getElTestAttr(dataTestId)} />;
};

export default CheckboxInput;
