import React from 'react';
import Alert from '@mui/material/Alert';
import styled from 'styled-components';

import media from '../../../styles/responsive';

const Wrapper = styled.div`
	margin-bottom: ${(props) => props.theme.spacer};
`;
const InputBlock = styled.div``;
const MessageBlock = styled.div<{ responsiveWidth: string }>`
	width: 100%;

	${media.min.md} {
		width: ${(props) =>
			props.responsiveWidth ? props.responsiveWidth : '100%'};
	}
`;
const MessageItem = styled(Alert)`
	margin-top: calc(${(props) => props.theme.spacer} / 2);
`;

interface FormRowProps {
	errors?: string[];
	success?: string[];
	responsiveMessages?: string;
}

const FormRow: React.FC<FormRowProps> = ({
	children,
	errors = [],
	success = [],
	responsiveMessages,
}) => {
	return (
		<Wrapper>
			<InputBlock>{children}</InputBlock>
			{(errors || success) && (
				<MessageBlock responsiveWidth={responsiveMessages}>
					{errors.map((msg) => (
						<MessageItem key={msg} severity="error">
							{msg}
						</MessageItem>
					))}
					{success.map((msg) => (
						<MessageItem key={msg} severity="success">
							{msg}
						</MessageItem>
					))}
				</MessageBlock>
			)}
		</Wrapper>
	);
};

export default FormRow;
