import React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import styled from 'styled-components';

import media from '../../../styles/responsive';
import { getElTestAttr } from '../../../utils/tests';

const StyledInput = styled(TextField)<{ responsive: string }>`
	width: 100%;
	background-color: ${(props) => props.theme.ui.input.bg};

	${media.min.md} {
		width: ${(props) => (props.responsive ? props.responsive : '100%')};
	}
`;

export interface TextInputProps {
	dataTestId?: string;
	responsiveWidth?: string;
	readOnly?: boolean;
}

const TextInput = (props: TextInputProps & TextFieldProps) => {
	const { dataTestId = 'text.input.default', responsiveWidth, ...rest } = props;

	return (
		<StyledInput
			variant="outlined"
			size="small"
			{...rest}
			responsive={responsiveWidth}
			{...getElTestAttr(dataTestId)}
		/>
	);
};

export default TextInput;
