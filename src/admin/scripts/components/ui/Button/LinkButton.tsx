import React, { forwardRef } from 'react';
import { useHistory } from 'react-router-dom';

import Button, { ButtonBaseProps } from './index';
import { getElTestAttr } from '../../../utils/tests';

export interface LinkButtonProps extends ButtonBaseProps {
	to?: string;
	href?: string;
}

const LinkButton = forwardRef((props: LinkButtonProps, ref) => {
	const { dataAppId = 'linkButton.default', to, href, ...rest } = props;
	const history = useHistory();

	const onClickHandler = (e) => {
		e.preventDefault();

		if (to) {
			history.push(to);
		} else if (href) {
			window.location.href = href;
		}
	};

	return (
		<Button onClick={onClickHandler} {...rest} {...getElTestAttr(dataAppId)} />
	);
});

export default LinkButton;
