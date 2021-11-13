import React from 'react';

import { getElTestAttr } from '../../../utils/tests';

interface FormBaseProps {
	name?: string;
	id?: string;
	dataAppId?: string;
	onSubmit?: (data: any) => void;
}

const FormBase: React.FC<FormBaseProps> = (props) => {
	const { dataAppId = 'form.base', ...rest } = props;

	return <form {...rest} {...getElTestAttr(dataAppId)} />;
};

export default FormBase;
