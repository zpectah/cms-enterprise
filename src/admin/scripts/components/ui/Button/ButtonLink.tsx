import React, { forwardRef } from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import { useHistory } from 'react-router-dom';

import { getElTestAttr } from '../../../utils/tests';

export interface LinkButtonProps {
	to?: string;
	href?: string;
	dataTestId?: string;
}

const ButtonLink = forwardRef((props: LinkButtonProps & ButtonProps, ref) => {
	const { dataTestId = 'button.link', to, href, ...rest } = props;

	const history = useHistory();

	const onClickHandler = (e) => {
		e.preventDefault();

		if (to) {
			history.push(to);
		} else if (href) {
			window.location.href = href;
		} else {
			props.onClick(e);
		}
	};

	return (
		<Button onClick={onClickHandler} {...rest} {...getElTestAttr(dataTestId)} />
	);
});

export default ButtonLink;
