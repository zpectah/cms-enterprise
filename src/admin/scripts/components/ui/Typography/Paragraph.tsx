import React from 'react';
import styled, { css } from 'styled-components';

import { getElTestAttr } from '../../../utils/tests';

const typoBaseStyle = css``;
const StyledP = styled.p`
	${typoBaseStyle}
`;
const StyledSpan = styled.span`
	${typoBaseStyle}
`;
const StyledLabel = styled.label`
	${typoBaseStyle}
`;
const StyledSmall = styled.small`
	${typoBaseStyle}
`;
const StyledStrong = styled.strong`
	${typoBaseStyle}
`;
const StyledLink = styled.a`
	${typoBaseStyle}
`;

interface ParagraphProps {
	p?: true;
	span?: true;
	label?: true;
	small?: true;
	bold?: true;
	strong?: true;
	a?: true;
	className?: string;
	onClick?: (e: any) => void;
	dataTestId?: string;
	href?: string;
	target?: '_blank' | '_self' | null;
}

const Paragraph: React.FC<ParagraphProps> = ({
	children,
	p,
	span,
	label,
	small,
	bold,
	strong,
	a,
	className,
	onClick,
	dataTestId = 'typography.paragraph.default',
	href,
	target,
}) => {
	const componentProps = {
		children: children,
		className: className,
		onClick: onClick,
		href: href,
		target: target,
	};

	const getComponent = () => {
		let c = StyledP;

		if (span) {
			c = StyledSpan;
		} else if (label) {
			c = StyledLabel;
		} else if (small) {
			c = StyledSmall;
		} else if (a) {
			c = StyledLink;
		} else if (bold || strong) {
			c = StyledStrong;
		}

		return c;
	};

	const ComponentName = getComponent();

	return <ComponentName {...componentProps} {...getElTestAttr(dataTestId)} />;
};

export default Paragraph;
