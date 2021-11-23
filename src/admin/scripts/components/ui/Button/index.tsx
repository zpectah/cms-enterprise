import React, { forwardRef } from 'react';
import { default as MuiButton, ButtonProps } from '@mui/material/Button';

import { getElTestAttr } from '../../../utils/tests';

export interface ButtonBaseProps {
	dataTestId?: string;
}

const Button = forwardRef((props: ButtonBaseProps & ButtonProps, ref) => {
	const { dataTestId = 'button.default', ...rest } = props;

	return <MuiButton {...rest} {...getElTestAttr(dataTestId)} />;
});

export default Button;
