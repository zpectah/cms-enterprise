import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import styled from 'styled-components';

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

interface BarPreloaderProps {
	isProcessing: boolean;
}

const BarPreloader = ({ isProcessing }: BarPreloaderProps) => {
	return (
		<Wrapper isProcessing={isProcessing}>
			<LinearProgress />
		</Wrapper>
	);
};

export default BarPreloader;
