import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { getElTestAttr } from '../../../utils/tests';

const StyledLink = styled(NavLink)``;

interface LinkProps {
	to: string;
	activeClassName?: string;
	onClick?: (event: React.MouseEvent<HTMLElement>) => void;
	exact?: boolean;
	dataTestId?: string;
	ariaLabel?: string;
}

const Link: React.FC<LinkProps> = ({
	children,
	to,
	activeClassName = 'is-active',
	onClick,
	exact = false,
	dataTestId = 'typography.link.default',
	ariaLabel = 'link',
}) => {
	return (
		<StyledLink
			to={to}
			activeClassName={activeClassName}
			onClick={onClick}
			exact={exact}
			aria-label={ariaLabel}
			{...getElTestAttr(dataTestId)}
		>
			{children}
		</StyledLink>
	);
};

export default Link;
