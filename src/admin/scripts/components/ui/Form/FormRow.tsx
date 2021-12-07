import React from 'react';
import Alert from '@mui/material/Alert';
import styled from 'styled-components';

import media from '../../../styles/responsive';

const Wrapper = styled.div`
	margin-bottom: ${(props) => props.theme.spacer};
	display: flex;
	flex-direction: column;

	${media.min.md} {
		flex-direction: row;
	}
`;
const LabelColumn = styled.div`
	width: 100%;
	padding-bottom: calc(${(props) => props.theme.spacer} / 2);
	display: flex;
	align-items: center;
	justify-content: flex-start;

	${media.min.md} {
		width: 300px;
		padding-bottom: 0;
		padding-right: ${(props) => props.theme.spacer};
		justify-content: flex-end;
	}
`;
const InputColumn = styled.div<{ withLabel: boolean }>`
	width: 100%;

	${media.min.md} {
		width: ${(props) => (props.withLabel ? 'calc(100% - 300px)' : '100%')};
	}
`;
const StyledLabel = styled.label`
	font-weight: 500;
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
	label?: string;
	blankLabel?: boolean;
	id?: string;
	required?: boolean;
}

const FormRow: React.FC<FormRowProps> = ({
	children,
	errors = [],
	success = [],
	responsiveMessages,
	label,
	blankLabel,
	id,
	required,
}) => {
	const with_label = (label || blankLabel) && id;
	return (
		<Wrapper>
			{with_label && (
				<LabelColumn>
					<StyledLabel htmlFor={id}>
						{label}
						{label && required && '  *'}
					</StyledLabel>
				</LabelColumn>
			)}
			<InputColumn withLabel={with_label}>
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
			</InputColumn>
		</Wrapper>
	);
};

export default FormRow;
