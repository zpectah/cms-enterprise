import React from 'react';
import Slider, { SliderProps } from '@mui/material/Slider';
import styled from 'styled-components';

import { getElTestAttr } from '../../../utils/tests';
import media from '../../../styles/responsive';

const StyledInput = styled(Slider)<{ responsive: string }>`
	width: 100%;

	${media.min.md} {
		width: ${(props) => (props.responsive ? props.responsive : '100%')};
	}
`;

interface SliderInputProps {
	dataTestId?: string;
	responsiveWidth?: string;
}

const SliderInput = (props: SliderInputProps & SliderProps) => {
	const {
		dataTestId = 'slider.input.default',
		responsiveWidth,
		...rest
	} = props;

	return (
		<StyledInput
			{...rest}
			responsive={responsiveWidth}
			{...getElTestAttr(dataTestId)}
		/>
	);
};

export default SliderInput;
