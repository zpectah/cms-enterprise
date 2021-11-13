import React from 'react';

import { getElTestAttr } from '../../../utils/tests';

interface FormBaseProps {
	name?: string;
	dataAppId?: string;
	onSubmit?: () => void;
}

const FormBase: React.FC<FormBaseProps> = (props) => {
	const { dataAppId = 'form.base', ...rest } = props;

	return <form {...rest} {...getElTestAttr(dataAppId)} />;
};

export default FormBase;
