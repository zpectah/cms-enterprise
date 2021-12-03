import React from 'react';
import Rating, { RatingProps } from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

import { getElTestAttr } from '../../../utils/tests';

interface RatingInputProps {
	dataTestId?: string;
	label?: string;
}

const RatingInput = (props: RatingInputProps & RatingProps) => {
	const {
		dataTestId = 'rating.input.default',
		label = 'Rating',
		...rest
	} = props;
	return (
		<>
			<Typography component="legend">{label}</Typography>
			<Rating {...rest} {...getElTestAttr(dataTestId)} />
		</>
	);
};

export default RatingInput;
