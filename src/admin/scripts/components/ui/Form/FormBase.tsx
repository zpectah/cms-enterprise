import React from 'react';

import { getElTestAttr } from '../../../utils/tests';

interface FormBaseProps {
	name?: string;
	dataTestId?: string;
	onSubmit?: () => void;
	onChange?: () => void;
	onBlur?: () => void;
}

const FormBase: React.FC<FormBaseProps> = (props) => {
	const { dataTestId = 'form.base', ...rest } = props;

	return <form {...rest} {...getElTestAttr(dataTestId)} />;
};

export default FormBase;
