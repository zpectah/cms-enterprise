import React from 'react';
import styled from 'styled-components';

import { getElTestAttr } from '../../../utils/tests';

const StyledP = styled.p``;
const StyledSpan = styled.span``;
const StyledLabel = styled.label``;
const StyledSmall = styled.small``;
const StyledStrong = styled.strong``;

interface ParagraphProps {
	p?: true;
	span?: true;
	label?: true;
	small?: true;
	bold?: true;
	strong?: true;
	className?: string;
	onClick?: (e: any) => void;
	dataTestId?: string;
}

const Paragraph: React.FC<ParagraphProps> = ({
	children,
	p,
	span,
	label,
	small,
	bold,
	strong,
	className,
	onClick,
	dataTestId = 'typography.paragraph.default',
}) => {
	const componentProps = {
		children: children,
		className: className,
		onClick: onClick,
	};

	const getComponent = () => {
		let c = StyledP;

		if (span) {
			c = StyledSpan;
		} else if (label) {
			c = StyledLabel;
		} else if (small) {
			c = StyledSmall;
		} else if (bold || strong) {
			c = StyledStrong;
		}

		return c;
	};

	const ComponentName = getComponent();

	return <ComponentName {...componentProps} {...getElTestAttr(dataTestId)} />;
};

export default Paragraph;
