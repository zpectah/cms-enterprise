import React, { forwardRef } from 'react';
import { default as MuiButton, ButtonProps } from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import styled from '@emotion/styled';

import { getElTestAttr } from '../../../utils/tests';

const ButtonLabel = styled.span<{ isLoading: boolean }>`
	opacity: ${(props) => (props.isLoading ? '.125' : '1')};
`;
const StyledLoading = styled(CircularProgress)`
	position: absolute;
	top: calc(50% - 0.7rem);
	left: calc(50% - 0.7rem);
`;

export interface ButtonBaseProps {
	dataTestId?: string;
	loading?: boolean;
}

const Button = forwardRef((props: ButtonBaseProps & ButtonProps, ref) => {
	const { dataTestId = 'button.default', loading, children, ...rest } = props;
	return (
		<MuiButton {...rest} {...getElTestAttr(dataTestId)}>
			{loading && <StyledLoading size={'1.4rem'} color="inherit" />}
			<ButtonLabel isLoading={loading}>{children}</ButtonLabel>
		</MuiButton>
	);
});

export default Button;
