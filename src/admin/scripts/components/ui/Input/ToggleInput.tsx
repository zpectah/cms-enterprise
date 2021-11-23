import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup, {
	ToggleButtonGroupProps,
} from '@mui/material/ToggleButtonGroup';

import { getElTestAttr } from '../../../utils/tests';

interface ToggleInputProps {
	dataTestId?: string;
	options: {
		label: string;
		value: string | number;
		children?: React.ReactChildren;
	}[];
}

const ToggleInput = (props: ToggleInputProps & ToggleButtonGroupProps) => {
	const { dataTestId = 'toggle.input.default', options = [], ...rest } = props;

	return (
		<ToggleButtonGroup {...rest} {...getElTestAttr(dataTestId)}>
			{options.map((option) => (
				<ToggleButton
					key={option.value}
					value={option.value}
					aria-label={option.label}
					{...getElTestAttr(`${dataTestId}.item.${option.value}`)}
				>
					{option.children ? option.children : <span>{option.label}</span>}
				</ToggleButton>
			))}
		</ToggleButtonGroup>
	);
};

export default ToggleInput;
