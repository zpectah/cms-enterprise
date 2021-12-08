import React from 'react';

import ArrayPickerBase, { ArrayPickerInitialProps } from './ArrayPickerBase';

interface PhonePickerProps extends ArrayPickerInitialProps {}

const PhonePicker = (props: PhonePickerProps) => {
	const { dataTestId = 'PhonePicker', ...rest } = props;

	return <ArrayPickerBase type="phone" dataTestId={dataTestId} {...rest} />;
};

export default PhonePicker;
