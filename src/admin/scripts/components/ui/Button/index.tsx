import React, { forwardRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { default as MuiButton, ButtonProps } from '@mui/material/Button';

import { getElTestAttr } from '../../../utils/tests';

export interface ButtonBaseProps extends ButtonProps {
	dataAppId?: string;
	to?: string;
}

const Button = forwardRef((props: ButtonBaseProps, ref) => {
	const { dataAppId = 'button.default', to, onClick, ...rest } = props;
	const his = useHistory();

	const onClickHandler = (e) => {
		if (to) {
			his.push(to);
		} else if (onClick) {
			onClick(e);
		}
	};

	return (
		<MuiButton
			onClick={onClickHandler}
			{...rest}
			{...getElTestAttr(dataAppId)}
		/>
	);
});

export default Button;
