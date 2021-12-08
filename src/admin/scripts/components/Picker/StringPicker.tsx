import React from 'react';

import ArrayPickerBase, { ArrayPickerInitialProps } from './ArrayPickerBase';

interface StringPickerProps extends ArrayPickerInitialProps {}

const StringPicker = (props: StringPickerProps) => {
	const { dataTestId = 'StringPicker', ...rest } = props;

	return <ArrayPickerBase dataTestId={dataTestId} {...rest} />;
};

export default StringPicker;
