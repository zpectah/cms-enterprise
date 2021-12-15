import React, { forwardRef } from 'react';
import {
	default as MuiChip,
	ChipProps as MuiChipProps,
} from '@mui/material/Chip';

import { getElTestAttr } from '../../../utils/tests';

interface ChipProps {
	dataTestId?: string;
}

const Chip = forwardRef((props: ChipProps & MuiChipProps, ref) => {
	const { dataTestId = 'chip.default', ...rest } = props;

	return <MuiChip {...rest} {...getElTestAttr(dataTestId)} />;
});

export default Chip;
