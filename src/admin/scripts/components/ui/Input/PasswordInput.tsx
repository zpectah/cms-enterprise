import React, { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput, { OutlinedInputProps } from '@mui/material/OutlinedInput';
import styled from 'styled-components';

import IconButton from '../Button/IconButton';
import media from '../../../styles/responsive';
import { getElTestAttr } from '../../../utils/tests';

const StyledWrapper = styled(FormControl)<{ responsive: string }>`
	width: 100%;

	${media.min.md} {
		width: ${(props) => (props.responsive ? props.responsive : '100%')};
	}
`;
const StyledInput = styled(OutlinedInput)`
	background-color: ${(props) => props.theme.ui.input.bg};
`;

interface PasswordInputProps {
	dataTestId?: string;
	responsiveWidth?: string;
	readOnly?: boolean;
}

const PasswordInput = (props: PasswordInputProps & OutlinedInputProps) => {
	const {
		dataTestId = 'password.input.default',
		responsiveWidth,
		readOnly,
		label,
		id,
		placeholder,
		...rest
	} = props;
	const [inputType, setInputType] = useState<'password' | 'text'>('password');
	const toggleTypeHandler = () => {
		if (inputType == 'password') {
			setInputType('text');
		} else {
			setInputType('password');
		}
	};

	return (
		<StyledWrapper responsive={responsiveWidth} size="small" variant="outlined">
			{label && <InputLabel htmlFor={id}>{label}</InputLabel>}
			<StyledInput
				type={inputType}
				size="small"
				label={label}
				readOnly={readOnly}
				id={id}
				placeholder={placeholder}
				endAdornment={
					<InputAdornment position="end">
						<IconButton onClick={toggleTypeHandler}>
							{inputType == 'password' ? (
								<VisibilityIcon fontSize="small" />
							) : (
								<VisibilityOffIcon fontSize="small" />
							)}
						</IconButton>
					</InputAdornment>
				}
				{...getElTestAttr(dataTestId)}
				{...rest}
			/>
		</StyledWrapper>
	);
};

export default PasswordInput;
