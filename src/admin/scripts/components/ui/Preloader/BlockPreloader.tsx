import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import styled from 'styled-components';

const Wrapper = styled.div`
	width: 100%;
	height: auto;
	min-height: ${(props) => props.theme.preloader.block.height};
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: transparent;
`;

interface BlockPreloaderProps {}

const BlockPreloader = ({}: BlockPreloaderProps) => {
	return (
		<Wrapper className="preloader-block">
			<CircularProgress color="inherit" />
		</Wrapper>
	);
};

export default BlockPreloader;
