import React from 'react';
import styled from 'styled-components';

import { getElTestAttr } from '../../../utils/tests';

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	overflow: hidden;
`;
const WrapperScrollable = styled.div`
	width: calc(100% + ${(props) => props.theme.scrollable.barWidth});
	height: 100%;
	position: relative;
	overflow-x: hidden;
	overflow-y: auto;
`;
const WrapperContent = styled.div`
	width: calc(100% - ${(props) => props.theme.scrollable.barWidth});
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
`;

interface ScrollableProps {
	dataTestId?: string;
}

const Scrollable: React.FC<ScrollableProps> = (props) => {
	const { children, dataTestId = 'scrollable.default' } = props;

	return (
		<Wrapper {...getElTestAttr(dataTestId)}>
			<WrapperScrollable>
				<WrapperContent>{children}</WrapperContent>
			</WrapperScrollable>
		</Wrapper>
	);
};

export default Scrollable;
