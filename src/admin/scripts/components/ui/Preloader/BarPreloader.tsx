import React from 'react';
import styled, { keyframes } from 'styled-components';

const loadingAnimation = keyframes`
    from {
        background-color: rgb(255,0,0);
    }
    to {
        background-color: rgba(255,0,0,.5);
    }
`;
const Wrapper = styled.div<{ isProcessing: boolean }>`
	width: 100%;
	height: ${(props) => (props.isProcessing ? '3px' : '0px')};
	position: fixed;
	top: 0;
	left: 0;
	z-index: 1750;
	overflow: hidden;
`;
const InnerBar = styled.div<{ isProcessing: boolean }>`
	width: 100%;
	height: 100%;
	position: relative;
	left: 0;
	background-color: #ffc422;
	animation: ${loadingAnimation} infinite ease-out 2s;
	box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
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
