import React, { forwardRef } from 'react';
import {
	default as MuiIconButton,
	IconButtonProps as MuiIconButtonProps,
} from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import styled from '@emotion/styled';

import { getElTestAttr } from '../../../utils/tests';

const ButtonLabel = styled.span<{ isLoading: boolean }>`
	opacity: ${(props) => (props.isLoading ? '.125' : '1')};
	display: flex;
	align-items: center;
	justify-content: center;
`;
const StyledLoading = styled(CircularProgress)`
	position: absolute;
	top: calc(50% - 0.7rem);
	left: calc(50% - 0.7rem);
`;

interface IconButtonProps {
	dataTestId?: string;
	loading?: boolean;
	component?: 'span' | 'div';
}

const IconButton = forwardRef(
	(props: IconButtonProps & MuiIconButtonProps, ref) => {
		const {
			dataTestId = 'icon-button.default',
			loading,
			children,
			component = 'span',
			...rest
		} = props;
		return (
			<MuiIconButton {...rest} {...getElTestAttr(dataTestId)}>
				{loading && <StyledLoading size={'1.4rem'} color="inherit" />}
				<ButtonLabel isLoading={loading}>{children}</ButtonLabel>
			</MuiIconButton>
		);
	},
);

export default IconButton;
