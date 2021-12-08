import React from 'react';

import ArrayPickerBase, { ArrayPickerInitialProps } from './ArrayPickerBase';

interface EmailPickerProps extends ArrayPickerInitialProps {}

const EmailPicker = (props: EmailPickerProps) => {
	const { dataTestId = 'EmailPicker', ...rest } = props;

	return <ArrayPickerBase type="email" dataTestId={dataTestId} {...rest} />;
};

export default EmailPicker;
