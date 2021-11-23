import React, { forwardRef } from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import styled from 'styled-components';

import { getElTestAttr } from '../../../utils/tests';

const StyledButton = styled(Button)`
	&.MuiButton-root {
		border-radius: 1.5rem;
	}
`;

export interface ButtonCreateProps {
	dataTestId?: string;
}

const ButtonCreate = forwardRef(
	(props: ButtonCreateProps & ButtonProps, ref) => {
		const { dataTestId = 'button.create', ...rest } = props;

		return (
			<StyledButton
				color="success"
				variant="contained"
				startIcon={<AddIcon />}
				{...rest}
				{...getElTestAttr(dataTestId)}
			/>
		);
	},
);

export default ButtonCreate;
