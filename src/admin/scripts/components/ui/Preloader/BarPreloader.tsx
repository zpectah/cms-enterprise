import React from 'react';
import styled, { keyframes } from 'styled-components';

const loadingAnimation = keyframes`
    from {
        background-color: ${(props) =>
					props.theme.preloader.bar.animation.color_a};
    }
    to {
        background-color: ${(props) =>
					props.theme.preloader.bar.animation.color_b};
    }
`;
const Wrapper = styled.div<{ isProcessing: boolean }>`
	width: 100%;
	height: ${(props) =>
		props.isProcessing ? props.theme.preloader.bar.height : '0px'};
	position: fixed;
	top: 0;
	left: 0;
	z-index: ${(props) => props.theme.preloader.bar.zIndex};
	overflow: hidden;
`;
const InnerBar = styled.div<{ isProcessing: boolean }>`
	width: 100%;
	height: 100%;
	position: relative;
	left: 0;
	background-color: ${(props) => props.theme.preloader.bar.color};
	animation: ${loadingAnimation} infinite ease-out 2s;
	box-shadow: 0 2px 2px 1rem ${(props) => props.theme.preloader.bar.color};
`;

interface BarPreloaderProps {
	isProcessing: boolean;
}

const BarPreloader = ({ isProcessing }: BarPreloaderProps) => {
	return (
		<Wrapper isProcessing={isProcessing}>
			<InnerBar isProcessing={isProcessing} />
		</Wrapper>
	);
};

export default BarPreloader;
