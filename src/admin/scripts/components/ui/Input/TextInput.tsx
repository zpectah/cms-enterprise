import React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import styled from 'styled-components';

import media from '../../../styles/responsive';
import { getElTestAttr } from '../../../utils/tests';

const StyledInput = styled(TextField)<{ responsive: string }>`
	width: 100%;
	background-color: white;

	${media.min.md} {
		width: ${(props) => (props.responsive ? props.responsive : '100%')};
	}
`;

interface TextInputProps {
	dataAppId?: string;
	responsiveWidth?: string;
}

const TextInput = (props: TextInputProps & TextFieldProps) => {
	const { dataAppId = 'text.input.default', responsiveWidth, ...rest } = props;

	return (
		<StyledInput
			variant="outlined"
			size="small"
			{...rest}
			responsive={responsiveWidth}
			{...getElTestAttr(dataAppId)}
		/>
	);
};

export default TextInput;
