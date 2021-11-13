import React from 'react';
import Paper from '@mui/material/Paper';
import styled from 'styled-components';

import { getElTestAttr } from '../../../utils/tests';

const FormWrapper = styled.div`
	padding: ${(props) => props.theme.spacer};
`;

interface FormBaseProps {
	name?: string;
	id?: string;
	dataAppId?: string;
	onSubmit?: (data: any) => void;
}

const FormBase: React.FC<FormBaseProps> = (props) => {
	const { children, dataAppId = 'form.base', ...rest } = props;

	return (
		<Paper sx={{ width: '100%', mb: 2 }}>
			<FormWrapper>
				<form {...rest} {...getElTestAttr(dataAppId)} children={children} />
			</FormWrapper>
		</Paper>
	);
};

export default FormBase;
