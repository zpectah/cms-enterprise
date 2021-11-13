import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div``;
const InputBlock = styled.div``;
const ErrorsBlock = styled.div``;
const ErrorItem = styled.div``;

interface FormRowProps {
	errors?: string[];
}

const FormRow: React.FC<FormRowProps> = ({ children, errors = [] }) => {
	return (
		<Wrapper>
			<InputBlock>{children}</InputBlock>
			{errors && (
				<ErrorsBlock>
					{errors.map((error) => (
						<ErrorItem key={error}>{error}</ErrorItem>
					))}
				</ErrorsBlock>
			)}
		</Wrapper>
	);
};

export default FormRow;
