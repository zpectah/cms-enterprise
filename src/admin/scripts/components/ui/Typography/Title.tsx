import React from 'react';
import styled, { css } from 'styled-components';

import { getElTestAttr } from '../../../utils/tests';

const titleBaseStyle = css`
	margin: 0;
	padding: 0;
	font-weight: 700;
`;

const StyledH1 = styled.h1`
	${titleBaseStyle}

	font-size: 1.75rem;
	font-weight: 900;
`;
const StyledH2 = styled.h2`
	${titleBaseStyle}

	font-size: 1.6rem;
`;
const StyledH3 = styled.h3`
	${titleBaseStyle}

	font-size: 1.45rem;
`;
const StyledH4 = styled.h4`
	${titleBaseStyle}

	font-size: 1.3rem;
`;
const StyledH5 = styled.h5`
	${titleBaseStyle}

	font-size: 1.15rem;
`;
const StyledH6 = styled.h6`
	${titleBaseStyle}

	font-size: 1rem;
`;
const StyledSpan = styled.span`
	${titleBaseStyle}

	font-size: 1rem;
`;

interface TitleProps {
	h1?: true;
	h2?: true;
	h3?: true;
	h4?: true;
	h5?: true;
	h6?: true;
	className?: string;
	onClick?: (e: any) => void;
	dataTestId?: string;
	id?: string;
}

const Title: React.FC<TitleProps> = ({
	children,
	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	className,
	onClick,
	dataTestId = 'typography.title.default',
	id,
}) => {
	const componentProps = {
		children: children,
		className: className,
		onClick: onClick,
		id: id,
	};

	const getComponent = () => {
		let c = StyledSpan;
		if (h1) {
			c = StyledH1;
		} else if (h2) {
			c = StyledH2;
		} else if (h3) {
			c = StyledH3;
		} else if (h4) {
			c = StyledH4;
		} else if (h5) {
			c = StyledH5;
		} else if (h6) {
			c = StyledH6;
		} else {
			console.warn('Component type was not set!');
		}

		return c;
	};

	const ComponentName = getComponent();

	return <ComponentName {...componentProps} {...getElTestAttr(dataTestId)} />;
};

export default Title;
