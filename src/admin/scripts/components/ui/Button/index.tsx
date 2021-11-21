import React, { forwardRef } from 'react';
import { default as MuiButton, ButtonProps } from '@mui/material/Button';

import { getElTestAttr } from '../../../utils/tests';

export interface ButtonBaseProps {
	dataAppId?: string;
}

const Button = forwardRef((props: ButtonBaseProps & ButtonProps, ref) => {
	const { dataAppId = 'button.default', ...rest } = props;

	return <MuiButton {...rest} {...getElTestAttr(dataAppId)} />;
});

export default Button;
